import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import subjects from './subjects'
import trails from './trails'
import lessons from './lessons'
import questions from './questions'
import missions43dab7 from './missions'
import badgesA89659 from './badges'
import students4fe9ea from './students'
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
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
export const content = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: content.url(options),
    method: 'get',
})

content.definition = {
    methods: ["get","head"],
    url: '/admin/content',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
content.url = (options?: RouteQueryOptions) => {
    return content.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
content.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: content.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
content.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: content.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
    const contentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: content.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
        contentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: content.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::content
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:49
 * @route '/admin/content'
 */
        contentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: content.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    content.form = contentForm
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
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
content: Object.assign(content, content),
subjects: Object.assign(subjects, subjects),
trails: Object.assign(trails, trails),
lessons: Object.assign(lessons, lessons),
questions: Object.assign(questions, questions),
missions: Object.assign(missions, missions43dab7),
badges: Object.assign(badges, badgesA89659),
students: Object.assign(students, students4fe9ea),
}

export default admin