import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/friends/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentFriendController::search
 * @see app/Http/Controllers/Api/StudentFriendController.php:19
 * @route '/api/v1/student/friends/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
export const requests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})

requests.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/friends/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
requests.url = (options?: RouteQueryOptions) => {
    return requests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
requests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
requests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
    const requestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: requests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
        requestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentFriendController::requests
 * @see app/Http/Controllers/Api/StudentFriendController.php:33
 * @route '/api/v1/student/friends/requests'
 */
        requestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    requests.form = requestsForm
/**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
export const friends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})

friends.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/friends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
friends.url = (options?: RouteQueryOptions) => {
    return friends.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
friends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
friends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: friends.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
    const friendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: friends.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
 */
        friendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: friends.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentFriendController::friends
 * @see app/Http/Controllers/Api/StudentFriendController.php:40
 * @route '/api/v1/student/friends'
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
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
export const ranking = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranking.url(options),
    method: 'get',
})

ranking.definition = {
    methods: ["get","head"],
    url: '/api/v1/student/friends/ranking',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
ranking.url = (options?: RouteQueryOptions) => {
    return ranking.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
ranking.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ranking.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
ranking.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ranking.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
    const rankingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ranking.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
 */
        rankingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ranking.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\StudentFriendController::ranking
 * @see app/Http/Controllers/Api/StudentFriendController.php:47
 * @route '/api/v1/student/friends/ranking'
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
/**
* @see \App\Http\Controllers\Api\StudentFriendController::storeRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:54
 * @route '/api/v1/student/friends/requests'
 */
export const storeRequest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRequest.url(options),
    method: 'post',
})

storeRequest.definition = {
    methods: ["post"],
    url: '/api/v1/student/friends/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::storeRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:54
 * @route '/api/v1/student/friends/requests'
 */
storeRequest.url = (options?: RouteQueryOptions) => {
    return storeRequest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::storeRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:54
 * @route '/api/v1/student/friends/requests'
 */
storeRequest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRequest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::storeRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:54
 * @route '/api/v1/student/friends/requests'
 */
    const storeRequestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRequest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::storeRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:54
 * @route '/api/v1/student/friends/requests'
 */
        storeRequestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRequest.url(options),
            method: 'post',
        })
    
    storeRequest.form = storeRequestForm
/**
* @see \App\Http\Controllers\Api\StudentFriendController::acceptRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:72
 * @route '/api/v1/student/friends/requests/{requestExternalId}/accept'
 */
export const acceptRequest = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptRequest.url(args, options),
    method: 'post',
})

acceptRequest.definition = {
    methods: ["post"],
    url: '/api/v1/student/friends/requests/{requestExternalId}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::acceptRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:72
 * @route '/api/v1/student/friends/requests/{requestExternalId}/accept'
 */
acceptRequest.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return acceptRequest.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::acceptRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:72
 * @route '/api/v1/student/friends/requests/{requestExternalId}/accept'
 */
acceptRequest.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptRequest.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::acceptRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:72
 * @route '/api/v1/student/friends/requests/{requestExternalId}/accept'
 */
    const acceptRequestForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acceptRequest.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::acceptRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:72
 * @route '/api/v1/student/friends/requests/{requestExternalId}/accept'
 */
        acceptRequestForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acceptRequest.url(args, options),
            method: 'post',
        })
    
    acceptRequest.form = acceptRequestForm
/**
* @see \App\Http\Controllers\Api\StudentFriendController::rejectRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:85
 * @route '/api/v1/student/friends/requests/{requestExternalId}/reject'
 */
export const rejectRequest = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectRequest.url(args, options),
    method: 'post',
})

rejectRequest.definition = {
    methods: ["post"],
    url: '/api/v1/student/friends/requests/{requestExternalId}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::rejectRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:85
 * @route '/api/v1/student/friends/requests/{requestExternalId}/reject'
 */
rejectRequest.url = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rejectRequest.definition.url
            .replace('{requestExternalId}', parsedArgs.requestExternalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentFriendController::rejectRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:85
 * @route '/api/v1/student/friends/requests/{requestExternalId}/reject'
 */
rejectRequest.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectRequest.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::rejectRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:85
 * @route '/api/v1/student/friends/requests/{requestExternalId}/reject'
 */
    const rejectRequestForm = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectRequest.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentFriendController::rejectRequest
 * @see app/Http/Controllers/Api/StudentFriendController.php:85
 * @route '/api/v1/student/friends/requests/{requestExternalId}/reject'
 */
        rejectRequestForm.post = (args: { requestExternalId: string | number } | [requestExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectRequest.url(args, options),
            method: 'post',
        })
    
    rejectRequest.form = rejectRequestForm
/**
* @see \App\Http\Controllers\Api\StudentFriendController::removeFriend
 * @see app/Http/Controllers/Api/StudentFriendController.php:98
 * @route '/api/v1/student/friends/{friendExternalId}'
 */
export const removeFriend = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeFriend.url(args, options),
    method: 'delete',
})

removeFriend.definition = {
    methods: ["delete"],
    url: '/api/v1/student/friends/{friendExternalId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\StudentFriendController::removeFriend
 * @see app/Http/Controllers/Api/StudentFriendController.php:98
 * @route '/api/v1/student/friends/{friendExternalId}'
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
* @see \App\Http\Controllers\Api\StudentFriendController::removeFriend
 * @see app/Http/Controllers/Api/StudentFriendController.php:98
 * @route '/api/v1/student/friends/{friendExternalId}'
 */
removeFriend.delete = (args: { friendExternalId: string | number } | [friendExternalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeFriend.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\StudentFriendController::removeFriend
 * @see app/Http/Controllers/Api/StudentFriendController.php:98
 * @route '/api/v1/student/friends/{friendExternalId}'
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
* @see \App\Http\Controllers\Api\StudentFriendController::removeFriend
 * @see app/Http/Controllers/Api/StudentFriendController.php:98
 * @route '/api/v1/student/friends/{friendExternalId}'
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
const StudentFriendController = { search, requests, friends, ranking, storeRequest, acceptRequest, rejectRequest, removeFriend }

export default StudentFriendController