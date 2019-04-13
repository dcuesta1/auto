<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $casts = [
        'id' => 'integer',
        'company_id' => 'integer',
        'amount' => 'float',
        'is_flat_amount' => 'boolean',
        'is_tax' => 'boolean'
    ];

    public function invoices()
    {
        return $this->belongsToMany('App\Invoice');
    }
}
