angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('loginCtrl', function($scope,$state,$ionicPopup,Users){
    $scope.login = function(){
        Users.login($scope.login).then(function(data){
            if (Object.keys(data.data).length === 1) {
                $scope.login = "",
                $state.go('tab.lamp');
            } else {
                $ionicPopup.alert({
                    title: "Error Message",
                    template: "Error Please Check User And Pass",
                    okText: 'Ok',
                    okType: 'button-positive'
                });
           }
        })
    }
})
.controller('lamp', function($scope, $ionicPopup, lamp) {
  $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
  
  $scope.on = function(){
    lamp.onlamp().success(function(){
      $scope.showAlert({
                title: "Information",
                message: "Lamp in garden is ON"
            });
    })
  }
   $scope.off = function(){
    lamp.offlamp().success(function(){
      $scope.showAlert({
                title: "Information",
                message: "Lamp in garden is OFF"
       });
    })
  }
})

.controller('Users', function($scope, $state, Users){
  $scope.showData = function(){
    Users.ambilsemua().success(function(data){
      $scope.data = data;
    }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.showData();
  
  $scope.logout = function(){
      $state.go('login');
  }
})

.controller('UserDetail', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,Users){
  $scope.showDataid = function() {
      Users.getdetail($stateParams.userid).success(function(data) {
            $scope.data = data;
        }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
    });     
    };
    
    $scope.showDataid();
    
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'	
	});;
    
    $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };
     
     $scope.editModal = function(){
            $scope.taskModal.show();
	};
    
    $scope.backModal = function(){
        $scope.taskModal.hide();
    }
    
    $scope.edit = function(id,username,password,email,no_telp){
            if (!id){
                $scope.showAlert({
                    title: "Warning",
                    message: "Field Id cannot be empty"
                });
            }else if (!username){
                $scope.showAlert({
                    title: "Warning",
                    message: "Field Username cannot be empty"
                });
            }else if(!password){
                $scope.showAlert({
                    title: "Warning",
                    message: "Field Password cannot be empty"
                });
            }else if(!email){
                $scope.showAlert({
                    title: "Warning",
                    message: "Field Email cannot be empty"
                });
            }else if(!no_telp){
                $scope.showAlert({
                    title: "Warning",
                    message: "Field Phone Number cannot be empty"
                });
            }else{
                $scope.id = id;
                $scope.username = username;
                $scope.password = password;
                $scope.email = email;
                $scope.no_telp = no_telp;
                Users.update({
                    'id' : id,
                    'username': username,
                    'password': password,
                    'email': email,
                    'no_telp': no_telp,
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Data has been updated"
                    });
                },function(err) {
                  console.error('Error', err);
                });
            }
	};
   
    $scope.delete = function (){
        Users.delete($stateParams.userid);
         $scope.showAlert({
            title: "Information",
            message: "Data has been deleted",      
         });
      $state.go('tab.users');
    }; 
})

.controller('addUser', function($scope, $ionicPopup, Users){
    
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
    
    $scope.Add={};
    
    $scope.save = function (){
        if (!$scope.Add.username){
           $scope.showAlert({
                    title: "Warning",
                    message: "Field Username cannot be empty"
                });
        }else if (!$scope.Add.password){
             $scope.showAlert({
                    title: "Warning",
                    message: "Field Password cannot be empty"
                });
        }else if (!$scope.Add.email){
            $scope.showAlert({
                    title: "Warning",
                    message: "Field Email cannot be empty"
                });
        }else if (!$scope.Add.notelp){
            $scope.showAlert({
                    title: "Warning",
                    message: "Field Phone Number cannot be empty"
                });
        }else{
            Users.create({
                username: $scope.Add.username,
                password: $scope.Add.password,
                email: $scope.Add.email,
                notelp: $scope.Add.notelp
            }).success(function(data){
              $scope.Add = "";
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                });
            });
          $state.go('tab.users'); 
        }  
    };
})

