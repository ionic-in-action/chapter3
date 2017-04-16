
angular.module("App")//控制器
.controller('EditorController',function($scope,$http){
	$scope.editing = true;
	
	$http.get('/notes').success(function(data){
		$scope.notes=data;
	}).error(function(err){
		$scope.error='could not load notes';
	});

	$scope.view = function(index){
		$scope.editing=false;
		$scope.content=$scope.notes[index];
	};
	$scope.create=function(){
		$scope.content = {title:'',content:''};
	};
	$scope.save = function(){
		$scope.content.date = new Date();
		if ($scope.content.id) {
			$http.put('/notes/'+$scope.content.id,$scope.content).success(function(data){
				$scope.editing=false;
			}).error(function(err){
				$scope.error="edit note save error"
			});
		}else{
			$scope.content.id = Date.now();
			$http.post('/notes',$scope.content).success(function(data){
				$scope.notes.push($scope.content);
				$scope.editing = false;
			}).error(function(err){
				$scope.error="new note save error!"
			});
		}
	};
	$scope.remove=function(){
		$http.delete('/notes/'+$scope.content.id).success(function(date){
			var found=-1;
			angular.forEach($scope.notes,function(note,index){
				if (note.id==$scope.content.id) {
					found=index;
				}
			});
			if (found>=0) {
				$scope.notes.splice(found,1);
			}
			$scope.content={
				title:'',
				content:''
			};
		}).error.(function(err){
			$scope.error = "remove error"
		});
	};

});
