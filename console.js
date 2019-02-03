const prompt = require("prompt-async");
var CrazyCow = require('./crazycow.js');


prompt.start();



async function run(answer) {
    var crazyCow = new CrazyCow(null);
    var startStory = crazyCow.action();
    console.log(startStory);
    
    while (true) {
        var {answer} = await prompt.get(['answer']);
        var story = crazyCow.action(answer);
        console.log(story);
    }
}

run();