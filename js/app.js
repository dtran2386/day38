var mainApp = angular.module('MarvelApp', ['ngRoute']);
var requestURL = 'http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=D&limit=50&apikey=06ea344c402ac50cd0af89518b4a9284';

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('./list', {
            controller: 'ListController',
            templateUrl: 'sections/listview.html',
        })
        .when('./detailed', {
            controller: 'DetailedListController',
            templateUrl: 'sections/detailedview.html',
        });
}]);

mainApp.controller('ListController', ['$scope', 'DetailedView', function ($scope, DetailedView) {
    $scope.heroes = []; //empty array for heroes(first ajax request)
    $scope.query = '';
    
    $http({
        method: 'GET',
        url: requestURL,
    }).then(function (response) {
        $scope.heroes = response.data.data.results;
//        console.log(response);
    });
}]);

mainApp.controller('DetailedListController', ['$scope', 'DetailedView', function ($scope, DetailedView) {
    $scope.events = []; //empty array for events(second ajax request)

    $scope.getDetails = function(input) {
        $http({
            method: 'get',
            url: 'http://gateway.marvel.com:80/v1/public/characters/' + input.id + '/events?limit=50&apikey=06ea344c402ac50cd0af89518b4a9284',
        }).then(function(response) {
            console.log(response);
            $scope.events = response.data.data.results;
        });
        $scope.current = {
            name: input.name,
            image: input.thumbnail.path + '.' + input.thumbnail.extension,
        };
    };
    $scope.cart = DetailedView.gimme();
}]);

mainApp.factory('DetailedView', function() {
    $scope.heroes = []; //empty array for heroes(first ajax request)
    $scope.query = '';
    
    $http({
        method: 'GET',
        url: requestURL,
    }).then(function (response) {
        $scope.heroes = response.data.data.results;
//        console.log(response);
    });
});