<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Concerns\HasExternalId;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'username', 'email', 'password', 'role', 'profile_photo_path', 'external_id'])]
#[Hidden(['password', 'remember_token', 'profile_photo_blob', 'profile_photo_mime'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasExternalId, HasFactory, Notifiable, SoftDeletes;

    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isStudent(): bool
    {
        return $this->role === 'user';
    }

    public function studentProfile(): HasOne
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function outgoingFriendRequests(): HasMany
    {
        return $this->hasMany(FriendRequest::class, 'sender_id');
    }

    public function incomingFriendRequests(): HasMany
    {
        return $this->hasMany(FriendRequest::class, 'receiver_id');
    }

    public function friendships(): HasMany
    {
        return $this->hasMany(Friendship::class);
    }

    public function getProfilePhotoUrlAttribute(): ?string
    {
        if ($this->profile_photo_blob && $this->profile_photo_mime) {
            return route('media.user-photo', ['user' => $this->id], false);
        }

        if ($this->profile_photo_path) {
            return '/storage/'.ltrim((string) $this->profile_photo_path, '/');
        }

        return null;
    }
}
