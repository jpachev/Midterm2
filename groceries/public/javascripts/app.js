angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
				angular.copy(data, $scope.products);
			});
    };
    $scope.getAll();
    $scope.create = function(product) {
			return $http.post('/shopping', product).success(function(data){
				$scope.products.push(data);
			});
    };
    
    
     $scope.uporder = function(product) {
      return $http.put('/shopping/' + product._id + '/uporder')
        .success(function(data){
          console.log("uporder worked");
          product.orders += 1;
        });
    };
    
    $scope.insertcart = function() {
      console.log("In InsertCart");
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.uporder(value);    
          $scope.cart.push(value);
        }
      });
    }

    $scope.addProduct = function() {
      var newObj = {Name:$scope.productName, price:$scope.productPrice, image:$scope.productURL};
      $scope.create(newObj);
      $scope.productName = '';
      $scope.productPrice = '';
      $scope.productURL = '';
    }

     
    
    $scope.incrementUporders = function(product) {
      $scope.uporder(product);
    };
 
 
    $scope.delete = function(product) {
      console.log("Deleting Name "+product.Name+" ID "+product._id);
      $http.delete('/shopping/'+product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);

