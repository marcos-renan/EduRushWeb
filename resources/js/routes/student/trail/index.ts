import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
export const show = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/trilhas/{trailSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
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
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
show.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
show.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
    const showForm = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
        showForm.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
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
const trail = {
    show: Object.assign(show, show),
}

export default trail