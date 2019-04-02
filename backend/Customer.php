<?php

namespace Backend;

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
        'state'
    ];

    protected $casts = [
        'id' => 'integer',
        'company_id' => 'integer'
    ];

    /* Relationships */

    public function vehicles()
    {
        return $this->belongsToMany('Backend\Vehicle');
    }

    public function company()
    {
        return $this->belongsTo('Backend\Company');
    }

    public function invoices()
    {
        return $this->hasMany('Backend\Invoice');
    }

    /* Getters */

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

}
