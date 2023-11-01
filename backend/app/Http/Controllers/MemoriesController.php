<?php

namespace App\Http\Controllers;

use App\Models\Memories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemoriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(){
        $query = Memories::query();
        $queryParams = request()->query->all();
        $user=(isset($queryParams['user']))?$queryParams['user']:0;
        unset($queryParams['user']);

        $memories = $query->where('user_id',$user)->get();

        if($memories->count() > 0){
            return $this->successResponse($memories, 'Memories Successfully Fetched');
        }
        else{
            return $this->errorResponse($message="No Records Found",$code=404);
        }
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=> 'required|string',
            'description'=>'required|string',
            'date'=>'required',
            'file' => 'required|mimetypes:image/jpeg,image/png,image/gif,image/webp'
        ]);
        if($validator->fails()){
            return $this->errorResponse($message=$validator->messages(),$code=422);
        }
        else{
            try {
                if($request->hasFile('file')) {
                    $fileName = time().'_'.$request->file->getClientOriginalName();
                    $filePath = $request->file('file')->storeAs('uploads', $fileName, 'public');
                    $file_path = 'app/public/' . $filePath;
                    $file_path = storage_path($file_path);
                    $image_url = asset('storage/' . $filePath);
                    $memory = Memories::create([
                        'user_id'=> $request->user_id,
                        'name' => $request->name,
                        'image_path' => $image_url,
                        'description'=> $request->description,
                        'date'=> $request->date,
                        'location'=>$request->location
                    ]);
                    if($memory){
                        return $this->successResponse($memory, 'Memory created successfully');
                    }
                    else{
                        return $this->errorResponse($message="Something Went Wrong",$code=500);
                    }
                }
                else{
                    return $this->errorResponse($message="Something Went Wrong",$code=500);
                }
            }
            catch (\Exception $e) {

            return $this->errorResponse($message=$e->getMessage(),$code=500);

            }

    }}
}
