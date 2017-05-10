// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db=null;
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
       //db = $cordovaSQLite.openDB({ name: "my.db" });
       db= window.openDatabase("sql.db","1","example of sqlite","2000");
      // for opening a background db:
      // db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text,address text)");
  });
})
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('home',{
    url:'/home',
    templateUrl:'templates/home.html',
    controller:'dataCtrl'
  })
  .state('drag',{
    url:'/drag',
    templateUrl:'templates/drag.html',
    controller:'dragCtrl'
  })
  $urlRouterProvider.otherwise('/home');
})

.controller('dataCtrl', function($scope,$cordovaSQLite){
  $scope.add= function(user){
    console.log(user.firstname);
    var query="INSERT INTO people(firstname,lastname,address) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[user.firstname,user.lastname,user.address]).then(function(res){
     // $scope.load();
    });
    
  }
  $scope.load=function(){
    $scope.alldata=[];
     $cordovaSQLite.execute(db,"SELECT * FROM people",[]).then(function(result){
      if(result.rows.length>0){
        for(var i=0; i<result.rows.length;i++){
        $scope.alldata.push(result.rows.item(i));
        }
         //$scope.$apply();
      }else{
          console.log("No data Found");
        }
    },function(err){
      console.log("error"+err);
    });
  }
    
})
.controller('dragCtrl',function($scope){

});