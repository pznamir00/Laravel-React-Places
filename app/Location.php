<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'lat',
        'lon',
        'place_id'
    ];
}
