<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\PrescriptionController;
use App\Http\Controllers\Api\V1\AppointmentInvoiceController;

// REMOVE InstallController references completely

Route::get('/', function () {
    return 'Application is ready.';
});

// Keep only real features
Route::get('prescriptions/pdf/{id}', [PrescriptionController::class, 'generatePDF']);
Route::get('invoice/pdf/{id}', [AppointmentInvoiceController::class, 'generatePDF']);