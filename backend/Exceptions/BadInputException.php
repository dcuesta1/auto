<?php

namespace Backend\Exceptions;

class BadInputException extends ApiException {
	protected   $statusCode = 422,
				$message = "BAD INPUT";
}