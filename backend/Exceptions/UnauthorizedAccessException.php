<?php

namespace Backend\Exceptions;

class UnauthorizedAccessException extends ApiException
{
    protected   $message = "ACCESS DENIED",
				$statusCode = 401;
}