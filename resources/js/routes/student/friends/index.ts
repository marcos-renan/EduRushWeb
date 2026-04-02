import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import request from './request'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::remove
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
export const remove = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/student/amigos/{friendExternalId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::remove
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
remove.url = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { friendExternalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    friendExternalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        friendExternalId: args.friendExternalId,
                }

    return remove.definition.url
            .replace('{friendExternalId}', parsedArgs.friendExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::remove
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
remove.delete = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::remove
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
    const removeForm = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: remove.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::remove
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
        removeForm.delete = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: remove.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    remove.form = removeForm
const friends = {
    request: Object.assign(request, request),
remove: Object.assign(remove, remove),
}

export default friends