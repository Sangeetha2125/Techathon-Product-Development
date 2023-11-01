<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memories extends Model
{
    use HasFactory;
    protected $table = 'memories';
    protected $fillable = ['name','image_path','description','date','location','user_id'];
}
