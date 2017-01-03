var prompt = require('prompt');
var CrazyCow = require('./crazycow.js');


prompt.start();

var crazyCow = new CrazyCow(null);



var action = function (action) {

    var newRoom = crazyCow.processSpeech(action);

    var messageAction = newRoom.story;
    var messageQuestion = "what should you do?  " + newRoom.lefttext + " or " + newRoom.righttext;

    var message = messageAction + "\n" + messageQuestion;
   
    console.log(message);
    return message;
}

action();
action('ride');
action('pet');
action('bumbo');
action('pet');
action('pet');

//exit(1);

// //var anwser = '';
// var ask = function (answer) {
//     var story = action(answer);
//     console.log(story);
//     prompt.get(['answer'], function (err, result) {
//         console.log('Command-line input received:');
//         console.log('  answer: ' + result.answer);
//         ask(result.answer);
//     });
//     // ask("pet");
// }

// ask();