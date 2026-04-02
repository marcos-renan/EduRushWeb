import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::dashboard
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:24
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
export const missions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: missions.url(options),
    method: 'get',
})

missions.definition = {
    methods: ["get","head"],
    url: '/admin/missions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
missions.url = (options?: RouteQueryOptions) => {
    return missions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
missions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: missions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
missions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: missions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
    const missionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: missions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
        missionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: missions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::missions
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:84
 * @route '/admin/missions'
 */
        missionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: missions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    missions.form = missionsForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeMission
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:236
 * @route '/admin/missions'
 */
export const storeMission = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMission.url(options),
    method: 'post',
})

storeMission.definition = {
    methods: ["post"],
    url: '/admin/missions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeMission
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:236
 * @route '/admin/missions'
 */
storeMission.url = (options?: RouteQueryOptions) => {
    return storeMission.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeMission
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:236
 * @route '/admin/missions'
 */
storeMission.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMission.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeMission
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:236
 * @route '/admin/missions'
 */
    const storeMissionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeMission.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeMission
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:236
 * @route '/admin/missions'
 */
        storeMissionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeMission.url(options),
            method: 'post',
        })
    
    storeMission.form = storeMissionForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
export const badges = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: badges.url(options),
    method: 'get',
})

badges.definition = {
    methods: ["get","head"],
    url: '/admin/badges',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
badges.url = (options?: RouteQueryOptions) => {
    return badges.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
badges.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: badges.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
badges.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: badges.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
    const badgesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: badges.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
        badgesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: badges.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::badges
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:94
 * @route '/admin/badges'
 */
        badgesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: badges.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    badges.form = badgesForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeBadge
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:266
 * @route '/admin/badges'
 */
export const storeBadge = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBadge.url(options),
    method: 'post',
})

storeBadge.definition = {
    methods: ["post"],
    url: '/admin/badges',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeBadge
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:266
 * @route '/admin/badges'
 */
storeBadge.url = (options?: RouteQueryOptions) => {
    return storeBadge.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeBadge
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:266
 * @route '/admin/badges'
 */
storeBadge.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBadge.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeBadge
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:266
 * @route '/admin/badges'
 */
    const storeBadgeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeBadge.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::storeBadge
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:266
 * @route '/admin/badges'
 */
        storeBadgeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeBadge.url(options),
            method: 'post',
        })
    
    storeBadge.form = storeBadgeForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
export const students = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/admin/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
students.url = (options?: RouteQueryOptions) => {
    return students.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
students.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
students.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
    const studentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
        studentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::students
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:103
 * @route '/admin/students'
 */
        studentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::updateUserRole
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:296
 * @route '/admin/students/{user}/role'
 */
export const updateUserRole = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUserRole.url(args, options),
    method: 'patch',
})

updateUserRole.definition = {
    methods: ["patch"],
    url: '/admin/students/{user}/role',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::updateUserRole
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:296
 * @route '/admin/students/{user}/role'
 */
updateUserRole.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateUserRole.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::updateUserRole
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:296
 * @route '/admin/students/{user}/role'
 */
updateUserRole.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUserRole.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::updateUserRole
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:296
 * @route '/admin/students/{user}/role'
 */
    const updateUserRoleForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateUserRole.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::updateUserRole
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:296
 * @route '/admin/students/{user}/role'
 */
        updateUserRoleForm.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateUserRole.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateUserRole.form = updateUserRoleForm
const AdminPanelController = { dashboard, missions, storeMission, badges, storeBadge, students, updateUserRole }

export default AdminPanelController