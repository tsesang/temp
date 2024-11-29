<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {

            //person details related fields
            $table->id();

            $table->string('name')->required();
            $table->enum('gender', ['male', 'female', 'other', 'not_specified'])->required();
            $table->date('dob')->required();
            $table->string('case_type')->required();

            //BDL related fields
            $table->string('BDL_receipt_number')->nullable();
            $table->foreignId('created_by')->constrained('users')->required();

            //RPO and MEA
            $table->date('submission_date')->nullable();
            $table->string('MEA_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('person');
    }
};