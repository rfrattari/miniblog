var app = angular.module('MiModulo',['ngRoute', 'ngTable', 'ngCookies']);
            app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', { template: "<layout></layout><listposts></listposts>" })
        //miniblog
        .when('/admin/posts/view/:id', {
            template: '<viewposts></viewposts>'
        })
        .when('/admin/posts/create', {
            template: '<createposts></createposts>'
        })
        .when('/admin/posts/delete/:id', {
            template: '<deleteposts></deleteposts>'
        })
        .when('/admin/posts/edit/:id', {
            template: '<editposts></editposts>'
        })
        .otherwise({ redirectTo: '/' });
}]);
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.directive('layout', function(){
  return {
    restrict: 'E',
    controller: 'layoutCtrl',
    templateUrl: 'app/modulos/layout.html'
  };
});
app.controller('layoutCtrl', function($scope, $http, $compile, $timeout, $location, NgTableParams, $cookies, auth) {
    
});