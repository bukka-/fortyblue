var myApp = angular.module('myApp', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/views/table_show.html',
				controller: 'DropdownCtrl'
			})
			.when('/edit', {
				templateUrl: 'app/views/table_edit.html',
				controller: 'EditCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
});


function DropdownCtrl($scope) {
	$scope.items = [
		"IV-3 IB",
		"IV-2 IB",
		"IV-1 IB"
	];

	$scope.display = $scope.items[0];

	$scope.select = function(choice){
		$scope.display = choice;
	}
}

function ContentCtrl($scope, $http) {
    "use strict";

    $scope.url = './timetable.json';
    $scope.content = [];

    $scope.fetchContent = function() {
        $http.get($scope.url).then(function(result){
            $scope.content = result.data;
        });
    }

    $scope.fetchContent();
}
myApp.directive('contentItem', function ($compile) {
	var imageTemplate = '<div class="entry-image"><div class="entry-img">{{content.data}}, {{content.title}}, {{content.description}}</div>';
	var videoTemplate = '<div class="entry-video"><div class="entry-vid">{{content.data}}, {{content.title}}, {{content.description}}</div>';
	var noteTemplate = '<div class="entry-note"><div class="entry-note">{{content.data}}, {{content.title}}, {{content.description}}</div>';

	var getTemplate = function(contentType) {
		var template = '';

		switch(contentType) {
			case 'image':
				template = imageTemplate;
				break;
			case 'video':
				template = videoTemplate;
				break;
			case 'notes':
				template = noteTemplate;
				break;
		}

		return template;
	}

	var linker = function(scope, element, attrs) {
		scope.rootDirectory = 'images/';

		element.html(getTemplate(scope.content.content_type)).show();

		$compile(element.contents())(scope);
	}

	return {
		restrict: "E",
		replace: true,
		link: linker,
		scope: {
			content:'='
		}
	};
});