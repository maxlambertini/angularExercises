/// <reference path="../typings/angularjs/angular.d.ts"/>
var model = {
	user : "maxlambertini",
	items : [
		{ action : "debugga KCMS", done : false},
		{ action : "installa Oracle", done : false},
		{ action : "compra latte e verdure", done : false},
		{ action : "fai qualcosa", done : false}
	],
}

var todoApp = angular.module("todoApp",[]);


todoApp.run (function ($http) {
	$http({
            method: 'GET',
            url: 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&pretty=true',
            dataType: 'jsonp',
            headers: {'Accept': 'application/json'}
         })
	.success (function (data) {
		model.data = data;
		console.log (model.user)
	})
	.error (function (data,status) {
		//console.log (data);
		//console.log (status);
	});
} );
	

//filtro custom
todoApp.filter ("checkedItems", function() {
	return function (items, showComplete) {
		var resultArr = [];
		angular.forEach(items,function (item) {
			if (!item.done || showComplete)
			resultArr.push(item);	
		});
		return resultArr;
	}
});

todoApp.controller("phoneCtrl", function ($scope, $http) {
	$scope.phone = model.data;
	$scope.numToLoad = 20;	
	console.log ($scope.phone)
	
	$scope.hasPhoneData = function() {
		var res = false;
		if ($scope.phone && $scope.phone.length > 1)
			res = true;
		console.log (res);
		return res;
	}
	
	$scope.loadPhoneData = function() {
		if ($scope.phone)
			console.log ($scope.phone)
		$http({
	            method: 'GET',
	            url: 'http://www.filltext.com/?rows='+  new String($scope.numToLoad) + '&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&pretty=true',
	            dataType: 'jsonp',
	            headers: {'Accept': 'application/json'}
	         })
		.success (function (data) {
			$scope.phone = data;
			console.log (model.user)
		})
		.error (function (data,status) {
			//console.log (data);
			//console.log (status);
		});
	}
	
	console.log('created phoneCtrl')
});

todoApp.controller("todoCtrl",function($scope) {
	$scope.todo = model;
	$scope.showComplete = true;	//mostra anche i task completi se true
	
	$scope.stillToDo = function() {
		var res = 0;
		angular.forEach($scope.todo.items, function (val, key) {
			if (!val.done) res++;
		});
		return res;
	}
	
	$scope.warningLevel = function () {
		return $scope.stillToDo() < 3 ? "label-success" : "label-warning";
	}
	
	$scope.addNewItem =  function (txt) {
		$scope.todo.items.push ( { action:txt, done: false});
	}
	
	
});