<?php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
	protected   $httpCode = 500,
				$message = "X.ERROR",
                $response = [];
                
    public function __construct($message = null, $httpCode = null, $code = 0, Exception $previous = null) 
    {
		$message = $message ? $message : $this->message;
		$this->statusCode = $httpCode ? $httpCode : $this->statusCode;
        $this->response[$this->statusCode] = $message;
        
		parent::__construct($message, $code, $previous);
    }
    
    public function setStatusCode($code)
    {
		$this->statusCode = $code;
    }
    
	public function getStatusCode()
	{
		return $this->statusCode;
    }
    
	public function getResponse()
	{
		return $this->response;
    }
    
    public function render($request)
    {
        return response()->json($this->getResponse(), $this->getStatusCode());
    }
}