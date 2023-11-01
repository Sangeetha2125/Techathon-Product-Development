<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('forgot-password','forgot');
    Route::post('reset-password','reset');
    Route::post('refresh', 'refresh');
});

Route::controller(UserController::class)->group(
    function(){
        Route::get('users','index');
        Route::post('users','create');
        Route::get('users/{id}','show');
        Route::get('users/{id}/edit','edit');
        Route::put('users/{id}/edit','update');
        Route::delete('users/{id}/delete','destroy');
    }
);