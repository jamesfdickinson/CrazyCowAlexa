'use strict';
var Alexa = require('alexa-sdk');
var CrazyCow = require('./crazycow.js');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var crazyCow = new CrazyCow();
        var room = crazyCow.currentRoom;

        this.attributes['currentRoom'] = room.name;

        var messageAction = room.story;
        var messageQuestion = "what should you do? " + room.lefttext + " or " + room.righttext;

        this.emit(':ask', messageAction + ". " + messageQuestion, messageQuestion);
    },
    'ActionIntent': function () {
        var action = null;

        if (this.event.request.intent.slots)
            action = this.event.request.intent.slots.ACTION.value;

        if (typeof action == "undefined") action = "";

        if (action == "Stop" || action == "stop" || action == "end" || action == "End" || action == "cancel" || action == "Cancel" || action == "no" || action == "No") {
            this.emit(':tell', 'good bye');
            return;
        }
        if (action == "help" || action == "Help") {
            var messagehelp = 'To play, Use your voice to explore. You can start by saying start. The goal is to make it to the end without a bad ending.  There are multiple endings. Each room will describe the situation.  After the prompt, you decide what you want to do by replying.  If your response is not an option then the list of option will be repeated back to you. To end you may say "cancel".  Start now?';
            this.emit(':ask', messagehelp, messagehelp);
            return;
        }
        var currentRoomName = this.attributes['currentRoom'];

        var crazyCow = new CrazyCow(currentRoomName);

        var newRoom = crazyCow.processSpeech(action);

        var messageAction = newRoom.story;
        var messageQuestion = "what should you do? " + newRoom.lefttext + " or " + newRoom.righttext;

        var message = messageAction + ". " + messageQuestion;
        if (newRoom && newRoom.name === currentRoomName)
            message = messageQuestion;

        this.attributes['currentRoom'] = newRoom.name;
        this.emit(':ask', message, message);
    },
    'Unhandled': function () {
        var message = 'Try saying an action';
        this.emit(':ask', message, message);
    },
    'AMAZON.HelpIntent': function () {
        var message = 'Welcome to Crazy Cow. Use your voice to explore the cave. Start now?';
        var speechOutput = this.t(message);
        var reprompt = this.t(message);
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("good bye"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("good bye"));
    }
};