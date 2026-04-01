import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
export const show = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/licoes/{lessonSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
show.url = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonSlug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lessonSlug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonSlug: args.lessonSlug,
                }

    return show.definition.url
            .replace('{lessonSlug}', parsedArgs.lessonSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
show.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
show.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
    const showForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
        showForm.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::show
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
        showForm.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submit
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
export const submit = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/student/licoes/{lessonSlug}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submit
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
submit.url = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonSlug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lessonSlug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonSlug: args.lessonSlug,
                }

    return submit.definition.url
            .replace('{lessonSlug}', parsedArgs.lessonSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submit
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
submit.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submit
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
    const submitForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submit
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
        submitForm.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const lesson = {
    show: Object.assign(show, show),
submit: Object.assign(submit, submit),
}

export default lesson