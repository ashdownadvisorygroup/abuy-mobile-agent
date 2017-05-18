/**
 * Created by admin on 16/03/2017.
 */
Abuy.factory('InterceptorFactory', ['$q', '$rootScope', '$localStorage', '$injector', '$translate', function ($q, $rootScope, $localStorage, $injector, $translate) {
  return {
    //lorsquon envoi une requette on met le token dans lentete
    request: function (config) {
      //console.log("je suis ici dans la requete de sortie");
      config.headers.Authorization = "Bearer " + $localStorage.token;
      // console.log("token "+ $localStorage.token);
      //console.log($localStorage.token);
      /*en envoi la requette*/
      var offset = new Date().getTimezoneOffset();
      offset = -offset;
      //console.log(offset);
      config.url = config.url + "?gmt=" + offset + "&lang=" + $translate.use() + "&access_token="+$localStorage.token;
      return config;
    },
    /*dans le cas ou la requete passe avec succes on regarde si le token est present dans lentete
     * auquel cas on le met dans la variable de session*/
    response: function (response) {
      if (token = response.headers('Authorization')) {
        /*on enregistre le token dans la varible de session*/
        /*on regarde sil y a le bearer dans le token de base et on le supprime*/
        console.log("ici on enregistre le token suivant " + token);
        $localStorage.token = token;
      }
      /*on retourne la reponse*/
      return response;
    },
    /*dans le cas ou on a une mauvaise reponse*/
    // responseError: function(rejection){
    //   if(rejection.status ===401 && rejection.data["error"]!="invalid_credentials"){
    //     /*on essaie de refresh le token cote serveur*/
    //
    //     console.log(rejection.data["error"]);
    //     var deffered = $q.defer();
    //     $injector.get("$http").post(testApiUrl+"/api/refresh?token="+$localStorage.token,{}, {
    //       headers: {
    //         Authorization: "Bearer "+$localStorage.token
    //       }
    //     }).then(function(response){
    //       /*si la requette passe, on aura un nouveau token et doit le garder dans notre storage*/
    //       /*ici le token est dans la variable refreshtoken*/
    //       $localStorage.token = response.refreshToken;
    //       console.log("voici le token refresh" +response.refreshToken);
    //       console.log("voici la reponse du refresh" +response);
    //       console.log("ici on vient de refresh le token");
    //
    //       /*on envoie a present la requete originale*/
    //
    //       /*ici on enregistre le token dans config avant de renvoyer la requete*/
    //       config.headers.Authorization= "Bearer "+$localStorage.token;
    //       $injector.get("$http")(response.config)
    //         .then(function(response){
    //           /*si la requete originale passe, on retourne le resultat*/
    //           return deffered.resolve(response);
    //         },function(){
    //           /*cette requete nest pas passee a nouveau*/
    //           /*So we reject the response and carry on with 401*/
    //           /*le token peut etre expire on le supprime en local et on renvoie lutilisateur en page de connexion*/
    //           delete $localStorage.token;
    //           $state.go('authentification');
    //           return deffered.reject();
    //         })
    //     },function(){
    //       /*le rafraichissement du token a echoue, on deconnecte lutilisateur et on lui renvoie la page de connexion */
    //       delete $localStorage.token;
    //       $state.go('authentification');
    //       return deffered.reject();
    //     });
    //     /*on continue avec lerreur 404 si on atteint ce point*/
    //     return deffered.promise;
    //   }
    //   return rejection;
    // }
    /*ici on teste le code alternatif du cas ou on a une mauvaise reponse*/
    responseError: function (rejection) {

      // Need to use $injector.get to bring in $state or else we get
      // a circular dependency error
      var $state = $injector.get('$state');
      console.log(rejection);

      // Instead of checking for a status code of 400 which might be used
      // for other reasons in Laravel, we check for the specific rejection
      // reasons to tell us if we need to redirect to the login state
      var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

      // Loop through each rejection reason and redirect to the login
      // state if one is encountered
      angular.forEach(rejectionReasons, function (value, key) {

        if (rejection.data.error === value) {

          // If we get a rejection corresponding to one of the reasons
          // in our array, we know we need to authenticate the user so
          // we can remove the current user from local storage
          //localStorage.removeItem('user');
          delete $localStorage.token;
          // Send the user to the auth state so they can login
          $state.go('signin');
        }
      });

      return $q.reject(rejection);
    }
    /*fin du test de notre code*/
  };

}]);
/*fin du code de lintercepteur*/
