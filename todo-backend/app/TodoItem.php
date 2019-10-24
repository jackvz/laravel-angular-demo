<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    protected $fillable = ['title', 'complete'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
