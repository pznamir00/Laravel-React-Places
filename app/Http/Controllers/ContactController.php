<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Mail;

class ContactController extends Controller
{
    public function post(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        try
        {
            $data = array(
              'email' => $request->email,
              'subject' => $request->subject,
              '_message' => $request->message,
              'app_name' => config('app.name'),
              'app_mail' => config('mail.from.address'),
            );

            Mail::send('contact.message', $data, function($message) use ($data){
                $message->from($data['app_mail'], $data['email']);
                $message->to($data['app_mail'], 'To '.$data['app_name'])->subject($data['subject']);
            });

            return response()->json(['success' => 'You sent message successfuly'], 200);
        }
        catch(Exception $e){
            return response()->json(['error' => 'Something is wrong'], 500);
        }
      
    }
}
