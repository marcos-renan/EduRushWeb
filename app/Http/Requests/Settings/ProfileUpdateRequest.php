<?php

namespace App\Http\Requests\Settings;

use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    use ProfileValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...$this->profileRules($this->user()->id),
            'username' => [
                'required',
                'string',
                'min:3',
                'max:40',
                'regex:/^@?[a-zA-Z0-9._]+$/',
                Rule::unique(User::class, 'username')->ignore($this->user()->id),
            ],
            'grade_year' => ['nullable', 'integer', 'between:1,3'],
        ];
    }
}
