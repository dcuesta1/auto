<?php

namespace App;

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
    public function owner()
    {
        $this->hasMany('App\User')->where('type', '=', 3);
    }

    public function employees()
    {
        $this->hasMany('App\User')->where('type', '=', 2);
    }

    public function employeeRoles()
    {
        return $this->hasMany('App\Roles');
    }
}
