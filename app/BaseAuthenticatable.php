<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class BaseAuthenticatable extends Authenticatable
{
    // public function setCreatedAtAttribute( $value ) {
    //     $this->attributes['created_at'] = (new Carbon($value))->format('d/m/y');
    // }

    // public function setUpdatedAtAttribute( $value ) {
    //     $this->attributes['updated_at'] = (new Carbon($value))->format('d/m/y');
    // }

    // public function setDeletedAtAttribute( $value ) {
    //     $this->attributes['deleted_at'] = (new Carbon($value))->format('d/m/y');
    // }
    // public function getAttribute($key)
    // {

    //     if (array_key_exists($key, $this->relations)
    //       || method_exists($this, $key)
    //     )
    //     {
    //         return parent::getAttribute($key);
    //     }
    //     else
    //     {
    //         return parent::getAttribute(snake_case($key));
    //     }
    // }

    // public function setAttribute($key, $value)
    // {
    //     return parent::setAttribute(snake_case($key), $value);
    // }
}
