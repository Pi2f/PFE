myApp.factory('sessionService',['$http', function($http){
    var serv = {};
    
    serv.getToken = function(){
        return localStorage.getItem('melanomeToken');
    }

    serv.storeToken = function(token){
        localStorage.setItem('melanomeToken', token)
    }

    serv.removeToken = function(){
        localStorage.removeItem('melanomeToken');        
    }

     serv.getSession = function(){
        var token = serv.getToken();
        if(token != null) {
            return $http.get('/api/session')
            .then(function(response){
                var session = {
                    user: response.data.user,
                    token: token
                }
                serv.createSession(session);
                return true;
            }, function(){
                return false;
            });
        } else {
            return new Promise(function(resolve, reject){
                resolve(false);
            });
        }
    }


    serv.createSession = function(session) {
        serv.user = session.user;
        serv.storeToken(session.token);
    }

    serv.deleteSession = function() {
        serv.user = null;
        serv.removeToken();
    }

    return serv;
}])