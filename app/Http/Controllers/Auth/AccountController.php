<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class AccountController extends Controller
{
    public function delete(Request $request)
    {
        $user = Auth::user();
        $user->delete();
        return response()->json([
            'success' => 'You deleted your account successfuly'
        ], 200);
    }
}
