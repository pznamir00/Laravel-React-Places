<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Http\Requests\PlaceRequest;
use App\Http\Resources\PlaceCollection;
use App\Http\Resources\PlaceResource;
use App\Place;
use App\Location;
use App\Category;
use App\Image;
use Auth;


class PlaceController extends Controller
{
    private function upload_image($img)
    {
        $folderPath = "images/";
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = 'png';
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() . '.'.$image_type;
        file_put_contents($file, $image_base64);
        return $file;
    }

    public function get()
    {
        //get all parameters
        $author_id = request('author_id', 0);
        $created_from = request('created_from', '');
        $created_to = request('created_to', date('Y-m-d H:i:s'));
        $category_id = request('category_id', null);
        $keywords = request('keywords', '');

        //main query
        $places = Place::where('author_id', $author_id ? '=' : '!=', $author_id)
                        ->where(function($query) use ($category_id){
                            if($category_id){
                                $query->where('category_id', '=', $category_id);
                            }
                        })
                        ->where('title', 'like', '%'.$keywords.'%')
                        ->whereBetween('created_at', [$created_from, $created_to])
                        ->get();
        
        $collection = new PlaceCollection($places);
        return $collection->response()->setStatusCode(200);
    }


    public function get_single($slug)
    {
        $place = Place::where('slug', '=', $slug)->first();
        if(!$place) abort(404);
        $resource = new PlaceResource($place);
        return $resource->response()->setStatusCode(200);
    }


    public function post(PlaceRequest $request)
    {
        $request->validated();
        $place = Place::create(array_merge($request->all(), ['author_id' => Auth::user()->id]));
        Location::create(array_merge($request->all(), ['place_id' => $place->id]));
        $images = $request->input('images');
        foreach($images as $img){
            $image = new Image();
            $image->place_id = $place->id;
            $image->name = $this->upload_image($img);
            $image->save();
        }
        return response()->json(['success' => 'Place created successfuly'], 201);
    }

    
    public function put(PlaceRequest $request, $id)
    {
        $place = Place::findOrFail($id);
        if($place->author->id !== Auth::user()->id){
            return response()->json(['error' => 'You are unauthorized for this place'], 401);
        }
        $request->validated();
        $place->update($request->all());
        $place->location->update($request->all());
        
        File::delete($place->images);
        foreach($place->images as $img){ 
            $img->delete(); 
        }
        $images = $request->input('images');
        foreach($images as $img){
            $image = new Image();
            $image->place_id = $place->id;
            $image->name = $this->upload_image($img);
            $image->save();
        }

        return response()->json(['success' => 'Place updated successfuly'], 200);
    }

    
    public function delete($id)
    {
        $place = Place::findOrFail($id);
        if($place->author->id !== Auth::user()->id){
            return response()->json(['error' => 'You are unauthorizated for this place'], 401);
        }
        $place->delete();
        return response()->json(['success' => 'Place deleted successfuly'], 200);
    }
}
