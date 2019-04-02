<?php

namespace Backend;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes;

    const LABOR = 'labor';

    protected $fillable = [
        'cost', 
        'description', 
        'provider', 
        'is_labor', 
        'name',
        'reference'
    ];

    protected $hidden = ['pivot'];

    protected $casts = [
        'cost' => 'float',
        'is_labor' => 'boolean'
    ];

    public function invoice()
    {
        return $this->belongsTo('Backend\Invoice');
    }
}
