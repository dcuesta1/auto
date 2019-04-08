<?php

namespace App\Exceptions;

class LogicException extends ApiException {

	protected   $message = "SERVER ERROR",
				$statusCode = 500;

}
