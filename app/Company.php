<?php

namespace App;

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
        'invoice_notes',
        'invoice_thankyou_message',
        'sq_merchant_id',
        'sq_subscription_id',
        'user_id'
    ];

    protected $casts = [
        'subscription_type' => 'integer',
        'id' => 'integer',
        'user_id' => 'integer'
    ];

    // Relationships

    #TODO: fix the owner mess
    public function owner()
    {
        return $this->getowner->first();
    }

    public function getowner()
    {
        return $this->hasMany('App\User')->whereHas('role', function ($query) {
            $query->where('name', '=', Role::OWNER);
        });
    }

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function customers()
    {
        return $this->hasMany('App\Customer');
    }

    public function invoices()
    {
        return $this->hasManyThrough('App\Invoice', 'App\User');
    }

    public function fees()
    {
        return $this->hasMany('App\Fee');
    }

    public function estimates()
    {
        return $this->hasManyThrough('App\Invoice', 'App\User')
            ->with('vehicle', 'employee', 'customer', 'items', 'fees')
            ->where('status', '=', Invoice::ESTIMATE);
    }

    public function completeInvoices()
    {
        return $this->hasManyThrough('App\Invoice', 'App\User')
            ->with('vehicle', 'employee', 'customer', 'items', 'fees', 'invoicePayments')
            ->where('status', '!=', Invoice::ESTIMATE);
    }

    // public function employees()
    // {
    //     return $this->hasMany('App\User');
    // }

    public function employeeRoles()
    {
        return $this->hasMany('App\Role');
    }
}
