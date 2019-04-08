<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;

    protected $hidden = [
        'pivot'
    ];

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
        return $this->belongsToMany('App\Customer');
    }
}
