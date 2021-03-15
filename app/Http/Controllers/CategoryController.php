<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function get()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }
}
