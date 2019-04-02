<?php

namespace Backend\Exceptions;


class ModelNotFoundException extends ApiException {
	protected   $message = "CONTENT NOT FOUND",
				$statusCode = 404;

}