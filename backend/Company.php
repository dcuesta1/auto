<?php

namespace Backend;

use Carbon\Carbon;

class Company extends BaseModel
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'website',
        'ein',
        'subscription_type',
        'subscription_expiration',
        'invoice_fee_rate',
        'invoice_tax_rate',
        'invoice_notes',
        'invoice_thankyou_message',
        'sq_merchant_id',
        'sq_subscription_id',
        'user_id'
    ];

    protected $casts = [
        'subscription_type' => 'integer',
        'invoice_fee_rate' => 'float',
        'invoice_tax_rate' => 'float'
    ];

    // Relationships

    #TODO: fix the owner mess
    public function owner()
    {
        return $this->getowner->first();
    }

    public function getowner()
    {
        return $this->hasMany('Backend\User')->whereHas('role', function ($query) {
            $query->where('name', '=', Role::OWNER);
        });
    }

    public function users()
    {
        return $this->hasMany('Backend\User');
    }

    public function customers()
    {
        return $this->hasMany('Backend\Customer');
    }

    // public function employees()
    // {
    //     return $this->hasMany('Backend\User');
    // }

    public function employeeRoles()
    {
        return $this->hasMany('Backend\Role');
    }
}
