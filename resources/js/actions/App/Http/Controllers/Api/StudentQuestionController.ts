import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
export const index = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/lessons/{lessonSlug}/questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
index.url = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{lessonSlug}', parsedArgs.lessonSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
index.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
index.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
    const indexForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
        indexForm.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentQuestionController::index
 * @see app/Http/Controllers/Api/StudentQuestionController.php:19
 * @route '/api/v1/student/lessons/{lessonSlug}/questions'
 */
        indexForm.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const StudentQuestionController = { index }

export default StudentQuestionController