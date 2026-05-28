import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:353
 * @route '/admin/content/subjects/{subject}/trails'
 */
export const store = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/content/subjects/{subject}/trails',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:353
 * @route '/admin/content/subjects/{subject}/trails'
 */
store.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return store.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:353
 * @route '/admin/content/subjects/{subject}/trails'
 */
store.post = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:353
 * @route '/admin/content/subjects/{subject}/trails'
 */
    const storeForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::store
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:353
 * @route '/admin/content/subjects/{subject}/trails'
 */
        storeForm.post = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
export const show = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
show.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
show.get = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
show.head = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
    const showForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
        showForm.get = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::show
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:74
 * @route '/admin/content/trails/{trail}'
 */
        showForm.head = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:383
 * @route '/admin/content/trails/{trail}'
 */
export const update = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:383
 * @route '/admin/content/trails/{trail}'
 */
update.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:383
 * @route '/admin/content/trails/{trail}'
 */
update.patch = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::update
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:383
 * @route '/admin/content/trails/{trail}'
 */
    const updateForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:383
 * @route '/admin/content/trails/{trail}'
 */
        updateForm.patch = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:410
 * @route '/admin/content/trails/{trail}'
 */
export const destroy = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:410
 * @route '/admin/content/trails/{trail}'
 */
destroy.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:410
 * @route '/admin/content/trails/{trail}'
 */
destroy.delete = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroy
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:410
 * @route '/admin/content/trails/{trail}'
 */
    const destroyForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:410
 * @route '/admin/content/trails/{trail}'
 */
        destroyForm.delete = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const trail = {
    store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default trail