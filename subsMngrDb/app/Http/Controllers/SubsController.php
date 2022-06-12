<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subs;

class SubsController extends Controller
{
    //

    public function getSubs(Request $request, $user_id)
    {
        return Subs::all();
    }
    public function addSubs(Request $request, $user_id)
    {
        $sub = new Subs();
        $sub->user_id = $user_id;
        $sub->subs_name = $request->subscription_name;
        $sub->billing_date = $request->billing_date;
        $sub->payment_method_used = $request->payment_method_used;
        $sub->payment_method_type = $request->payment_method_type;


        try {
            //code...
            if ($sub->Save()) {
                return response()->json(['status' => 'success', 'message' => 'Subscription has been added']);
            }
        } catch (\Exception $e) {

            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    public function editSubs(Request $request, $id)
    {
        $sub = Subs::findOrFail($id);
        $sub->id = $id;
        $sub->subs_name = $request->subs_name;
        $sub->billing_date = $request->billing_date;
        $sub->payment_method_used = $request->payment_method_used;
        $sub->payment_method_type = $request->payment_method_type;


        try {
            //code...
            if ($sub->Save()) {
                return response()->json(['status' => 'success', 'message' => 'Subscription has been updated']);
            }
        } catch (\Exception $e) {

            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    public function deleteSubs($id)
    {
        try {
            $sub = Subs::findOrFail($id);

            if ($sub->delete()) {
                return response()->json(['status' => 'success', 'message' => 'Subscription has been removed']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
