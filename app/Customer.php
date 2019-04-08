<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $hidden = ['pivot'];

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'address_one',
        'address_two',
        'city',
        'state',
        'last_visit'
    ];

    protected $casts = [
        'id' => 'integer',
        'company_id' => 'integer'
    ];

    /* Relationships */

    public function vehicles()
    {
        return $this->belongsToMany('App\Vehicle');
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function invoices()
    {
        return $this->hasMany('App\Invoice');
    }

    /* Getters */

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

}
