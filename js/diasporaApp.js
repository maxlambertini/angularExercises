var diasporaApp = angular.module("diasporaApp",[])
	.controller("diasporaCtrl", function ($scope, $http) {
		$scope.cluster = null;	
		$scope.currentNode = null;
		
		$scope.clusterEnabled = function() { return $scope.cluster != null; }		
		$scope.currentNodeEnabled = function() { return $scope.currentNode != null; }
		$scope.linkedToEnabled = function() { return $scope.currentNode != null && $scope.currentNode.linkedTo.length > 0; }
		$scope.linkedFromEnabled = function() { return $scope.currentNode != null && $scope.currentNode.linkedFrom.length > 0; }


		$scope.saveToCouch = function () {
			var my_data = $scope.cluster;
			$http({
				method: 'POST',
				url: 'http://localhost:41459/diaspora',
				data: my_data,
				data_type: 'jsonp'
			})
    		.then (function (data) {
				console.log ("Data ok")
				$scope.message = "Data inserted";
				$scope.post_data = data;
				console.log(data);	
			},
			function (data) {
				console.log ("Data ko")
				$scope.message = "Insertion failed";
				$scope.post_data = data;
				console.log (data);				
			});		
		}		
		
		$scope.getClusterFromServer = function () {
			$http({
	            method: 'GET',
	            url: 'http://localhost:41459/diaspora',
	            dataType: 'jsonp',
	            headers: {'Accept': 'application/json'}
	         })
			.success (function (data) {
				$scope.currentNode = null;
				$scope.cluster = data;
			})
			.error (function (data,status) {
				console.log (data);
				console.log (status);
			});		
		}
		
		$scope.setCurrentNode = function (id, scope) {
			console.log(id);			
			console.log($scope);
			if ($scope.cluster) {
				var node = $scope.cluster.nodes[id];
				console.log(node);
				$scope.currentNode = $scope.cluster.nodes[id];
			} else
				$scope.currentNode = null;
		}		
	});
