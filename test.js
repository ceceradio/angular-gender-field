(function() {
    var app = angular.module('testGenders', ['gender-field']);
    app.controller('testController', function($scope) {
        $scope.vm = {gender: "Trans Woman"};
        //$scope.genders = [ "Gender1", "Gender2", "Gender3" ];
    })
})();