<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:64',
            'slug' => 'required|max:64',
            'short_description' => 'required|max:512',
            'lat' => 'required|min:-90|max:90',
            'lon' => 'required|min:-90|max:90',
            'images' => 'required'
        ];
    }
}
