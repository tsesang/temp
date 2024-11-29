<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'gender' => $this->gender,
            'case_type' => $this->case_type,
            'dob' => (new Carbon($this->dob))->format('Y-m-d'),
            'BDL_receipt_number' => $this->BDL_receipt_number,
            'createdBy' => new UserResource($this->createdBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'MEA_number' => $this->MEA_number,
            'submission_date' => (new Carbon($this->submission_date))->format('Y-m-d')
        ];
    }
}