import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::role
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:348
 * @route '/admin/students/{user}/role'
 */
export const role = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: role.url(args, options),
    method: 'patch',
})

role.definition = {
    methods: ["patch"],
    url: '/admin/students/{user}/role',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::role
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:348
 * @route '/admin/students/{user}/role'
 */
role.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return role.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::role
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:348
 * @route '/admin/students/{user}/role'
 */
role.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: role.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::role
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:348
 * @route '/admin/students/{user}/role'
 */
    const roleForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: role.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::role
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:348
 * @route '/admin/students/{user}/role'
 */
        roleForm.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: role.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    role.form = roleForm
const students = {
    role: Object.assign(role, role),
}

export default students