<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    /** @use HasFactory<\Database\Factories\PersonFactory> */
    use HasFactory;

    protected $fillable = [
        //personal related
        'id',
        'name',
        'gender',
        'dob',
        'case_type',

        //BDL related
        'BDL_receipt_number',
        'created_by',

        //RPO and MEA
        'submission_date',
        'MEA_number',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}