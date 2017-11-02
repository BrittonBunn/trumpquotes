function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function prettyAlert(text){
    var alert = document.getElementsByClassName('formAlert')[0];
    alert.innerText = text;
    alert.style.display = 'block';
}

angular.module('app', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('random', {
                    url: '/random',
                    templateUrl: '/random.html',
                    controller: 'RandomCtrl'
                })
                .state('search', {
                    url: '/search',
                    templateUrl: '/search.html',
                    controller: 'SearchCtrl'
                })
                .state('all', {
                    url: '/all',
                    templateUrl: '/all.html',
                    controller: 'AllCtrl'
                });
            $urlRouterProvider.otherwise('random');
        }])
    .controller('RandomCtrl', [
        '$scope',
        '$http',
        function($scope, $http){

            $scope.quotes = [];


            $scope.getRandom = function() {
                console.log("getRandom reached");
                var url = '/random';
                $http({
                    url: url,
                    method: "GET"
                }).then(function(res){
                    $scope.quotes = [];
                    $scope.quotes.push(res.data);
                });
            }


        }


    ])
    .controller('SearchCtrl', [
        '$scope',
        '$http',
        function($scope, $http){

            $scope.searchQuery = '';
            $scope.quotes = [];

            $scope.searchQuotes= function() {
                console.log("searchQuotes reached");
                var query = $scope.searchQuery.trim();
                var url = '/search?q=' + query;
                $http({
                    url: url,
                    method: "GET"
                }).then(function(res){
                    if (!res.data.length){
                        $scope.quotes.push("No Results Found")
                    } else {
                        $scope.quotes = res.data;
                    }
                });
                $scope.searchQuery = '';
            }

        }
    ])
    .controller('AllCtrl', [
        '$scope',
        '$http',
        function($scope, $http){

            $scope.quotes = [];
            $scope.getAll= function() {
                console.log("getAll reached");
                var url = '/all';
                $http({
                    url: url,
                    method: "GET"
                }).then(function(res){
                    $scope.quotes = res.data;
                });
            }

        }
    ]);