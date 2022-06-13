<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});



$router->group(['prefix' => 'api'], function () use ($router) {

    // user auth routes 

    $router->post(uri: '/register', action: 'AuthController@register');
    $router->post(uri: '/login', action: 'AuthController@login');

    $router->group(['middleware' => 'auth'], function () use ($router) {
        // Subscriptions
        $router->get(uri: '/subs/{user_id}', action: 'SubsController@getSubs');
        $router->post(uri: '/subs/{user_id}', action: 'SubsController@addSubs');
        $router->put(uri: '/subs/{id}', action: 'SubsController@editSubs');
        $router->delete(uri: '/subs/{id}', action: 'SubsController@deleteSubs');
        // logout
        $router->post(uri: '/logout', action: 'AuthController@logout');
    });
});

// $router->post(uri: '/subs/{user_id}', action: 'subscriptionsController@addSubscription');
// $router->put(uri: '/subs/{id}', action: 'subscriptionsController@editSubscription');
// $router->delete(uri: '/subs/{id}', action: 'subscriptionsController@deleteSubscription');
