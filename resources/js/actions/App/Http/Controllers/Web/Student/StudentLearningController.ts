import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
export const subject = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subject.url(args, options),
    method: 'get',
})

subject.definition = {
    methods: ["get","head"],
    url: '/student/materias/{subjectSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
subject.url = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return subject.definition.url
            .replace('{subjectSlug}', parsedArgs.subjectSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
subject.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subject.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
subject.head = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subject.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
    const subjectForm = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subject.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
        subjectForm.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subject.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:63
 * @route '/student/materias/{subjectSlug}'
 */
        subjectForm.head = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    subject.form = subjectForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
export const trail = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trail.url(args, options),
    method: 'get',
})

trail.definition = {
    methods: ["get","head"],
    url: '/student/trilhas/{trailSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
trail.url = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return trail.definition.url
            .replace('{trailSlug}', parsedArgs.trailSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
trail.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
trail.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
    const trailForm = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
        trailForm.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:85
 * @route '/student/trilhas/{trailSlug}'
 */
        trailForm.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    trail.form = trailForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
export const lesson = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lesson.url(args, options),
    method: 'get',
})

lesson.definition = {
    methods: ["get","head"],
    url: '/student/licoes/{lessonSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
lesson.url = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return lesson.definition.url
            .replace('{lessonSlug}', parsedArgs.lessonSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
lesson.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lesson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
lesson.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lesson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
    const lessonForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lesson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
        lessonForm.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lesson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:101
 * @route '/student/licoes/{lessonSlug}'
 */
        lessonForm.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lesson.form = lessonForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:123
 * @route '/student/licoes/{lessonSlug}/submit'
 */
export const submitLesson = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitLesson.url(args, options),
    method: 'post',
})

submitLesson.definition = {
    methods: ["post"],
    url: '/student/licoes/{lessonSlug}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:123
 * @route '/student/licoes/{lessonSlug}/submit'
 */
submitLesson.url = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return submitLesson.definition.url
            .replace('{lessonSlug}', parsedArgs.lessonSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:123
 * @route '/student/licoes/{lessonSlug}/submit'
 */
submitLesson.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitLesson.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:123
 * @route '/student/licoes/{lessonSlug}/submit'
 */
    const submitLessonForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitLesson.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:123
 * @route '/student/licoes/{lessonSlug}/submit'
 */
        submitLessonForm.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitLesson.url(args, options),
            method: 'post',
        })
    
    submitLesson.form = submitLessonForm
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
* @see \App\Http\Controllers\Web\Student\StudentLearningController::sendFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
export const sendFriendRequest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendFriendRequest.url(options),
    method: 'post',
})

sendFriendRequest.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::sendFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
sendFriendRequest.url = (options?: RouteQueryOptions) => {
    return sendFriendRequest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::sendFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
sendFriendRequest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendFriendRequest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::sendFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
    const sendFriendRequestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendFriendRequest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::sendFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:191
 * @route '/student/amigos/pedidos'
 */
        sendFriendRequestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendFriendRequest.url(options),
            method: 'post',
        })
    
    sendFriendRequest.form = sendFriendRequestForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::acceptFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
export const acceptFriendRequest = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptFriendRequest.url(args, options),
    method: 'post',
})

acceptFriendRequest.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos/{requestExternalId}/aceitar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::acceptFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
acceptFriendRequest.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { requestExternalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    requestExternalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        requestExternalId: args.requestExternalId,
                }

    return acceptFriendRequest.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::acceptFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
acceptFriendRequest.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptFriendRequest.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::acceptFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
    const acceptFriendRequestForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acceptFriendRequest.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::acceptFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:216
 * @route '/student/amigos/pedidos/{requestExternalId}/aceitar'
 */
        acceptFriendRequestForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acceptFriendRequest.url(args, options),
            method: 'post',
        })
    
    acceptFriendRequest.form = acceptFriendRequestForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::rejectFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
export const rejectFriendRequest = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectFriendRequest.url(args, options),
    method: 'post',
})

rejectFriendRequest.definition = {
    methods: ["post"],
    url: '/student/amigos/pedidos/{requestExternalId}/recusar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::rejectFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
rejectFriendRequest.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { requestExternalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    requestExternalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        requestExternalId: args.requestExternalId,
                }

    return rejectFriendRequest.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::rejectFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
rejectFriendRequest.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectFriendRequest.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::rejectFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
    const rejectFriendRequestForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectFriendRequest.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::rejectFriendRequest
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:232
 * @route '/student/amigos/pedidos/{requestExternalId}/recusar'
 */
        rejectFriendRequestForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectFriendRequest.url(args, options),
            method: 'post',
        })
    
    rejectFriendRequest.form = rejectFriendRequestForm
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::removeFriend
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
export const removeFriend = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeFriend.url(args, options),
    method: 'delete',
})

removeFriend.definition = {
    methods: ["delete"],
    url: '/student/amigos/{friendExternalId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::removeFriend
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
removeFriend.url = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return removeFriend.definition.url
            .replace('{friendExternalId}', parsedArgs.friendExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::removeFriend
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
removeFriend.delete = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeFriend.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::removeFriend
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
    const removeFriendForm = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeFriend.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::removeFriend
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:248
 * @route '/student/amigos/{friendExternalId}'
 */
        removeFriendForm.delete = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeFriend.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeFriend.form = removeFriendForm
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
const StudentLearningController = { dashboard, subjects, subject, trail, lesson, submitLesson, friends, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend, ranking }

export default StudentLearningController