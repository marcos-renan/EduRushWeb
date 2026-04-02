import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/content',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::index
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:18
 * @route '/admin/content'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:131
 * @route '/admin/content/subjects'
 */
export const storeSubject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSubject.url(options),
    method: 'post',
})

storeSubject.definition = {
    methods: ["post"],
    url: '/admin/content/subjects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:131
 * @route '/admin/content/subjects'
 */
storeSubject.url = (options?: RouteQueryOptions) => {
    return storeSubject.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:131
 * @route '/admin/content/subjects'
 */
storeSubject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSubject.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:131
 * @route '/admin/content/subjects'
 */
    const storeSubjectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeSubject.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:131
 * @route '/admin/content/subjects'
 */
        storeSubjectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeSubject.url(options),
            method: 'post',
        })
    
    storeSubject.form = storeSubjectForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
export const showSubject = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showSubject.url(args, options),
    method: 'get',
})

showSubject.definition = {
    methods: ["get","head"],
    url: '/admin/content/subjects/{subject}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
showSubject.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showSubject.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
showSubject.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showSubject.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
showSubject.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showSubject.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
    const showSubjectForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showSubject.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
        showSubjectForm.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showSubject.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:36
 * @route '/admin/content/subjects/{subject}'
 */
        showSubjectForm.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showSubject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showSubject.form = showSubjectForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:159
 * @route '/admin/content/subjects/{subject}'
 */
export const updateSubject = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSubject.url(args, options),
    method: 'patch',
})

updateSubject.definition = {
    methods: ["patch"],
    url: '/admin/content/subjects/{subject}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:159
 * @route '/admin/content/subjects/{subject}'
 */
updateSubject.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateSubject.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:159
 * @route '/admin/content/subjects/{subject}'
 */
updateSubject.patch = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSubject.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:159
 * @route '/admin/content/subjects/{subject}'
 */
    const updateSubjectForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSubject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateSubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:159
 * @route '/admin/content/subjects/{subject}'
 */
        updateSubjectForm.patch = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSubject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSubject.form = updateSubjectForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroySubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:184
 * @route '/admin/content/subjects/{subject}'
 */
export const destroySubject = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySubject.url(args, options),
    method: 'delete',
})

destroySubject.definition = {
    methods: ["delete"],
    url: '/admin/content/subjects/{subject}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroySubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:184
 * @route '/admin/content/subjects/{subject}'
 */
destroySubject.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroySubject.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroySubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:184
 * @route '/admin/content/subjects/{subject}'
 */
destroySubject.delete = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySubject.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroySubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:184
 * @route '/admin/content/subjects/{subject}'
 */
    const destroySubjectForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroySubject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroySubject
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:184
 * @route '/admin/content/subjects/{subject}'
 */
        destroySubjectForm.delete = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroySubject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroySubject.form = destroySubjectForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:193
 * @route '/admin/content/subjects/{subject}/trails'
 */
export const storeTrail = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTrail.url(args, options),
    method: 'post',
})

storeTrail.definition = {
    methods: ["post"],
    url: '/admin/content/subjects/{subject}/trails',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:193
 * @route '/admin/content/subjects/{subject}/trails'
 */
storeTrail.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeTrail.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:193
 * @route '/admin/content/subjects/{subject}/trails'
 */
storeTrail.post = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTrail.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:193
 * @route '/admin/content/subjects/{subject}/trails'
 */
    const storeTrailForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeTrail.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:193
 * @route '/admin/content/subjects/{subject}/trails'
 */
        storeTrailForm.post = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeTrail.url(args, options),
            method: 'post',
        })
    
    storeTrail.form = storeTrailForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
export const showTrail = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showTrail.url(args, options),
    method: 'get',
})

showTrail.definition = {
    methods: ["get","head"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
showTrail.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showTrail.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
showTrail.get = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showTrail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
showTrail.head = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showTrail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
    const showTrailForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showTrail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
        showTrailForm.get = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showTrail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:67
 * @route '/admin/content/trails/{trail}'
 */
        showTrailForm.head = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showTrail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showTrail.form = showTrailForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:220
 * @route '/admin/content/trails/{trail}'
 */
export const updateTrail = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTrail.url(args, options),
    method: 'patch',
})

updateTrail.definition = {
    methods: ["patch"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:220
 * @route '/admin/content/trails/{trail}'
 */
updateTrail.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateTrail.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:220
 * @route '/admin/content/trails/{trail}'
 */
updateTrail.patch = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTrail.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:220
 * @route '/admin/content/trails/{trail}'
 */
    const updateTrailForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateTrail.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:220
 * @route '/admin/content/trails/{trail}'
 */
        updateTrailForm.patch = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateTrail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateTrail.form = updateTrailForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:245
 * @route '/admin/content/trails/{trail}'
 */
export const destroyTrail = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyTrail.url(args, options),
    method: 'delete',
})

destroyTrail.definition = {
    methods: ["delete"],
    url: '/admin/content/trails/{trail}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:245
 * @route '/admin/content/trails/{trail}'
 */
destroyTrail.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyTrail.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:245
 * @route '/admin/content/trails/{trail}'
 */
destroyTrail.delete = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyTrail.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:245
 * @route '/admin/content/trails/{trail}'
 */
    const destroyTrailForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyTrail.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyTrail
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:245
 * @route '/admin/content/trails/{trail}'
 */
        destroyTrailForm.delete = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyTrail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyTrail.form = destroyTrailForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:255
 * @route '/admin/content/trails/{trail}/lessons'
 */
export const storeLesson = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLesson.url(args, options),
    method: 'post',
})

storeLesson.definition = {
    methods: ["post"],
    url: '/admin/content/trails/{trail}/lessons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:255
 * @route '/admin/content/trails/{trail}/lessons'
 */
storeLesson.url = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeLesson.definition.url
            .replace('{trail}', parsedArgs.trail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:255
 * @route '/admin/content/trails/{trail}/lessons'
 */
storeLesson.post = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLesson.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:255
 * @route '/admin/content/trails/{trail}/lessons'
 */
    const storeLessonForm = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLesson.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::storeLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:255
 * @route '/admin/content/trails/{trail}/lessons'
 */
        storeLessonForm.post = (args: { trail: number | { id: number } } | [trail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLesson.url(args, options),
            method: 'post',
        })
    
    storeLesson.form = storeLessonForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
export const showLesson = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLesson.url(args, options),
    method: 'get',
})

showLesson.definition = {
    methods: ["get","head"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
showLesson.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
showLesson.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLesson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
showLesson.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLesson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
    const showLessonForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLesson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
        showLessonForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLesson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::showLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:104
 * @route '/admin/content/lessons/{lesson}'
 */
        showLessonForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLesson.form = showLessonForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:288
 * @route '/admin/content/lessons/{lesson}'
 */
export const updateLesson = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateLesson.url(args, options),
    method: 'patch',
})

updateLesson.definition = {
    methods: ["patch"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:288
 * @route '/admin/content/lessons/{lesson}'
 */
updateLesson.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:288
 * @route '/admin/content/lessons/{lesson}'
 */
updateLesson.patch = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateLesson.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:288
 * @route '/admin/content/lessons/{lesson}'
 */
    const updateLessonForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateLesson.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::updateLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:288
 * @route '/admin/content/lessons/{lesson}'
 */
        updateLessonForm.patch = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateLesson.form = updateLessonForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:319
 * @route '/admin/content/lessons/{lesson}'
 */
export const destroyLesson = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLesson.url(args, options),
    method: 'delete',
})

destroyLesson.definition = {
    methods: ["delete"],
    url: '/admin/content/lessons/{lesson}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:319
 * @route '/admin/content/lessons/{lesson}'
 */
destroyLesson.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:319
 * @route '/admin/content/lessons/{lesson}'
 */
destroyLesson.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLesson.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:319
 * @route '/admin/content/lessons/{lesson}'
 */
    const destroyLessonForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyLesson.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::destroyLesson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:319
 * @route '/admin/content/lessons/{lesson}'
 */
        destroyLessonForm.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyLesson.form = destroyLessonForm
const AdminContentController = { index, storeSubject, showSubject, updateSubject, destroySubject, storeTrail, showTrail, updateTrail, destroyTrail, storeLesson, showLesson, updateLesson, destroyLesson }

export default AdminContentController