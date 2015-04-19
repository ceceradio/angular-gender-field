(function() {
    var app = angular.module('gender-field', []);
    app.directive('genderField', function() {
      return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            withBootstrap: '=',
            useSource: '='
        },
        controller: function ($scope, $http) {
            $scope.genders = [];
            if ($scope.useSource) {
                if (Array.isArray($scope.useSource)) {
                    $scope.genders = $scope.useSource;
                }
                else {
                    $http.get($scope.useSource).success(function(response) {
                        $scope.genders = response;
                    });
                }
            }
            else {
                $scope.genders = 
[
  "Agender",
  "Androgyne",
  "Androgynous",
  "Bigender",
  "Cis Female",
  "Cis Feminine",
  "Cis Male",
  "Cis Masculine",
  "Cis Woman",
  "Demigirl",
  "Demiguy",
  "Female",
  "Feminine",
  "Femme",
  "Genderqueer",
  "Genderweird",
  "Gender Fluid",
  "Intergender",
  "Intersex",
  "Male",
  "Man",
  "Masculine",
  "Neutrois",
  "Nonbinary",
  "Other",
  "Pangender",
  "Third Gender",
  "Trans Female",
  "Trans Male",
  "Trans Man",
  "Trans Feminine",
  "Trans Femme",
  "Trans Woman",
  "Woman"
];
            }
        },
        template: '<select ng-model="ngModel" ng-class="{\'form-control\': withBootstrap}">'
            +'<option ng-repeat="gender in genders" value="{{gender}}" ng-selected="ngModel==gender">{{gender}}</option>'
            +'</select>'
      };
    })
})();