(function() {
    var app = angular.module('gender-field', []);
    app.directive('genderField', function($document) {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            selectClasses: '=',
            withBootstrap: '=',
            withBootstrapJs: '=',
            useSource: '=',
            buttonId: '=',
            scrollableHeight: '='
        },
        link: function (scope, element, attrs) {
            scope.toggleDropdown = function() {
                if (scope.withBootstrapJs===true)
                    return;
                angular.element(element[0].querySelector('div.dropdown')).toggleClass("open");
            };

            scope.isOpen = function() {
                if (scope.withBootstrapJs===true)
                    return;
                angular.element(element[0].querySelector('div.dropdown')).hasClass("open");
            };
            scope.isSelected = function(gender) {
                return gender == scope.ngModel;
            }
            scope.getStyle = function(gender) {
                if (scope.isSelected(gender)) {
                    return {'padding-left':'0.3em'};
                }
                else {
                    return {'padding-left':'1.3em'};
                }
            }
            scope.select = function(gender) {
                scope.ngModel = gender;
                scope.toggleDropdown();
            }
            scope.getScrollStyle = function() {
                if (typeof scope.scrollableHeight !== "undefined")
                    return { 'height': scope.scrollableHeight, 'overflow-y': 'scroll' };
                return {};
            }
        },
        controller: function ($scope, $http) {
            $scope.data = {selectValue: $scope.ngModel};
            $scope.$watch('data.selectValue', function() {
                $scope.ngModel = $scope.data.selectValue;
            });
            $scope.$watch('ngModel', function() {
                $scope.data.selectValue = $scope.ngModel;
            })
            $scope.genders = [];
            if (typeof $scope.buttonId === "undefined") {
                $scope.buttonId = "genderDropdownButton"+Math.floor(Math.random()*999);
            }
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
        template: 
            '<select ng-model="data.selectValue" class="{{selectClasses}}" ng-if="!(withBootstrap || withBootstrapJs)">'
            +'<option ng-repeat="gender in genders" value="{{gender}}" ng-selected="data.selectValue==gender">{{gender}}</option>'
            +'</select>'
            +'<div ng-if="withBootstrap || withBootstrapJs" class="dropdown"><button class="btn btn-default dropdown-toggle" id="{{buttonId}}" type="button" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" ng-click="toggleDropdown()">{{ngModel}}<span class="caret"></span></button>'
            +'<div class="dropdown-backdrop" ng-show="isOpen()" ng-click="toggleDropdown()"></div>'
            +'<ul aria-labelledby="{{buttonId}}" ng-style="getScrollStyle()" class="dropdown-menu" role="menu" aria-labelledby="genderDropdown">'
            +'<li ng-repeat="gender in genders" role="presentation"><a style="padding-left:0.3em" role="menuitem" ng-click="select(gender)" tabindex="-1"><span ng-show="isSelected(gender)" class="glyphicon glyphicon-ok pull-left" aria-hidden="true"></span><span ng-style="getStyle(gender)">{{gender}}</span></a></li>'
            +'</ul></div>'
      };
    })
})();