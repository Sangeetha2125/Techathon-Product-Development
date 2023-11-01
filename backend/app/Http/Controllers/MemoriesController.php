<?php

namespace App\Http\Controllers;

use App\Mail\SendReminderMail;
use App\Models\Memories;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
class MemoriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(){
        $query = Memories::query();
        $queryParams = request()->query->all();
        $sort = (isset($queryParams['sort']))?$queryParams['sort']:'date';
        $sort_type = (isset($queryParams['sort_type']))?$queryParams['sort_type']:'desc';
        $user=(isset($queryParams['user']))?$queryParams['user']:0;
        unset($queryParams['user']);

        unset($queryParams['sort']);
        unset($queryParams['sort_type']);

        foreach ($queryParams as $field_name => $field_value) {
            $query->where($field_name, $field_value);
        }

        $memories = $query->where('user_id',$user)->orderBY($sort,$sort_type)->get();

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

        $inputDate = $request->date;
        $currentDate = Carbon::now();

        if (!Carbon::parse($inputDate)->lte($currentDate)) {
            return $this->errorResponse($message="Invalid Date",$code=422);
        } 

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

    public function destroy(Memories $memories,$id)
    {
        $memory = $memories::find($id);
        if($memory){
            $memory->delete();
            return $this->successResponse(['memory' => Null], 'Memory deleted successfully');
        }
        else{
            return $this->errorResponse($message="No Such Memory Found",$code=404);
        }
    }

    public function remind(User $users,Request $request){

        $user=$users->where('email',$request->email)->first();
        if(!empty($user)){
            $user->remember_token=Str::random(40);
            $user->save();
            Mail::to($user->email)->send(new SendReminderMail($user));
            return $this->successResponse($user, 'Reminder Sent Successfully');
        }
        else{
            return $this->errorResponse('Invalid Credentials', 401);
        }
    }
}
