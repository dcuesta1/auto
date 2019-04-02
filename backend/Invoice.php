<?php

namespace Backend;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    const PENDING_PAYMENT = 1;
    const ESTIMATE = 2;
    const CLOSED = 4;
    const CANCELLED = 8;

    protected $fillable = [
        'vehicle_id',
        'discount',
        'total',
        'subtotal',
        'status'
    ];

    protected $guarded = [
        'status', 
        'user_id', 
        'number',
    ];

    protected $hidden = ['pivot'];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'vehicle_id' => 'integer',
        'status' => 'integer'
    ];

    // RELATIONSHIPS

    public function employee()
    {
        return $this->belongsTo('Backend\User');
    }

    public function payments()
    {
        return $this->hasMany('Backend\Payment');
    }

    public function customer()
    {
        return $this->belongsTo('Backend\Customer');
    }

    public function vehicle()
    {
        return $this->belongsTo('Backend\Vehicle');
    }

    public function company()
    {
        return $this->belongsTo('Backend\Company');
    }

    public function items()
    {
        return $this->hasMany('Backend\Item');
    }

    public function invoicePayments()
    {
        return $this->hasMany('Backend\InvoicePayment');
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
