<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    const OWNER = 'owner';

    protected $fillable = [
        'name',
        'description',
        'permissions'
    ];

    protected $casts = [
        'permissions' => 'array'
    ];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function user()
    {
        return $this->belongsToMany('App\User');
    }
}
