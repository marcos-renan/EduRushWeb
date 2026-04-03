import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
export const adminEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminEdit.url(options),
    method: 'get',
})

adminEdit.definition = {
    methods: ["get","head"],
    url: '/admin/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
adminEdit.url = (options?: RouteQueryOptions) => {
    return adminEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
adminEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminEdit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
adminEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminEdit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
    const adminEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminEdit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
        adminEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminEdit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::adminEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:33
 * @route '/admin/profile'
 */
        adminEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminEdit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminEdit.form = adminEditForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
export const studentEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentEdit.url(options),
    method: 'get',
})

studentEdit.definition = {
    methods: ["get","head"],
    url: '/student/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
studentEdit.url = (options?: RouteQueryOptions) => {
    return studentEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
studentEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentEdit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
studentEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentEdit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
    const studentEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: studentEdit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
        studentEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentEdit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::studentEdit
 * @see app/Http/Controllers/Settings/ProfileController.php:28
 * @route '/student/profile'
 */
        studentEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentEdit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    studentEdit.form = studentEditForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:72
 * @route '/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:72
 * @route '/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:72
 * @route '/settings/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:72
 * @route '/settings/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:72
 * @route '/settings/profile'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::updatePhoto
 * @see app/Http/Controllers/Settings/ProfileController.php:101
 * @route '/settings/profile/photo'
 */
export const updatePhoto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePhoto.url(options),
    method: 'post',
})

updatePhoto.definition = {
    methods: ["post"],
    url: '/settings/profile/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::updatePhoto
 * @see app/Http/Controllers/Settings/ProfileController.php:101
 * @route '/settings/profile/photo'
 */
updatePhoto.url = (options?: RouteQueryOptions) => {
    return updatePhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::updatePhoto
 * @see app/Http/Controllers/Settings/ProfileController.php:101
 * @route '/settings/profile/photo'
 */
updatePhoto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePhoto.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::updatePhoto
 * @see app/Http/Controllers/Settings/ProfileController.php:101
 * @route '/settings/profile/photo'
 */
    const updatePhotoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePhoto.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::updatePhoto
 * @see app/Http/Controllers/Settings/ProfileController.php:101
 * @route '/settings/profile/photo'
 */
        updatePhotoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePhoto.url(options),
            method: 'post',
        })
    
    updatePhoto.form = updatePhotoForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:135
 * @route '/settings/profile'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:135
 * @route '/settings/profile'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:135
 * @route '/settings/profile'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:135
 * @route '/settings/profile'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:135
 * @route '/settings/profile'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProfileController = { adminEdit, studentEdit, update, updatePhoto, destroy }

export default ProfileController