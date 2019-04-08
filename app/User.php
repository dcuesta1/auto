<?php

namespace App;

use App\{authToken, Invoice};
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class User extends BaseAuthenticatable
{
    const DEVELOPER = 1;
    const OWNER = 2;
    const EMPLOYEE = 3;

    use Notifiable, SoftDeletes;

    protected $fillable = ['name', 'email', 'username'];
    protected $hidden = ['password', 'pivot'];
    protected $casts = [
        'id' => 'integer',
    ];

    public function isDeveloper()
    {
    	return ($this->type == self::DEVELOPER);
    }

    public function isOwner()
    {
        return ($this->type == self::OWNER);
    }

    public function isEmployee()
    {
        return ($this->type == seld::EMPLOYEE);
    }

	// RELATIONSHIPS

	public function authTokens()
	{
		return $this->hasMany('App\AuthToken');
	}

	public function invoices()
    {
        return 
            $this->hasMany('App\Invoice')
                ->orderByDesc('created_at');
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function role()
    {
        return $this->belongsToMany('App\Role');
    }

    // MUTATORS
    
    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }
}
