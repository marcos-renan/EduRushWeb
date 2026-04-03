import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:282
 * @route '/admin/badges'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/badges',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:282
 * @route '/admin/badges'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:282
 * @route '/admin/badges'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:282
 * @route '/admin/badges'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:282
 * @route '/admin/badges'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const badges = {
    store: Object.assign(store, store),
}

export default badges