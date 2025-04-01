<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DepartmentModel;
use Illuminate\Support\Facades\Validator;
use App\CentralLogics\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DepartmentController extends Controller
{
    //add new data
    function addData(Request $request){

    
        $validator = Validator::make(request()->all(), [
            'title' => 'required'
      ]);
      if ($validator->fails())
      return response (["response"=>400],400);
     
      try{
            $alreadyAddedModel= DepartmentModel::where("title",$request->title)->first();
            if($alreadyAddedModel)
            {
                return Helpers::errorResponse("title already exists");
            
            }else{
                DB::beginTransaction();

                $timeStamp= date("Y-m-d H:i:s");
                $dataModel=new DepartmentModel;
                
                $dataModel->title = $request->title ;
               
                $dataModel->created_at=$timeStamp;
                $dataModel->updated_at=$timeStamp;
                if(isset($request->image)){
        
                      $dataModel->image =  $request->hasFile('image') ? Helpers::uploadImage('department/', $request->file('image')) : null;
                }
                
                if(isset($request->description)){
                  $dataModel->description  = $request->description;
                }
               
                $qResponce = $dataModel->save();
                if($qResponce)
               {
                DB::commit();
                
                return Helpers::successWithIdResponse("successfully",$dataModel->id);}
            
                else 
                {   DB::rollBack();
                    
                    return Helpers::errorResponse("error");}
            }
           
        }

     catch(\Exception $e){
             DB::rollBack();
              
                    return Helpers::errorResponse("error");
                  }
}
// Update Deapartment
function updateData(Request $request){
    
    $validator = Validator::make(request()->all(), [
        'id' => 'required'
  ]);
  if ($validator->fails())
  return response (["response"=>400],400);
    try{
        DB::beginTransaction();
        $dataModel= DepartmentModel::where("id",$request->id)->first();
        if(isset($request->title)){
            $alreadyExists = DepartmentModel::where('title', '=', $request->title)->where('id',"!=",$request->id)->first();
            if ($alreadyExists != null)
            {
                return Helpers::errorResponse("title already exists");
            }
            else{
                $dataModel->title= $request->title;
            }
        }
        if(isset($request->description)){
            $dataModel->description= $request->description;
        }
        if(isset($request->active)){
            $dataModel->active= $request->active;
        }

        
      
        if(isset($request->image)){
            if($request->hasFile('image') ){

            $oldImage = $dataModel->image;
            $dataModel->image =  Helpers::uploadImage('department/', $request->file('image'));
            if(isset($oldImage)){
                if($oldImage!="def.png"){
                    Helpers::deleteImage($oldImage);
                }
            }
        }
        }

        $timeStamp= date("Y-m-d H:i:s");
        $dataModel->updated_at=$timeStamp;
                $qResponce= $dataModel->save();
                if($qResponce)
                {
                    DB::commit();
                    return Helpers::successResponse("successfully");}
    
                else 
                {
                    DB::rollBack();
                    return Helpers::errorResponse("error");}
    }
    

 catch(\Exception $e){
    DB::rollBack();
                return Helpers::errorResponse("error");
              }
            }


 // Remove Image
function removeImage(Request $request){


    $validator = Validator::make(request()->all(), [
        'id' => 'required'
  ]);
  if ($validator->fails())
  return response (["response"=>400],400);
    try{
        $dataModel= DepartmentModel::where("id",$request->id)->first();
  

            $oldImage = $dataModel->image;
            if(isset($oldImage)){
                if($oldImage!="def.png"){
                    Helpers::deleteImage($oldImage);
                }

                $dataModel->image=null;
            }
 
            $timeStamp= date("Y-m-d H:i:s");
            $dataModel->updated_at=$timeStamp;
            
                $qResponce= $dataModel->save();
                if($qResponce)
                return Helpers::successResponse("successfully");
    
                else 
                return Helpers::errorResponse("error");
    }
    

 catch(\Exception $e){
          
                return Helpers::errorResponse("error");
              }
            }

               // get data

    function getData()
    {

      $data = DB::table("department")
      ->select('department.*'
      )
        ->get();
      
            $response = [
                "response"=>200,
                'data'=>$data,
            ];
        
      return response($response, 200);
        }
        function getDataActive()
        {
    
          $data = DB::table("department")
          ->select('department.*')
          ->where('active',1)
            ->get();
          
                $response = [
                    "response"=>200,
                    'data'=>$data,
                ];
            
          return response($response, 200);
            }
    

        

           // get data by id

    function getDataById($id)
    {

      $data = DB::table("department")
      ->select('department.*')
      ->where('id','=',$id)
        ->first();
      
            $response = [
                "response"=>200,
                'data'=>$data,
            ];
        
      return response($response, 200);
        }

        function deleteData(Request $request){
            $validator = Validator::make(request()->all(), [
                'id' => 'required'
          ]);
          if ($validator->fails())
          return response (["response"=>400],400);
            try{ 
                    $dataModel= DepartmentModel::where("id",$request->id)->first();
                    $oldImage = $dataModel->image;
                    $qResponce= $dataModel->delete();
                    if($qResponce){
                     
                        if(isset($oldImage)){
                            if($oldImage!="def.png"){
                                Helpers::deleteImage($oldImage);
                            }         
                        }
                    return Helpers::successResponse("successfully Deleted");}
                    else 
                    return Helpers::errorResponse("error");    
             
            }
        
         catch(\Exception $e){
                  
                        return Helpers::errorResponse("error $e");
                      }         
        
        }

}
