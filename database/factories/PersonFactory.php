<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person>
 */
class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //personal related
            'name' => $this->faker->name,
            'gender' => $this->faker->randomElement(['male', 'female', 'other', 'not_specified']),
            'dob' => $this->faker->date,
            'case_type' => $this->faker->randomElement(['active', 'inactive', 'suspended', 'terminated']),

            //BDL related
            'BDL_receipt_number' => $this->faker->unique()->numerify('BDL-####'),
            'created_by' => \App\Models\User::factory(),

            //RPO and MEA
            'submission_date' => $this->faker->date,
            'MEA_number' => $this->faker->unique()->numerify('MEA-####'),
        ];
    }
}