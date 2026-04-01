import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentLessonController::submit
 * @see app/Http/Controllers/Api/StudentLessonController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/submit'
 */
export const submit = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/api/v1/student/lessons/{lessonSlug}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentLessonController::submit
 * @see app/Http/Controllers/Api/StudentLessonController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/submit'
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
* @see \App\Http\Controllers\Api\StudentLessonController::submit
 * @see app/Http/Controllers/Api/StudentLessonController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/submit'
 */
submit.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentLessonController::submit
 * @see app/Http/Controllers/Api/StudentLessonController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/submit'
 */
    const submitForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentLessonController::submit
 * @see app/Http/Controllers/Api/StudentLessonController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/submit'
 */
        submitForm.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const StudentLessonController = { submit }

export default StudentLessonController