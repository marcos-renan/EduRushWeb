import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:283
 * @route '/admin/missions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/missions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:283
 * @route '/admin/missions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:283
 * @route '/admin/missions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:283
 * @route '/admin/missions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:283
 * @route '/admin/missions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const missions = {
    store: Object.assign(store, store),
}

export default missions