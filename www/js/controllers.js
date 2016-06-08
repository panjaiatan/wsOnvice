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
