var diasporaApp = angular.module("diasporaApp",[])
	.controller("diasporaCtrl", function ($scope, $http, $timeout) {
		$scope.cluster = null;	
		$scope.currentNode = null;
		$scope.clusterNames = null;

		$scope.BASEURL = 'http://localhost:41459/diaspora';
		$scope.DBURLNAMES = 'http://localhost:5984/diaspora/_design/clusters/_view/clusterNames';
		$scope.DBURLDIASPORA = 'http://localhost:5984';

		$scope.editingClusterName = false;
		$scope.editingAspects = false;
		$scope.showClusterNamesDlg = false;

		$scope.selectedClusterId = null;

		$scope.showLoadClusterDialog = function() { 
			$("#loadClusters").modal('show');
		}

		$scope.hideLoadClusterDialog = function() { $scope.showClusterNamesDlg = false;}


		
		$scope.currentNodeEnabled = function() { return $scope.currentNode != null; }
		$scope.linkedToEnabled = function() { return $scope.currentNode != null && $scope.currentNode.linkedTo.length > 0; }
		$scope.linkedFromEnabled = function() { return $scope.currentNode != null && $scope.currentNode.linkedFrom.length > 0; }
		$scope.clusterNamesEnabled = function() { return $scope.clusterNames != null && $scope.clusterNames.length > 0; }

		//funzione che abilita l'update
		$scope.updateEnabled = function() {
			return $scope.cluster  &&
				$scope.cluster._id &&
				$scope.cluster._rev;
		}
		$scope.clusterEnabled = function() { return $scope.cluster != null && !$scope.updateEnabled(); }		

		$scope.loadClusterNames= function() {
			$http({
	            method: 'GET',
	            //url: $scope.DBURLNAMES,
				url: $scope.BASEURL+"/clusterNames",
	            dataType: 'jsonp',
	            headers: {'Accept': 'application/json'}
	         })
			.success (function (data) {
				console.log("Cluster names loaded")
				$scope.clusterNames = data;
				$scope.searchClusterNames = { "names" : $scope.clusterNames};
				console.log (data);
			})
			.error (function (data,status) {
				console.log("Cluster names NOT loaded")
				console.log (data);
				console.log (status);
			});		

		}

		$scope.loadClusterNames();

		$scope.deleteCluster = function() {
			var my_data = $scope.cluster;
			swal ({
				title : "Are you sure?",
				text  : "Do you want to delete the current cluster on the DB?",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "Yes, delete it!"},
				function () {
				$http({
					method: 'DELETE',
					url: $scope.BASEURL+"/"+my_data._id+"/"+my_data._rev,
					data_type: 'jsonp'
				})
	    		.then (function (data) {
					console.log ("Data ok")
					$scope.message = "Data inserted";
					$scope.post_data = data;
					console.log(data);	
					$scope.loadClusterNames();
					swal("","Cluster "+ $scope.cluster.clusterName + " deleted!", "success");
				},
				function (data) {
					console.log ("Data ko")
					$scope.message = "Insertion failed";
					$scope.post_data = data;
					console.log (data);				
					swal("","Cluster "+ $scope.cluster.clusterName + " NOT deleted!", "error");
				});		
			});
		}


		$scope.updateCluster = function() {			
			var my_data = $scope.cluster;
			swal ({
				title : "Are you sure?",
				text  : "Do you want to update the current cluster on the DB?",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				closeOnConfirm: true,
				confirmButtonText : "Yes, update it!"
				},
				function () {
					$http({
						method: 'PUT',
						url: $scope.BASEURL,
						data: my_data,
						data_type: 'jsonp'
					})
		    		.then (function (data) {
						console.log ("Data ok")
						$scope.message = "Data inserted";
						$timeout (function()  {
							swal("","Cluster "+ $scope.cluster.clusterName + " updated!", "success");
						});
						$scope.post_data = data;
						console.log(data);	
						//$scope.loadClusterNames();

					},
					function (data) {
						console.log ("Data ko")
						$scope.message = "Insertion failed";
						$scope.post_data = data;
						console.log (data);				
						$timeout (function()  {
							swal("","Cluster "+ $scope.cluster.clusterName + " NOT updated!", "error");
						});
					});		
				});
		}

		$scope.saveToCouch = function () {
			var my_data = $scope.cluster;
			$http({
				method: 'POST',
				url: $scope.BASEURL,
				data: my_data,
				data_type: 'jsonp'
			})
    		.then (function (data) {
				console.log ("Data ok")
				$scope.message = "Data inserted";
				$scope.post_data = data;
				console.log(data);	
				$scope.loadClusterNames();
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
				url: $scope.BASEURL,
	            dataType: 'jsonp',
	            headers: {'Accept': 'application/json'}
	         })
			.success (function (data) {
				console.log (data);
				$scope.currentNode = null;
				$scope.cluster = data;
				swal("Cluster created ","Cluster "+ data.clusterName + " has been succesfully created!", "success");

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


		$scope.loadClusterFromDlg = function () {
			$("#loadClusters").modal('hide');
			console.log ("loading selected cluster from dialog");
			console.log ($scope.selectedClusterId);
			$scope.loadClusterFromService($scope.selectedClusterId, $scope);

		}

		$scope.loadClusterFromService = function (id, theScope) {
			console.log ("Loading id")
			$http({
	            method: 'GET',
				url: $scope.BASEURL+"/"+id+"/-1",
	            dataType: 'jsonp',
	            headers: {'Accept': 'application/json'}
	         })
			.success (function (data) {
				console.log ("Cluster loaded")
				$scope.currentNode = null;
				$scope.cluster = data;
				swal("","Cluster "+ data.clusterName + " has been loaded", "success");
				console.log (data);
			})
			.error (function (data,status) {
				console.log ("Cluster NOT loaded")
				console.log (data);
				console.log (status);
				swal("Error","Problems loading cluster " + id,"error");
			});		
		}
	});


