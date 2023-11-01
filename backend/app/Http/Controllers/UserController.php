<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'status' => 'required',
            'role' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => $request->status,
            'role' => $request->role
        ]);

        if($user){
            return $this->successResponse($user, 'User created successfully');
        }
        else{
            return $this->errorResponse($message="No Such User Found",$code=404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $users,string $id)
    {
        $user = $users::find($id);
        if($user){
            return $this->successResponse($user, 'User details');
        }
        else{
            return $this->errorResponse($message="No Such User Found",$code=404);
        }
    }

}
