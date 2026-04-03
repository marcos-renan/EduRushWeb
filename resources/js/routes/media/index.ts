import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
export const userPhoto = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPhoto.url(args, options),
    method: 'get',
})

userPhoto.definition = {
    methods: ["get","head"],
    url: '/media/users/{user}/photo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
userPhoto.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return userPhoto.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
userPhoto.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPhoto.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
userPhoto.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userPhoto.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
    const userPhotoForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userPhoto.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
        userPhotoForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userPhoto.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MediaController::userPhoto
 * @see app/Http/Controllers/MediaController.php:11
 * @route '/media/users/{user}/photo'
 */
        userPhotoForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userPhoto.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userPhoto.form = userPhotoForm
/**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
export const badgeImage = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: badgeImage.url(args, options),
    method: 'get',
})

badgeImage.definition = {
    methods: ["get","head"],
    url: '/media/badges/{badge}/image',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
badgeImage.url = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { badge: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    badge: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        badge: args.badge,
                }

    return badgeImage.definition.url
            .replace('{badge}', parsedArgs.badge.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
badgeImage.get = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: badgeImage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
badgeImage.head = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: badgeImage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
    const badgeImageForm = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: badgeImage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
        badgeImageForm.get = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: badgeImage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MediaController::badgeImage
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/badges/{badge}/image'
 */
        badgeImageForm.head = (args: { badge: string | number } | [badge: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: badgeImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    badgeImage.form = badgeImageForm
const media = {
    userPhoto: Object.assign(userPhoto, userPhoto),
badgeImage: Object.assign(badgeImage, badgeImage),
}

export default media