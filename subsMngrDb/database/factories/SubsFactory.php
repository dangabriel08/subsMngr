<?php

namespace Database\Factories;

use App\Models\Subs;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubsFactory extends Factory
{
    protected $model = Subs::class;

    public function definition(): array
    {
        return [
            'user_id' => $this->faker->randomDigit(),
            'subs_name' => $this->faker->word(),
            'billing_date' => $this->faker->date(),
            'payment_method_used' => $this->faker->word(),
            'payment_method_type' => $this->faker->word()
        ];
    }
}
