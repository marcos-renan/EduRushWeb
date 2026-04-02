import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
export const show = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/materias/{subjectSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
show.url = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subjectSlug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    subjectSlug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subjectSlug: args.subjectSlug,
                }

    return show.definition.url
            .replace('{subjectSlug}', parsedArgs.subjectSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
show.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
show.head = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
    const showForm = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
        showForm.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
        showForm.head = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const subject = {
    show: Object.assign(show, show),
}

export default subject