myApp.factory('connectionService',['$http', '$q', 'sessionService', function($http,$q,sessionService){
    var serv = {};
    
    serv.login = function(email,pw){
        var req = {
            mail : email,
            password : pw
        };

        return $http.post('/api/authenticate',req)
            .then(function(response){
                if(response.data.err){
                    return response.data;
                } else {
                    var session = {
                        user: response.data.user,
                        token: response.data.token
                    }
                    sessionService.createSession(session);
                    return session;
                }
            }); 

    }

    serv.isAuthenticated = function() {
        return sessionService.getSession().then(function(success){
            if(success){
                return sessionService.user;
            }
        });
    }

    serv.logout=function () {        
        return $http.get('/api/logout/'+sessionService.user.id).then(function(){
            sessionService.deleteSession();
        });
    }


    return serv;
}])