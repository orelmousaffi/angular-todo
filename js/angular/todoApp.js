var model = {
	user : "Or-el",
	items : [
		{ 
			description : "Walk the dog", 
			completed : false 
		},
		{ 
			description : "Watch TV",
			completed : true
		},
		{
			description : "Play video games",
			completed : false
		},
		{
			description : "Clean my room",
			completed : false
		},
		{
			description : "Play music",
			completed : true
		}
	]
};

var toDoApp = angular.module("toDoApp", []);

toDoApp.controller("toDoCtrl", function($scope) {
	$scope.todo = model;

	$scope.incompleteCount = function() {
		var count = 0;

		angular.forEach($scope.todo.items, function(nextItem) {
			count += (nextItem.completed) ? 1 : 0;
		});

		return count;
	};

	$scope.warningLevel = function() {
		var labelClass = "label-danger";
		
		if ($scope.incompleteCount() > 0) {
			labelClass = $scope.incompleteCount() < 3 ? "label-warning" : "label-success";
		}

		return labelClass;
	};

	$scope.addNewItem = function(itemDescription) {
		if (typeof itemDescription !== 'undefined') {
			$scope.todo.items.push({
				description : itemDescription,
				completed : false
			});
		}
	};
});