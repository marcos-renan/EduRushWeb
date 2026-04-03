import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:276
 * @route '/admin/content/trails/{trail}/lessons'
 */
export const store = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/content/trails/{trail}/lessons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:276
 * @route '/admin/content/trails/{trail}/lessons'
 */
store.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trail: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { trail: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    trail: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trail: typeof args.trail === 'object'
                ? args.trail.id
                : args.trail,
                }

    return store.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:276
 * @route '/admin/content/trails/{trail}/lessons'
 */
store.post = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:276
 * @route '/admin/content/trails/{trail}/lessons'
 */
    const storeForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:276
 * @route '/admin/content/trails/{trail}/lessons'
 */
        storeForm.post = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
export const show = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
show.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return show.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
show.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
show.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
    const showForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
        showForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:110
 * @route '/admin/content/lessons/{lesson}'
 */
        showForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:312
 * @route '/admin/content/lessons/{lesson}'
 */
export const update = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:312
 * @route '/admin/content/lessons/{lesson}'
 */
update.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return update.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:312
 * @route '/admin/content/lessons/{lesson}'
 */
update.patch = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:312
 * @route '/admin/content/lessons/{lesson}'
 */
    const updateForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:312
 * @route '/admin/content/lessons/{lesson}'
 */
        updateForm.patch = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:345
 * @route '/admin/content/lessons/{lesson}'
 */
export const destroy = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:345
 * @route '/admin/content/lessons/{lesson}'
 */
destroy.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return destroy.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:345
 * @route '/admin/content/lessons/{lesson}'
 */
destroy.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:345
 * @route '/admin/content/lessons/{lesson}'
 */
    const destroyForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:345
 * @route '/admin/content/lessons/{lesson}'
 */
        destroyForm.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const lesson = {
    store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default lesson