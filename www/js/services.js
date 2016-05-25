angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Users', function($http) {
  var baseUrl = 'http://localhost/onvice/';
  
  var user = [{"id":"1","username":"admin","password":"admin","email":"admin@mail.com","no_telp":"089678456789"},{"id":"2","username":"safif","password":"safif3110","email":"esafif637@gmail.com","no_telp":"085846105779"},{"id":"3","username":"arif","password":"Aarif","email":"arif7@gmail.com","no_telp":"085846105889"}];
  
  return{
    ambilsemua: function() {
            return $http.get(baseUrl + "select.php");
        },
    all: function() {
      return user;
    },
    
    getdetail: function(userid) {
       return $http.get(baseUrl+'select_id.php?id='+userid);
    },
    
    
   