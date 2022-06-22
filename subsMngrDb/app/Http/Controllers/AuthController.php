<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use App\Models\User;
use Exception;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        if (empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'You must fill all the fields']);
        }

        $client = new Client();

        try {
            $response =  $client->post(config(key: 'service.passport.login_endpoint'), [
                'form_params' => [
                    'client_secret' => config(key: 'service.passport.client_secret'),
                    'grant_type' => "password",
                    'client_id' => config(key: 'service.passport.client_id'),
                    'username' => $request->email,
                    'password' => $request->password
                ]
            ]);
            $body = json_decode($response->getBody());

            return  response()->json(['status' => 'success', 'auth_info' => $body]);
        } catch (BadResponseException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function register(Request $request)
    {

        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $email = $request->email;
        $password = $request->password;

        // check if all field has value
        if (empty($first_name) or empty($last_name) or empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'You must fill all the fields']);
        }

        //validate email
        if (!filter_var($email, filter: FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 'error', 'message' => 'You must enter a valid email']);
        }

        // check if password is more than 7 chars
        if (strlen($password) < 8) {
            return response()->json(['status' => 'error', 'message' => 'Minimum Password Lenght is 8']);
        }

        // check if email is already in the database
        if (User::where('email', '=', $email)->exists()) {
            return response()->json(['status' => 'error', 'message' => 'The email is already in use']);
        }

        try {
            $user = new User();
            $user->first_name = $first_name;
            $user->last_name = $last_name;
            $user->email = $email;
            $user->password = app(make: 'hash')->make($password);

            if ($user->save()) {
                return $this->login($request);
            }
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens->each(function ($token, $key) {
                $token->delete();
            });

            return response()->json(['status' => 'success', 'message' => "User logged out successfully"]);
        } catch (Exception $e) {
            //throw $th;
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
