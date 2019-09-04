var app = angular.module('MiModulo');
  app.directive('createposts', function(){
  return {
    restrict: 'E',
    controller: 'postsCtrl',
    templateUrl: 'app/modulos/modulo-posts/frontend/posts-frontend-crear.html',
    link: function($scope){
      $scope.createposts();
    }
  };
});
  app.directive('editposts', ['$routeParams', function($routeParams){
  return {
    restrict: 'E',
    controller: 'postsCtrl',
    templateUrl: 'app/modulos/modulo-posts/frontend/posts-frontend-crear.html',
    link: function($scope){
      $scope.editposts($routeParams.id);
    }
  };
}]);
  app.directive('viewposts', ['$routeParams', function($routeParams){
  return {
    restrict: 'E',
    controller: 'postsCtrl',
    templateUrl: 'app/modulos/modulo-posts/frontend/posts-frontend-crear.html',
    link: function($scope){
      $scope.viewposts($routeParams.id);
    }
  };
}]);
  app.directive('deleteposts', ['$routeParams', function($routeParams){
  return {
    restrict: 'E',
    controller: 'postsCtrl',
    templateUrl: 'app/modulos/modulo-posts/frontend/posts-frontend-crear.html',
    link: function($scope){
      $scope.deleteposts($routeParams.id);
    }
  };
}]);
  app.directive('listposts', function(){
  return {
    restrict: 'E',
    controller: 'postsCtrl',
    templateUrl: 'app/modulos/modulo-posts/frontend/posts-frontend-listar.html',
    link: function($scope){
      $scope.listposts();
    }
  };
});
app.controller('postsCtrl', function($scope, $http, $compile, $timeout, $location, NgTableParams) {
    var urllocal="http://localhost/miniblog/web";
    $scope.listposts=function(){
      $http.get(urllocal+'/app/modulos/modulo-posts/backend/posts-backend-list.php')
    .then(function (response) {
      $scope.posts = response.data.datos;
      $scope.tableParamsposts = new NgTableParams({ count: 10 }, { dataset: $scope.posts});});
    };
    $scope.postDataposts = function () {
    var request = $http({
        method: 'post',
        url: urllocal+'/app/modulos/modulo-posts/backend/posts-backend-crear.php',
        data: {posts:$scope.posts},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
    	console.log(response.data.mensaje);
    	if(response.data.error==false){
        $timeout($location.path('posts').replace(), 1000);
        setTimeout(function(){window.location.reload();});
      }
  	});
    };
    $scope.editarDataposts = function () {
    var request = $http({
        method: 'post',
        url: urllocal+'/app/modulos/modulo-posts/backend/posts-backend-editar.php',
        data: {posts:$scope.posts},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
      console.log(response.data.mensaje);
      if(response.data.error==false){
        $timeout($location.path('posts').replace(), 1000);
        setTimeout(function(){window.location.reload();});
      }
    });
    };
    $scope.eliminarDataposts = function () {
    var request = $http({
        method: 'post',
        url: urllocal+'/app/modulos/modulo-posts/backend/posts-backend-eliminar.php',
        data: {
            posts_pk: $scope.posts.posts_pk
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
      console.log(response.data.mensaje);
      if(response.data.error==false){
        $timeout($location.path('posts').replace(), 1000);
        setTimeout(function(){window.location.reload();});
      }
    });
    };
    $scope.selectposts = function(id){
       $http.get(urllocal+'/app/modulos/modulo-posts/backend/posts-backend-ver.php?id='+id)
       .then(function (response) {$scope.selectverposts = response.data.datos;
        $scope.posts={
          posts_pk:$scope.selectverposts[0].posts_PK,
          posts_titulo:$scope.selectverposts[0].posts_titulo,
          posts_descripcion:$scope.selectverposts[0].posts_descripcion
        }
       });

    };
	$scope.crearFormposts = function(isValid){
		if(isValid){
			$scope.postDataposts();	
		}
	};
  $scope.editarFormposts = function(isValid){
    if(isValid){
      $scope.editarDataposts();  
    }
  };
  $scope.eliminarFormposts = function(){
    var result = confirm('Seguro de que quiere eliminarlo?')
    if(result){
      $scope.eliminarDataposts();  
    }
  };
	$scope.editposts = function(id){
		$scope.selectposts(id);
		$scope.btnposts = 'Editar';
	};
	$scope.createposts = function(){
		$scope.posts_pk = null;
		$scope.posts_titulo = null;
		$scope.posts_descripcion = null;
		$scope.btnposts = 'Crear';
	};
  $scope.viewposts = function(id){
		$scope.selectposts(id);
    $scope.btnposts = 'Ver';
  };
  $scope.deleteposts = function(id){
		$scope.selectposts(id);
    $scope.btnposts = 'Eliminar';
  };
});
