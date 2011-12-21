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
    client.say(CHANNELNAME, "Hello, " + from + "!");
  } else {
    // for now, ignore messages not for me
  }
});