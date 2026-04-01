import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentProfileController::show
 * @see app/Http/Controllers/Api/StudentProfileController.php:17
 * @route '/api/v1/student/profile'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\StudentProfileController::update
 * @see app/Http/Controllers/Api/StudentProfileController.php:24
 * @route '/api/v1/student/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/student/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\StudentProfileController::update
 * @see app/Http/Controllers/Api/StudentProfileController.php:24
 * @route '/api/v1/student/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentProfileController::update
 * @see app/Http/Controllers/Api/StudentProfileController.php:24
 * @route '/api/v1/student/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\StudentProfileController::update
 * @see app/Http/Controllers/Api/StudentProfileController.php:24
 * @route '/api/v1/student/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentProfileController::update
 * @see app/Http/Controllers/Api/StudentProfileController.php:24
 * @route '/api/v1/student/profile'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\StudentProfileController::updatePhoto
 * @see app/Http/Controllers/Api/StudentProfileController.php:39
 * @route '/api/v1/student/profile/photo'
 */
export const updatePhoto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePhoto.url(options),
    method: 'post',
})

updatePhoto.definition = {
    methods: ["post"],
    url: '/api/v1/student/profile/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentProfileController::updatePhoto
 * @see app/Http/Controllers/Api/StudentProfileController.php:39
 * @route '/api/v1/student/profile/photo'
 */
updatePhoto.url = (options?: RouteQueryOptions) => {
    return updatePhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentProfileController::updatePhoto
 * @see app/Http/Controllers/Api/StudentProfileController.php:39
 * @route '/api/v1/student/profile/photo'
 */
updatePhoto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePhoto.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentProfileController::updatePhoto
 * @see app/Http/Controllers/Api/StudentProfileController.php:39
 * @route '/api/v1/student/profile/photo'
 */
    const updatePhotoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePhoto.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentProfileController::updatePhoto
 * @see app/Http/Controllers/Api/StudentProfileController.php:39
 * @route '/api/v1/student/profile/photo'
 */
        updatePhotoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePhoto.url(options),
            method: 'post',
        })
    
    updatePhoto.form = updatePhotoForm
const StudentProfileController = { show, update, updatePhoto }

export default StudentProfileController