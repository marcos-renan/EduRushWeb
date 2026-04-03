<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Http\Response;

class MediaController extends Controller
{
    public function userPhoto(User $user): Response
    {
        if ($user->profile_photo_blob && $user->profile_photo_mime) {
            return response($user->profile_photo_blob, 200, [
                'Content-Type' => $user->profile_photo_mime,
                'Cache-Control' => 'public, max-age=86400',
            ]);
        }

        abort(404);
    }

    public function badgeImage(Badge $badge): Response
    {
        if ($badge->image_blob && $badge->image_mime) {
            return response($badge->image_blob, 200, [
                'Content-Type' => $badge->image_mime,
                'Cache-Control' => 'public, max-age=86400',
            ]);
        }

        abort(404);
    }
}

