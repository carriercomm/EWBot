var irc = require('irc')
  , say = require ('say');

var IRCSERVER = 'irc.freenode.net';
var BOTNAME = 'EWBot';
var CHANNELNAME = '#EWBot';

var client = new irc.Client(IRCSERVER, BOTNAME, {
  channels: [CHANNELNAME],
});

// 'say' on IRC
function isay(s) {
  client.say(CHANNELNAME, s);
}

var actions = {
  help: {
    help: 'display general help',
    action: function ( ) {
      isay('I will say things aloud on an OS-X computer!');
      isay('$ EWBot say Hello, World!');
    }
  },
  
  say: {
    help: '"speak" on the server',
    action: function ( message ) {
      isay('I am going to say "' + message + '"');
      say.speak("Alex", message, function() {
        isay("okay. i said it.")
      });
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
        client.say(CHANNELNAME, 'I hear you, man.');
        var m = tokens.slice(2).join(' ');
        actions[action].action(m);
        messageHandled = true;
      }
    }
    
    if (!messageHandled) {
      isay('Hello, '+ from + '!');
      // say.speak("Alex", "I do not know how to "+action);      
    }
  } else {
    // for now, ignore messages not for me
  }
});