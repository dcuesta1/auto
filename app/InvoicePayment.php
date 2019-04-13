<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoicePayment extends Model
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'integer',
        'invoice_id' => 'integer',
        'user_id' => 'integer',
        'amount' => 'float',
        'merchant_fees' => 'float',
        'type' => 'integer',
        'card' => 'integer',
        'is_request' => "boolean",
    ];

    protected $fillable = [
        'amount',
        'type',
        'merchant_fees',
        'card',
        'is_request',
        'reference'
    ];

    protected $hidden = ['pivot'];

    const CASH = '1';
    const CARD_SWIPED = '2';
    const CARD_ENTERED = '4';

    public function invoice()
    {
        return $this->belongsTo('App\Invoice');
    }

    public static function generateRef(int $invoiceId, int $type) : int
    {
        $seed = str_split('0123456789');
        shuffle($seed); // probably optional since array_is randomized; this may be redundant
        $number = '';
        foreach (array_rand($seed, 4) as $k) $number .= $seed[$k];

        return $type.$invoiceId.$number;
    }
}
