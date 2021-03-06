<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    const PENDING_PAYMENT = 1;
    const ESTIMATE = 2;
    const PAID = 4;
    const CANCELLED = 8;

    protected $hidden = ['pivot'];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'vehicle_id' => 'integer',
        'status' => 'integer',
        'subtotal' => 'float',
        'total' => 'float',
        'amount_paid' => 'float'
    ];

    // RELATIONSHIPS

    public function employee()
    {
        return $this->belongsTo('App\User');
    }

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    public function vehicle()
    {
        return $this->belongsTo('App\Vehicle');
    }

    public function fees()
    {
        return $this->belongsToMany('App\Fee');
    }

    public function items()
    {
        return $this->hasMany('App\Item');
    }

    public function invoicePayments()
    {
        return $this->hasMany('App\InvoicePayment');
    }

    /* Helper Functions */

    public static function generateNumber($customerId, $userId)
    {
        $seed = str_split('0123456789abcdefghijklmnopqrstuvwxyz');
        shuffle($seed); // probably optional since array_is randomized; this may be redundant
        $number = '';
        foreach (array_rand($seed, 5) as $k) $number .= $seed[$k];

        return $userId.date('y').$customerId.$number;
    }
}
