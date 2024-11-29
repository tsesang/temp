<?php

use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('person', controller: PersonController::class);
    Route::get('person', [PersonController::class, 'index'])->name('person.index');
    Route::get('person/create/{person?}', [PersonController::class, 'create'])->name('person.create');

    Route::post('person/details/personal', [PersonController::class, 'storePersonalDetails'])->name('person.store.personal');
    Route::put('person/details/personal/{person}', [PersonController::class, 'updatePersonalDetails'])->name('person.update.personal');
    Route::put('person/details/bdl/{person}', [PersonController::class, 'updateBdlDetails'])->name('person.update.bdl');
    Route::put('person/details/rpomea/{person}', [PersonController::class, 'updateRpoMeaDetails'])->name('person.update.rpo_mea');

    Route::get('person/{person}', [PersonController::class, 'show'])->name('person.show');
    Route::get('person/{person}/edit', [PersonController::class, 'edit'])->name('person.edit');
    Route::put('person/{person}', [PersonController::class, 'update'])->name('person.update');
    Route::delete('person/{person}', [PersonController::class, 'destroy'])->name('person.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';