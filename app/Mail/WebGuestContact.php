<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class WebGuestContact extends Mailable
{
    use Queueable, SerializesModels;

    public $contactForm;

    public function __construct($contactForm)
    {
        $this->contactForm = $contactForm;
    }

    public function build()
    {
        return $this->from(env('APP_EMAIL'))
                ->view('emails.guestContact');
    }
}
