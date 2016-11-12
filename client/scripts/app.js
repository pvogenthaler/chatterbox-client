App = function() {
  this.server = 'https://api.parse.com/1/classes/messages';
  this.messages = [];
  this.rooms = {};
  this.currRoom = 'lobby';
  this.friends = {};
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
  });
};

App.prototype.renderRoom = function(room) {
  console.log('rendering');
  var toRender = '<option value="' + room + '">' + room + '</option>';
  $('#roomSelect').append(toRender);
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
  $('.user').on('click', function(event) {
    source.handleUsernameClick(event);
  });
};

App.prototype.handleUsernameClick = function(event) {
  this.friends[event.target.id] = true;
  // console.log(this);
  // console.log(this.friends);
};

App.prototype.renderMessage = function(messageObj) {
  console.log('rendering');
  var message = '<div class="message"><span class="user" id="' + messageObj.username + '">' + messageObj.username + '</span>: ' + messageObj.text + '</div>';
  $('#chats').append(message);
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