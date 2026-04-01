<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

trait HasExternalId
{
    protected static function bootHasExternalId(): void
    {
        static::creating(function ($model): void {
            if (empty($model->external_id)) {
                $model->external_id = (string) Str::uuid();
            }
        });
    }
}
