
var CrazyCow = require('./crazycow.js');



var crazyCow = new CrazyCow(null);



var action = function (action) {
    var currentRoomName = crazyCow.currentRoom.name;
    var newRoom = crazyCow.processSpeech(action);

    var messageAction = newRoom.story;
    var messageQuestion = "what should you do?  " + newRoom.lefttext + " or " + newRoom.righttext;

    var message = messageAction + "\n" + messageQuestion;
     if (newRoom && newRoom.name === currentRoomName)
            message = messageQuestion;

   
    console.log(message);
    return message;
}

action();
action('ride');
action('pet');
action('bumbo');
action('pet');
action('pet');

