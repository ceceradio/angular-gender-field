(function() {
    var app = angular.module('gender-field', []);
    app.directive('genderField', function($document, $timeout) {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            useTextField: '=?',
            selectClasses: '=?',
            withBootstrap: '=?',
            withBootstrapJs: '=?',
            useSource: '=?',
            buttonId: '=?',
            useSearching: '=?',
            scrollableHeight: '=?',
            hideGlyphicon: '=?'
        },
        link: function (scope, element, attrs) {
            scope.toggleDropdown = function(force) {
                if (!scope.isOpen()) 
                    scope.searching = false;
                if (scope.withBootstrapJs===true && !force)
                    return;
                angular.element(element[0].querySelector('.dropdown-toggle')).parent().toggleClass("open");
            };

            scope.isOpen = function() {
                return angular.element(element[0].querySelector('.dropdown-toggle')).parent().hasClass("open");
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
            scope.bootstrapTyping = function() {
                if (!scope.isOpen() && scope.useSearching) {
                    scope.toggleDropdown(true);
                    scope.searching = true;
                }
            };
            scope.bootstrapInputBlur = function() {
                if (scope.cancelBlur) {
                    return (scope.cancelBlur = false);
                }
                $timeout(function() {
                    scope.searching = false;
                    if (scope.isOpen()) {
                        scope.toggleDropdown(true);
                    }
                },250);
            }
            scope.bootstrapInputKeydown = function($event) {
                if (scope.isOpen() && ($event.which==40 || $event.which == 38) ) {
                    scope.cancelBlur = true;
                    if (scope.withBootstrapJs) {
                        var result= $(element[0]).find('[role="menu"]');
                        var bsEvent = { which: $event.which, type: "keydown.bs.dropdown.data-api"};
                        result.trigger(bsEvent);
                    }
                    else if (scope.withBootstrap) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        element[0].querySelector("li:not(.ng-hide) a").focus();
                    }
                }
            }
            scope.bootstrapSelectKeydown = function($event, gender) {
                if ($event.which == 13 || $event.which == 32) {
                    scope.select(gender);
                }
                else if (scope.withBootstrap && !scope.withBootstrapJs) {
                    var allShownGenders = element[0].querySelectorAll("li:not(.ng-hide) a");
                    var currentIndex = Array.prototype.indexOf.call(allShownGenders, document.activeElement);
                    var nextIndex = -1;
                    if ($event.which == 40) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        if (currentIndex+1<allShownGenders.length)
                            nextIndex = currentIndex+1;
                    }
                    else if ($event.which == 38) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        if (currentIndex-1>=0)
                            nextIndex = currentIndex-1;
                    }
                    if (nextIndex != -1) 
                         allShownGenders[nextIndex].focus();
                }
            }
            scope.bootstrapButtonKeydown = function($event) {
                if (scope.withBootstrap && !scope.withBootstrapJs) {
                    var allShownGenders = element[0].querySelectorAll("li:not(.ng-hide) a");
                    var nextIndex = -1;
                    if ($event.which == 40 || $event.which == 38) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        nextIndex = 0;
                    }
                    if (nextIndex != -1) 
                         allShownGenders[nextIndex].focus();
                }
            }
            scope.partialMatch = function(gender) {
                return gender.toLowerCase().indexOf(scope.data.selectValue.toLowerCase()) > -1;
            }
            scope.$watch('data.selectValue', function() {
                if (scope.data.selectValue == "Other" && scope.useTextField == 'onOther') {
                    scope.useTextField = true;
                    $timeout(function() {
                        element[0].querySelector('input').focus();
                        element[0].querySelector('input').select();
                    }, 40);   
                }
                scope.ngModel = scope.data.selectValue;
            });
            scope.$watch('ngModel', function() {
                scope.data.selectValue = scope.ngModel;
            })
        },
        controller: function ($scope, $http) {
            if (typeof $scope.useTextField === "undefined")
                $scope.useTextField = "onOther";
            if (typeof $scope.selectClasses === "undefined")
                $scope.selectClasses = "";
            if (typeof $scope.withBootstrap === "undefined")
                $scope.withBootstrap = false;
            if (typeof $scope.withBootstrapJs === "undefined")
                $scope.withBootstrapJs = false;
            if (typeof $scope.useSearching === "undefined")
                $scope.useSearching = true;
            if (typeof $scope.scrollableHeight === "undefined")
                $scope.scrollableHeight = "200px;"
            if (typeof $scope.buttonId === "undefined")
                $scope.buttonId = "genderDropdownButton"+Math.floor(Math.random()*999);
            $scope.genders = [];
            $scope.data = {selectValue: $scope.ngModel};


            

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
            '<select ng-model="data.selectValue" ng-class="{{selectClasses}}" ng-if="!(withBootstrap || withBootstrapJs)" ng-show="useTextField!==true">'
            +'<option ng-repeat="gender in genders" value="{{gender}}" ng-selected="data.selectValue==gender">{{gender}}</option>'
            +'</select>'
            +'<input ng-class="{{selectClasses}}" ng-model="data.selectValue" ng-if="!(withBootstrap || withBootstrapJs)" ng-show="useTextField===true"/>'
            +'<div class="has-feedback" ng-if="withBootstrap || withBootstrapJs"><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" id="{{buttonId}}" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" ng-click="toggleDropdown()" ng-keydown="bootstrapButtonKeydown($event)">Select <span class="caret"></span></button>'
            +'<ul aria-labelledby="{{buttonId}}" class="dropdown-menu" role="menu" ng-style="getScrollStyle()">'
            +'<li ng-keydown="bootstrapSelectKeydown($event, gender)" ng-show="!searching || (searching && partialMatch(gender))" ng-repeat="gender in genders" role="presentation"><a style="padding-left:0.3em" role="button" ng-click="select(gender)" tabindex="-1"><span ng-show="isSelected(gender)" class="glyphicon glyphicon-ok pull-left" aria-hidden="true"></span><span ng-style="getStyle(gender)">{{gender}}</span></a></li>'
            +'</ul></div><input type="text" ng-keydown="bootstrapInputKeydown($event)" ng-blur="bootstrapInputBlur()" ng-change="bootstrapTyping()" class="form-control" ng-model="data.selectValue" aria-label="Gender"></div><span ng-hide="hideGlyphicon" class="glyphicon glyphicon-pencil form-control-feedback"></span></div>'
      };
    })
})();