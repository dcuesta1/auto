<?php

namespace App\Exceptions;


class ModelNotFoundException extends ApiException {
	protected   $message = "CONTENT NOT FOUND",
				$statusCode = 404;

}