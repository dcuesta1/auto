<?php

namespace Backend;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'model', 
        'make', 
        'year', 
        'vin'
    ];

    protected $casts = [
        'year' => 'integer',
    ];

    function customers()
    {
        return $this->belongsToMany('Backend\Customer');
    }
}