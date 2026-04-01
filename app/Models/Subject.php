<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasExternalId;

    protected $fillable = [
        'external_id',
        'name',
        'slug',
        'description',
        'color_hex',
        'icon',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function trails(): HasMany
    {
        return $this->hasMany(Trail::class)->orderBy('position');
    }
}
