<?php

namespace App\Exceptions;

class UnauthorizedAccessException extends ApiException
{
    protected   $message = "ACCESS DENIED",
				$statusCode = 401;
}
