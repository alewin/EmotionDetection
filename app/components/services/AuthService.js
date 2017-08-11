/*AuthService allow to manage user authentication making request for login and signup*/

var _base64 = {
  encode: function(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  },
  decode: function(e) {
    return decodeURIComponent(Array.prototype.map.call(atob(e), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
};

app.factory('AuthService', function($http) {
    
    return {
        login: function(mail, password) {
            return $http({
                url: appConfig.baseUrl + '/api/auth/login',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(mail + ":" + password)
                },
                method: 'POST'
            });
        },
        refreshToken: function(oldtoken) {
            return $http({
                url: appConfig.baseUrl + '/api/token',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            });
        },
        signup: function(mail, reqData) {
            return $http({
                url: appConfig.baseUrl + '/api/user/' + mail,
                data: reqData,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'PUT'
            });
        },
        sendPasswordRecovery: function(mail) {
            return $http({
                url: appConfig.baseUrl + '/api/user/' + mail + '/pwdrecovery',
                method: 'GET'
            });
        },
        changeForgottenPassword: function(userID, newToken, newPassword) {
            return $http({
                url: appConfig.baseUrl + '/api/user/' + userID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(newToken + ":"),
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    'password': newPassword
                },
                method: 'POST'
            });
        },
        resendConfirm: function(userID) {
            return $http({
                url: appConfig.baseUrl + '/api/confirmation/resend/' + userID,
                method: 'GET'
            });
        }
    }
});
