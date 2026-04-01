import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:113
 * @route '/admin/subjects'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/subjects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:113
 * @route '/admin/subjects'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:113
 * @route '/admin/subjects'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:113
 * @route '/admin/subjects'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:113
 * @route '/admin/subjects'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const subjects = {
    store: Object.assign(store, store),
}

export default subjects