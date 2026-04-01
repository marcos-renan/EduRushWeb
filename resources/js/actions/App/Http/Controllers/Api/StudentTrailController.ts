import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/trails',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentTrailController::index
 * @see app/Http/Controllers/Api/StudentTrailController.php:18
 * @route '/api/v1/student/trails'
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
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
export const show = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/trails/{trailSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
show.url = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trailSlug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    trailSlug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trailSlug: args.trailSlug,
                }

    return show.definition.url
            .replace('{trailSlug}', parsedArgs.trailSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
show.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
show.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
    const showForm = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
        showForm.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentTrailController::show
 * @see app/Http/Controllers/Api/StudentTrailController.php:25
 * @route '/api/v1/student/trails/{trailSlug}'
 */
        showForm.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const StudentTrailController = { index, show }

export default StudentTrailController