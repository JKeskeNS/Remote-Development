var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    
    var refresh = function () {
        $http.get('/api/users').success(function (response) {
            console.log('I got the data I requested');
            $scope.userList = response;
            $scope.user = '';
        });
    };
    
    refresh();
        
    $scope.removeUser = function(userID){
        $http.delete('/api/users/' + userID,$scope.user);
        refresh();
    };
    
    $scope.clearInfo = function(){
        $scope.user = '';
    };
    
    $scope.editUser = function(userID){
        $http.get('/api/users/'+userID).success(function (response) {
            $scope.user = response;
        });
    };
    
    $scope.updateUser = function(){
        if (typeof $scope.user._id === 'undefined'){
            console.log('Error: No user defined to update');
            $scope.user = '';
        } else if(typeof $scope.user.userName === 'undefined' || typeof $scope.user.name === 'undefined' || typeof $scope.user.server === 'undefined'){
            console.log('Error: Can not update with empty field');
            $scope.user = '';
        } else if(($scope.user.userName.replace(/\s/g, '').length) === 0 || ($scope.user.name.replace(/\s/g, '').length) === 0 || ($scope.user.server.replace(/\s/g, '').length) === 0) {
            console.log('Error: Can not start update with spaces');
            $scope.user = '';
        } else{
            $http.put('/api/users/' + $scope.user._id, $scope.user).success(function(response) {
            refresh();
            }); 
        }
    }
    
    $scope.addUser = function(){
        if(typeof $scope.user.userName === 'undefined' || typeof $scope.user.name === 'undefined' || typeof $scope.user.server === 'undefined'){
            console.log('Error: Need data to add user'); 
            $scope.user = '';
        } else if((($scope.user.userName.replace(/\s/g, '').length) === 0) || (($scope.user.name.replace(/\s/g, '').length) === 0) || (($scope.user.server.replace(/\s/g, '').length) === 0)){
            console.log('Error: Data can not start with a space');
            $scope.user = '';
        } else{
            $http.post('/api/users', $scope.user).success(function (response) {
            console.log(response);
            refresh();
            });
        }
    };
}]);