<?php

namespace Backend;

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
        return $this->belongsTo('Backend\Company');
    }

    public function user()
    {
        return $this->belongsToMany('Backend\User');
    }
}
