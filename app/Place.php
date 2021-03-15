<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'category_id',
        'author_id'
    ];

    public function images(){
        return $this->hasMany('App\Image');
    }

    public function category(){
        return $this->belongsTo('App\Category');
    }

    public function location(){
        return $this->hasOne('App\Location');
    }

    public function author(){
        return $this->belongsTo('App\User', 'author_id');
    }
}
