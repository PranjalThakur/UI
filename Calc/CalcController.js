var app = angular.module("Calculator",[]);

app.controller('CalcCtrl', function($scope){
	$scope.initialize = function(){
		$scope.lastNum=0;
		$scope.lastOp='';
		$scope.screenText = '';
		$scope.evalText=0;
		$scope.evalTextOld=0;
	}
	$scope.initialize();
	$scope.handleInput = function(c){
		//console.log(c);
		var charType = $scope.charType(c);
		if(charType == 'Num'){
			//console.log('This is a number:'+c);
			$scope.lastNum = $scope.lastNum*10 + parseInt(c);
			$scope.screenText = $scope.screenText + c;
		}
		else if(charType == 'Op'){
			$scope.screenText = $scope.evalText + c;
			$scope.lastOp = c;
			$scope.lastNum = 0;
			$scope.evalTextOld = $scope.evalText;
		}
		else if(charType == 'Del'){
			$scope.handleRemove();
		}
		else if(charType == 'Reset'){
			$scope.initialize();
		}
		
		$scope.evaluateExp();
	}
	
	$scope.handleRemove = function(){
		var charType = $scope.charType($scope.screenText.slice(-1));
		if(charType == 'Num'){
 			if($scope.lastOp != ''){ 
				$scope.lastNum = parseInt(parseInt($scope.lastNum*100000)/1000000);
 			}
			else{
				$scope.initialize();
			} 
		}
		else if(charType == 'Op'){
			$scope.lastOp = '';
			$scope.lastNum = $scope.evalTextOld;
		}
		$scope.screenText = $scope.screenText.slice(0,-1);
	}
	
	$scope.charType = function(c){
		if(!isNaN(c)){
			return 'Num'
		}
		else if(c!='R' && c!='<-'){
			return 'Op'
		}
		else if(c=='<-'){
			return 'Del'
		}
		else if(c=='R'){
			return 'Reset'
		}
		else{
			return 'Undef'
		}
	}
	$scope.evaluateExp = function(){
		//console.log('asd')
		if($scope.lastOp=='+'){
			$scope.evalText = $scope.evalTextOld + $scope.lastNum;
		}
		else if($scope.lastOp=='-'){
			$scope.evalText = $scope.evalTextOld - $scope.lastNum;
		}
		else if($scope.lastOp=='*'){
			$scope.evalText = $scope.evalTextOld * $scope.lastNum;
		}
		else if($scope.lastOp=='/'){
			if($scope.lastNum ==0){
				alert('Divide by zero');
			}
			$scope.evalText = parseInt(($scope.evalTextOld / $scope.lastNum)*100000)/100000;
		}
		else if($scope.lastOp==''){
			$scope.evalText = $scope.lastNum;
		}
		
		if(isNaN($scope.evalText)){
			$scope.evalText = $scope.evalTextOld;
		}
	}
});