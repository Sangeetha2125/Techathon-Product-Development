<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return $this->errorResponse('Invalid Credentials', 401);
        }
        $user = Auth::user();
        $data = [
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
        ];
        return $this->successResponse($data,"Logged in successfully");

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        $data = [
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
        ];
        return $this->successResponse($data, 'User created successfully');
    }

    public function logout()
    {
        Auth::logout();
        return $this->successResponse(null, 'Successfully logged out');
    }

    public function forgot(User $users,Request $request) {

        $user=$users->where('email',$request->email)->first();
        if(!empty($user)){
            $user->remember_token=Str::random(40);
            $user->save();
            Mail::to($user->email)->send(new ForgotPasswordMail($user));
            return $this->successResponse($user, 'Mail Sent Successfully');
        }
        else{
            return $this->errorResponse('Invalid Credentials', 401);
        }
    }

    public function reset(User $users,Request $request) {

        $user=$users->where('remember_token',$request->token)->first();
        if(!empty($user)){
            $user->password=Hash::make($request->password);
            $user->save();
            return $this->successResponse($user, 'Password Reset Successfully');
        }
        else{
            return $this->errorResponse('Invalid Credentials', 401);
        }
    }

}