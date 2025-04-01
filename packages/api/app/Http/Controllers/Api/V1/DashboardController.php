<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PatientModel;
use App\Models\AppointmentModel;
use App\Models\DoctorModel;
use App\Models\DepartmentModel;
use App\Models\PrescriptionModel;
use App\Models\FamilyMembersModel;
use App\Models\PrescribeMedicinesModel;
use App\Models\DoctorsReviewModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\CentralLogics\Helpers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    function getDataDashBoardCount()
    {
        $todatDate = date("Y-m-d");
        $totalUsers = User::count();
        $totalPatient = PatientModel::count();
        $totalAppointment = AppointmentModel::count();
        $totalACtiveDoctor = DoctorModel::Where("active", 1)->count();  
        $total_today_appointment = AppointmentModel::Where("date", $todatDate)->count();
        $total_pending_appointment = AppointmentModel::Where("status", "Pending")->count();  
        $total_confirmed_appointment = AppointmentModel::Where("status", "Confirmed")->count();  
        $total_rejected_appointment = AppointmentModel::Where("status", "Rejected")->count();  
        $total_cancelled_appointment = AppointmentModel::Where("status", "Cancelled")->count();   
        $total_completed_appointment = AppointmentModel::Where("status", "Completed")->count();  
        $total_visited_appointment = AppointmentModel::Where("status", "Visited")->count();  
        $total_upcoming_appointments = AppointmentModel::Where("date", ">", $todatDate)->count();
        $total_cancel_req_initiated_appointment = AppointmentModel::Where("current_cancel_req_status", "Initiated")->count();  
        $total_cancel_req_rejected_appointment = AppointmentModel::Where("current_cancel_req_status", "Rejected")->count();  
        $total_cancel_req_approved_appointment = AppointmentModel::Where("current_cancel_req_status", "Approved")->count();  
        $total_cancel_req_processing_appointment = AppointmentModel::Where("current_cancel_req_status", "Processing")->count();  
        $total_departments = DepartmentModel::count();
        $total_prescriptions = PrescriptionModel::count(); 
        $total_family_memebers =FamilyMembersModel::count();
        $total_medicine =PrescribeMedicinesModel::count();
        $total_doctors_review = DoctorsReviewModel::count();
        $response = [
            "response" => 200,
            'data' => [
                "today_date" => $todatDate,
                "total_users" => $totalUsers,
                "total_patients" => $totalPatient,
                "total_today_appointment" => $total_today_appointment,
                "total_appointments" => $totalAppointment,
                "total_active_doctors" => $totalACtiveDoctor,
                "total_pending_appointment" => $total_pending_appointment,
                "total_confirmed_appointment" => $total_confirmed_appointment,
                "total_rejected_appointment" => $total_rejected_appointment,
                "total_cancelled_appointment" => $total_cancelled_appointment,
                "total_completed_appointment" => $total_completed_appointment,
                "total_visited_appointment" => $total_visited_appointment,
                "total_upcoming_appointments" => $total_upcoming_appointments,
                "total_departments"=>$total_departments,
                "total_prescriptions"=>$total_prescriptions,
                "total_family_memebers"=>$total_family_memebers,
                "total_medicine"=>$total_medicine,
                "total_doctors_review"=>$total_doctors_review,
                "total_cancel_req_initiated_appointment"=>$total_cancel_req_initiated_appointment,
                "total_cancel_req_rejected_appointment"=>$total_cancel_req_rejected_appointment,
                "total_cancel_req_approved_appointment"=>$total_cancel_req_approved_appointment,
                "total_cancel_req_processing_appointment"=>$total_cancel_req_processing_appointment
            ]
        ];

        return response($response, 200);
    }
    function getDataDashBoardCountByDoctor($id)
    {
        $todatDate = date("Y-m-d");
        $totalAppointment = AppointmentModel::Where('doct_id',$id)->count();
        $total_today_appointment = AppointmentModel::Where('doct_id',$id)->Where("date", $todatDate)->count();
        $total_pending_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Pending")->count();  
        $total_confirmed_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Confirmed")->count();  
        $total_rejected_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Rejected")->count();  
        $total_cancelled_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Cancelled")->count();   
        $total_completed_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Completed")->count();  
        $total_visited_appointment = AppointmentModel::Where('doct_id',$id)->Where("status", "Visited")->count();  
        $total_upcoming_appointments = AppointmentModel::Where('doct_id',$id)->Where("date", ">", $todatDate)->count();

        $total_cancel_req_initiated_appointment = AppointmentModel::Where('doct_id',$id)->Where("current_cancel_req_status", "Initiated")->count();  
        $total_cancel_req_rejected_appointment = AppointmentModel::Where('doct_id',$id)->Where("current_cancel_req_status", "Rejected")->count();  
        $total_cancel_req_approved_appointment = AppointmentModel::Where('doct_id',$id)->Where("current_cancel_req_status", "Approved")->count();  
        $total_cancel_req_processing_appointment = AppointmentModel::Where('doct_id',$id)->Where("current_cancel_req_status", "Processing")->count();  
        $total_prescriptions =  $prescriptions = DB::table('appointments')
        ->select('appointments.doct_id', 
         'prescription.*' 
         )
         ->where('appointments.doct_id', '=', $id)
         ->Join('prescription', 'prescription.appointment_id', '=', 'appointments.id')
            ->count();
        $total_medicine =PrescribeMedicinesModel::count();
        $total_doctors_review = DoctorsReviewModel::Where('doctor_id',$id)->count();
        $response = [
            "response" => 200,
            'data' => [
                "today_date" => $todatDate,
                "total_today_appointment" => $total_today_appointment,
                "total_appointments" => $totalAppointment,
                "total_pending_appointment" => $total_pending_appointment,
                "total_confirmed_appointment" => $total_confirmed_appointment,
                "total_rejected_appointment" => $total_rejected_appointment,
                "total_cancelled_appointment" => $total_cancelled_appointment,
                "total_completed_appointment" => $total_completed_appointment,
                "total_visited_appointment" => $total_visited_appointment,
                "total_upcoming_appointments" => $total_upcoming_appointments,
                "total_prescriptions"=>$total_prescriptions,
                "total_medicine"=>$total_medicine,
                "total_doctors_review"=>$total_doctors_review,
                "total_cancel_req_initiated_appointment"=>$total_cancel_req_initiated_appointment,
                "total_cancel_req_rejected_appointment"=>$total_cancel_req_rejected_appointment,
                "total_cancel_req_approved_appointment"=>$total_cancel_req_approved_appointment,
                "total_cancel_req_processing_appointment"=>$total_cancel_req_processing_appointment
            ]
        ];

        return response($response, 200);
    }
}
