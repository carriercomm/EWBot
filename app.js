var irc = require('irc');

var IRCSERVER = 'irc.freenode.net';
var BOTNAME = 'EWBot';
var CHANNELNAME = '#EWBot';

var client = new irc.Client(IRCSERVER, BOTNAME, {
  channels: [CHANNELNAME],
});

function say(s) {
  client.say(CHANNELNAME, s);
}

var actions = {
  help: {
    help: 'display general help',
    action: function ( args ) {
      say('TODO:help');
    }
  },
  
  say: {
    help: '"speak" on the server',
    action: function ( args) {
      say('TODO:speak');
    }
  }
};

client.addListener('message', function (from, to, message) {
  var forMe = new RegExp(BOTNAME);
  if (forMe.test(message)) {
    var tokens = message.trim().split(' ');
    var messageHandled = false;
    // console.log('TOKENS', tokens);
    
    // handle commands
    // syntax - 
    //   <BOTNAME> <COMMAND> <DETAILS>
    if (tokens[0] == BOTNAME) {
      var action = tokens[1];
      if (actions[action]) {
        client.say(CHANNELNAME, 'I will now execute action '+action);
        messageHandled = true;
      }
    }
    
    if (!messageHandled) {
      client.say(CHANNELNAME, 'Hello, '+ from + '!');
    }
  } else {
    // for now, ignore messages not for me
  }
});