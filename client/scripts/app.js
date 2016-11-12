App = function() {
  this.server = 'https://api.parse.com/1/classes/messages';
  this.messages = [];
  this.rooms = {};
  this.currRoom = 'lobby';
  this.friends = {};
  this.user = 'anonymous';
};

App.prototype.init = function() {
  var source = this;
  $(document).ready(function() {

    var updateMessages = function(object) {
      source.clearMessages();
      source.messages = object.results;
      source.renderMessages();
    };
    $('#getMessages').on('click', function() {
      // console.log('hi');
      source.fetch(updateMessages);
    });
    $('.username').on('click', function(event) {
      source.handleUsernameClick(event);
    });
    $('#send').submit(function(event){
      event.prevent.Default();
    })
  });
};

App.prototype.renderRoom = function(room) {
  console.log('rendering');
  // var toRender = '<option value="' + room + '">' + room + '</option>';
  var $room = $('<option/>');
  $room.attr('value', room);
  $room.text(room);
  $('#roomSelect').append($room);
};

App.prototype.renderMessages = function(room) {
  var toRender = room || this.currRoom;
  var source = this;
  this.clearMessages();
  console.log('messages', this.messages);
  console.log(toRender);
  for (var i = 0; i < this.messages.length; i++) {
    if (this.messages[i].roomname === toRender) {
      this.renderMessage(this.messages[i]);
    }
  }
};

App.prototype.escapeHTML = function(obj){
  var $tmp = document.createElement('div');
  $tmp.appendChild(document.createTextNode('' + obj));
  return $tmp.innerHTML;
}

App.prototype.handleSubmit = function(input) {
  // var message = {
  //   username: this.name,
  //   text: input,
  //   roomname: this.currRoom
  // }
  console.log('hi',input);
  // this.send(message);
};

App.prototype.handleUsernameClick = function(event) {
  this.friends[event.target.id] = true;
  console.log('help');
};

App.prototype.renderMessage = function(messageObj) {
  console.log('rendering');
  var source = this;
  // var message = '<div class="message"><span class="username" id="' + messageObj.username + '">' + messageObj.username + '</span>: ' + messageObj.text + '</div>';
  var $message = $('<div/>');
  $message.text(': ' + messageObj.text);
  $message.addClass("message");
  var $user = $('<span/>');
  $user.text('' + messageObj.username);
  $user.attr('id', source.escapeHTML(messageObj.username));
  $user.addClass('username');
  $message.prepend($user);
  $('#chats').append($message);
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function(cb) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    success: function (data) {
      console.log(data);
      cb(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages', data);
    }
  });
};

//clears from appropriate div element
App.prototype.clearMessages = function() {
  $('#chats').empty();
};

var app = new App();
app.init();
console.log(app);
app.fetch(console.log);



// console.log('hello');
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });