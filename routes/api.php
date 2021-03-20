<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//categories
Route::get('/categories', 'CategoryController@get');

//contact
Route::post('/contacts', 'ContactController@post');

//places
Route::get('/places', 'PlaceController@get');
Route::get('/places/{slug}', 'PlaceController@get_single');

//logged
Route::middleware('auth:api')->group(function(){
    Route::post('/places', 'PlaceController@post');
    Route::put('/places/{id}', 'PlaceController@put');
    Route::delete('/places/{id}', 'PlaceController@delete');
    Route::delete('/users', 'Auth\AccountController@delete');
});


//password-reset
Route::group([    
    'namespace' => 'Auth',    
    'middleware' => 'api',    
    'prefix' => 'password'
], function () {    
    Route::post('forgot', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});

