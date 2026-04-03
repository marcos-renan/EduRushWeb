import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:315
 * @route '/admin/badges'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/badges',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:315
 * @route '/admin/badges'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:315
 * @route '/admin/badges'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:315
 * @route '/admin/badges'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:315
 * @route '/admin/badges'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
export const edit = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/badges/{badge}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
edit.url = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { badge: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { badge: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    badge: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        badge: typeof args.badge === 'object'
                ? args.badge.id
                : args.badge,
                }

    return edit.definition.url
            .replace('{badge}', parsedArgs.badge.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
edit.get = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
edit.head = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
    const editForm = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
        editForm.get = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::edit
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:127
 * @route '/admin/badges/{badge}/edit'
 */
        editForm.head = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::update
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:359
 * @route '/admin/badges/{badge}'
 */
export const update = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/badges/{badge}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::update
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:359
 * @route '/admin/badges/{badge}'
 */
update.url = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { badge: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { badge: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    badge: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        badge: typeof args.badge === 'object'
                ? args.badge.id
                : args.badge,
                }

    return update.definition.url
            .replace('{badge}', parsedArgs.badge.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::update
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:359
 * @route '/admin/badges/{badge}'
 */
update.patch = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::update
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:359
 * @route '/admin/badges/{badge}'
 */
    const updateForm = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::update
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:359
 * @route '/admin/badges/{badge}'
 */
        updateForm.patch = (args: { badge: number | { id: number } } | [badge: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const badges = {
    store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default badges