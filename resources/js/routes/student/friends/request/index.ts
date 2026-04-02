import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::store
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::store
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::store
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::store
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::store
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::accept
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
export const accept = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos/{requestExternalId}/aceitar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::accept
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
accept.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { requestExternalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    requestExternalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        requestExternalId: args.requestExternalId,
                }

    return accept.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::accept
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
accept.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::accept
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
    const acceptForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: accept.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::accept
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
        acceptForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: accept.url(args, options),
            method: 'post',
        })
    
    accept.form = acceptForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::reject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
export const reject = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos/{requestExternalId}/recusar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::reject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
reject.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { requestExternalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    requestExternalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        requestExternalId: args.requestExternalId,
                }

    return reject.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::reject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
reject.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::reject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
    const rejectForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::reject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
        rejectForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const request = {
    store: Object.assign(store, store),
accept: Object.assign(accept, accept),
reject: Object.assign(reject, reject),
}

export default request