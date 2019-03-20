<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'model', 
        'make', 
        'year', 
        'number'
    ];

    protected $casts = [
        'year' => 'integer',
    ];

    function customer()
    {
        return $this->belongsToMany('App\Customer');
    }
}