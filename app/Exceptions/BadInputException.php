<?php

namespace App\Exceptions;

class BadInputException extends ApiException {
	protected   $statusCode = 422,
				$message = "BAD INPUT";
}
