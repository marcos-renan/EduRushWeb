import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
 * @route '/student/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
 * @route '/student/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
 * @route '/student/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
 * @route '/student/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
 * @route '/student/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::dashboard
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:30
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
 * @route '/student/materias'
 */
subjects.url = (options?: RouteQueryOptions) => {
    return subjects.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
 * @route '/student/materias'
 */
subjects.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subjects.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
 * @route '/student/materias'
 */
subjects.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subjects.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
 * @route '/student/materias'
 */
    const subjectsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subjects.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
 * @route '/student/materias'
 */
        subjectsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subjects.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subjects
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:47
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
 * @route '/student/materias/{subjectSlug}'
 */
subject.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subject.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
 * @route '/student/materias/{subjectSlug}'
 */
subject.head = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subject.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
 * @route '/student/materias/{subjectSlug}'
 */
    const subjectForm = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subject.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
 * @route '/student/materias/{subjectSlug}'
 */
        subjectForm.get = (args: { subjectSlug: string | number } | [subjectSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subject.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::subject
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:60
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
trail.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
trail.head = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
    const trailForm = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
 * @route '/student/trilhas/{trailSlug}'
 */
        trailForm.get = (args: { trailSlug: string | number } | [trailSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::trail
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:82
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
lesson.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lesson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
lesson.head = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lesson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
    const lessonForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lesson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
 * @route '/student/licoes/{lessonSlug}'
 */
        lessonForm.get = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lesson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::lesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:98
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
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
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
submitLesson.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitLesson.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
    const submitLessonForm = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitLesson.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Student\StudentLearningController::submitLesson
 * @see app/Http/Controllers/Web/Student/StudentLearningController.php:120
 * @route '/student/licoes/{lessonSlug}/submit'
 */
        submitLessonForm.post = (args: { lessonSlug: string | number } | [lessonSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitLesson.url(args, options),
            method: 'post',
        })
    
    submitLesson.form = submitLessonForm
const StudentLearningController = { dashboard, subjects, subject, trail, lesson, submitLesson }

export default StudentLearningController