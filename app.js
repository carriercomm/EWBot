var irc = require('irc');

var IRCSERVER = 'irc.freenode.net';
var BOTNAME = 'EWBot';
var CHANNELNAME = '#EWBot';

var client = new irc.Client(IRCSERVER, BOTNAME, {
  channels: [CHANNELNAME],
});

client.addListener('message', function (from, to, message) {
  var forMe = new RegExp(BOTNAME);
  if (forMe.test(message)) {
    var tokens = message.trim().split(" ");
    var messageHandled = false;
    console.log("TOKENS", tokens);
    
    // handle commands
    // syntax - 
    //   <BOTNAME> <COMMAND> <DETAILS>
    if (tokens[0] == BOTNAME) {
      var action = tokens[1];
      client.say(CHANNELNAME, "I will now execution action "+action);
      messageHandled = true;
    }
    
    if (!messageHandled) {
      client.say(CHANNELNAME, "Hello, " + from + "!");
    }
  } else {
    // for now, ignore messages not for me
  }
});