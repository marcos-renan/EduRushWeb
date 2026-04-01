import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:201
 * @route '/admin/questions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:201
 * @route '/admin/questions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:201
 * @route '/admin/questions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:201
 * @route '/admin/questions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminPanelController::store
 * @see app/Http/Controllers/Web/Admin/AdminPanelController.php:201
 * @route '/admin/questions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const questions = {
    store: Object.assign(store, store),
}

export default questions