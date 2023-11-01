<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemoriesController;

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

Route::controller(MemoriesController::class)->group(function () {
    Route::get('memories', 'index');
    Route::post('memories', 'store');
    Route::delete('memories/{id}/delete','destroy');
});