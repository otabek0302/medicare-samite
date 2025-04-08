<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\PrescriptionController;
use App\Http\Controllers\Api\V1\AppointmentInvoiceController;
use App\Http\Controllers\InstallController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('step0');
});

Route::get('/step0', [InstallController::class, 'step0'])->name('step0');
Route::get('/step1', [InstallController::class, 'step1'])->name('step1');
Route::get('/step2', [InstallController::class, 'step2'])->name('step2');
Route::get('/step3', [InstallController::class, 'step3'])->name('step3');
Route::get('/step4', [InstallController::class, 'step4'])->name('step4');
Route::get('/step5', [InstallController::class, 'step5'])->name('step5');
Route::get('/step6', [InstallController::class, 'step6'])->name('step6');

Route::post('/activate', [InstallController::class, 'activate'])->name('activate');

Route::get('prescriptions/pdf/{id}', [PrescriptionController::class, 'generatePDF']);
Route::get('invoice/pdf/{id}', [AppointmentInvoiceController::class, 'generatePDF']);

