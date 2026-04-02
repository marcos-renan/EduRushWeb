import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import subject from './subject'
import trail from './trail'
import lesson from './lesson'
import friends982b32 from './friends'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/student/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:33
 * @route '/student/dashboard'
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
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/student/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profile.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
        profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::profile
 * @see app/Http/Controllers/Settings/ProfileController.php:29
 * @route '/student/profile'
 */
        profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profile.form = profileForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
export const subjects = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subjects.url(options),
    method: 'get',
})

subjects.definition = {
    methods: ["get","head"],
    url: '/student/materias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
subjects.url = (options?: RouteQueryOptions) => {
    return subjects.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
subjects.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subjects.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
subjects.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subjects.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
    const subjectsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subjects.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
        subjectsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subjects.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:50
 * @route '/student/materias'
 */
        subjectsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subjects.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    subjects.form = subjectsForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
export const friends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})

friends.definition = {
    methods: ["get","head"],
    url: '/student/amigos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
friends.url = (options?: RouteQueryOptions) => {
    return friends.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
friends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
friends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: friends.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
    const friendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: friends.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
        friendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: friends.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::friends
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:149
 * @route '/student/amigos'
 */
        friendsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: friends.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    friends.form = friendsForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
export const ranking = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranking.url(options),
    method: 'get',
})

ranking.definition = {
    methods: ["get","head"],
    url: '/student/ranking',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
ranking.url = (options?: RouteQueryOptions) => {
    return ranking.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
ranking.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranking.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
ranking.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ranking.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
    const rankingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ranking.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
        rankingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ranking.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::ranking
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:178
 * @route '/student/ranking'
 */
        rankingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ranking.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ranking.form = rankingForm
const student = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
subjects: Object.assign(subjects, subjects),
subject: Object.assign(subject, subject),
trail: Object.assign(trail, trail),
lesson: Object.assign(lesson, lesson),
friends: Object.assign(friends, friends982b32),
ranking: Object.assign(ranking, ranking),
}

export default student