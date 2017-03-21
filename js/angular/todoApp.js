var model = {
	user : "Or-el"
};

var toDoApp = angular.module("toDoApp", []);

toDoApp.run(function($http) {
	$http.get("data/items-list.json").then(function(response) {
		model.items = response.data;
	});
});

toDoApp.filter("checkItems", function() {
	return function(items, showComplete) {
		var results = [];
		angular.forEach(items, function(item) {
			if (!item.completed || showComplete) {
				results.push(item);
			}
		});
		return results;
	}
});

toDoApp.controller("toDoCtrl", function($scope) {
	$scope.todo = model;

	$scope.incompleteCount = function() {
		var count = 0;

		angular.forEach($scope.todo.items, function(nextItem) {
			count += (!nextItem.completed) ? 1 : 0;
		});

		return count;
	};

	$scope.warningLevel = function() {
		var labelClass = "label-success";
		
		if ($scope.incompleteCount() > 0) {
			labelClass = $scope.incompleteCount() > 3 ? "label-danger" : "label-warning";
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

