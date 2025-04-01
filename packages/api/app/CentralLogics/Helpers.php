<?php

namespace App\CentralLogics;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class Helpers
{
    public static  function remove_dir($dir) {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir") Helpers::remove_dir($dir."/".$object); else unlink($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }

    public static function file_remover(string $dir, $image)
    {
        if (!isset($image)) return true;

        if (Storage::disk('public')->exists($dir . $image)) Storage::disk('public')->delete($dir . $image);

        return true;
    }

    public static function setEnvironmentValue($envKey, $envValue)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);
        $oldValue = env($envKey);
        if (strpos($str, $envKey) !== false) {
            $str = str_replace("{$envKey}={$oldValue}", "{$envKey}={$envValue}", $str);
        } else {
            $str .= "{$envKey}={$envValue}\n";
        }
        $fp = fopen($envFile, 'w');
        fwrite($fp, $str);
        fclose($fp);
        return $envValue;
    }

    public static function requestSender()
    {
        $class = new LaravelchkController();
        $response = $class->actch();
        return json_decode($response->getContent(),true);
    }
    public static function deleteImage(string $filePath)
    {
        if ($filePath) {
            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
                return true; // File deleted successfully
            }
        }
        return false; // File does not exist or delete operation failed
    }
        public static function uploadImage(string $dir, $image = null)
        {

            if ($image != null) {
                $ext = $image->getClientOriginalExtension()??".png";
                $imageName = \Carbon\Carbon::now()->toDateString() . "-" . uniqid() . "." . $ext;
                if (!Storage::disk('public')->exists($dir)) {
                    Storage::disk('public')->makeDirectory($dir);
                }
                Storage::disk('public')->put($dir . $imageName, file_get_contents($image));
            } else {
                $imageName = 'def.png';
            }
    
           return $imageName =="def.png"?"def.png":$dir.$imageName;
        }

    public static function errorResponse($msg)
    {
        
            $response = [
              "response"=>201,
              'status'=>false,
              'message' => $msg];
              return response($response, 200);
          
    }
    public static function successResponse($msg)
    {
        
        $response = [
            "response"=>200,
            'status'=>true,
            'message' => $msg
  
        ];
              return response($response, 200);
          
    }
    public static function successWithIdResponse($msg,$id)
    {
        
        $response = [
            "response"=>200,
            'status'=>true,
            'message' => $msg,
            'id'=>$id
  
        ];
              return response($response, 200);
          
    }

}


