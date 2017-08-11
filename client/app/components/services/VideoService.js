app.factory('VideoService', function ($http) {
    var authHeaders = {};
    var accessToken = window.localStorage.getItem("access_token");

    return {
        upload: function (formData) {
            authHeaders["x-access-token"] = accessToken;
            authHeaders["Content-Type"] = undefined;
         
            return $http.put(appConfig.baseUrl + '/api/videos/', formData, {
                transformRequest: angular.identity,
                headers: authHeaders
            })
        },
        getVideo: function (videoid) {
            authHeaders["x-access-token"] = accessToken;
            authHeaders["Content-Type"] = undefined;

            return $http.get(appConfig.baseUrl + '/api/videos/' + videoid , {
                transformRequest: angular.identity,
                headers: authHeaders
            })
        },
        getVideos: function (userid) {
            authHeaders["x-access-token"] = accessToken;
            authHeaders["Content-Type"] = undefined;

            return $http.get(appConfig.baseUrl + '/api/users/' + userid + "/videos/", {
                transformRequest: angular.identity,
                headers: authHeaders
            })
        }
    }
});