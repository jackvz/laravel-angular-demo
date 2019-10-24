<?php

use Illuminate\Http\Request;

Use App\User;
Use App\TodoItem;
use App\Traits\UploadTrait;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// @todo: The following end point groups could be split out into individual controllers

// Authentication end points

Route::get('login', function() {
    return response()->json(['error' => 'Unauthorized'], 401);
})->name('login');

Route::post('login', function(Request $request) {
    $user = User::whereEmail(json_decode($request->getContent(), true)['email'])->wherePassword(json_decode($request->getContent(), true)['password'])->first();

    if (!isset($user)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    return $user;
});

// Profile end points

// @todo:
Route::middleware('auth:api')->post('avatar', function(Request $request) {
    $request->validate([
        'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    // Get current user
    $user = User::findOrFail(auth()->user()->id);

    // Check if a profile image has been uploaded
    if ($request->has('file')) {
        // Get image file
        $image = $request->file('file');
        // Make a image name based on user name and current timestamp
        $name = $user->name.'_'.time();
        // Define folder path
        $folder = '/uploads/images/';
        // Make a file path where image will be stored [ folder path + file name + file extension]
        $filePath = $folder.$name.'.'.$image->getClientOriginalExtension();
        // Upload image
        UploadTrait::uploadOne($image, $folder, 'public', $name);
        // Set user profile image path in database to filePath
        $user->profile_image = $filePath;
    }

    // Persist user record to database
    $user->save();

    return $user;
});

// User end points

Route::middleware('auth:api')->get('user', function() {
    return User::all();
});

Route::middleware('auth:api')->get('user/{id}', function($id) {
    return User::find($id);
});

Route::post('user', function(Request $request) {
    $user = User::create([
        'name' => json_decode($request->getContent(), true)['name'],
        'email' => json_decode($request->getContent(), true)['email'],
        'password' => json_decode($request->getContent(), true)['password'],
    ]);

    $user['api_token'] = Str::random(60);
    $user->save();

    return $user;
});

Route::middleware('auth:api')->put('user/{id}', function(Request $request, $id) {
    $User = User::findOrFail($id);
    $User->update(json_decode($request->getContent(), true));

    return $User;
});

Route::middleware('auth:api')->delete('user/{id}', function($id) {
    User::find($id)->delete();

    return 204;
});

// Todo item end points

Route::middleware('auth:api')->get('todo', function() {
    $user = User::findOrFail(auth()->user()->id);
    return TodoItem::where('user_id', $user->id)->get();
});

Route::middleware('auth:api')->get('todo/{id}', function($id) {
    $user = User::findOrFail(auth()->user()->id);
    return TodoItem::find($id)::where('user_id', $user->id)->get();
});

Route::middleware('auth:api')->post('todo', function(Request $request) {
    $user = User::findOrFail(auth()->user()->id);
    $todoItem = new \App\TodoItem([
        'title' => json_decode($request->getContent(), true)['title'],
        'complete' => json_decode($request->getContent(), true)['complete'],
    ]);
    $todoItem['user_id'] = $user->id;
    $todoItem->save();
    return $todoItem;
});

Route::middleware('auth:api')->put('todo/{id}', function(Request $request, $id) {
    $user = User::findOrFail(auth()->user()->id);
    $TodoItem = TodoItem::findOrFail($id);
    $TodoItem->update(json_decode($request->getContent(), true));

    return $TodoItem;
});

Route::middleware('auth:api')->delete('todo/{id}', function($id) {
    $user = User::findOrFail(auth()->user()->id);
    TodoItem::find($id)->delete();

    return 204;
});
