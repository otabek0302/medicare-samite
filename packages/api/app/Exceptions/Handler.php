<?php

namespace App\Exceptions;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    
    protected function unauthenticated($request, \Illuminate\Auth\AuthenticationException $exception)
    {
        return response()->json([
            "response" => 401,
            "status" => false,
            "message" => "Session expired. Please log in again."
        ], 401);
    }
}
