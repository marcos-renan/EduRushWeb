import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import subject from './subject'
import trail from './trail'
import lesson from './lesson'
/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::importJson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:172
 * @route '/admin/content/import-json'
 */
export const importJson = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importJson.url(options),
    method: 'post',
})

importJson.definition = {
    methods: ["post"],
    url: '/admin/content/import-json',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::importJson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:172
 * @route '/admin/content/import-json'
 */
importJson.url = (options?: RouteQueryOptions) => {
    return importJson.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::importJson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:172
 * @route '/admin/content/import-json'
 */
importJson.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importJson.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::importJson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:172
 * @route '/admin/content/import-json'
 */
    const importJsonForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importJson.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AdminContentController::importJson
 * @see app/Http/Controllers/Web/Admin/AdminContentController.php:172
 * @route '/admin/content/import-json'
 */
        importJsonForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importJson.url(options),
            method: 'post',
        })
    
    importJson.form = importJsonForm
const content = {
    importJson: Object.assign(importJson, importJson),
subject: Object.assign(subject, subject),
trail: Object.assign(trail, trail),
lesson: Object.assign(lesson, lesson),
}

export default content