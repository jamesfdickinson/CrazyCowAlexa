function CrazyCow(currentRoom) {
    //public
    this.rooms = [];
    this.currentRoom;
    this.soundPlaying = false;

    //private
    var _this = this;
    var START_ROOM = 'cow';

    this.getRoom = function (roomName) {
        if (typeof roomName == "undefined") return null;
        for (var key in this.rooms) {
            if (this.rooms[key] && this.rooms[key].name == roomName)
                return this.rooms[key];
        }
        return null;
    };
    this.action = function (action) {
        var newRoom = this.processSpeech(action);
    
        var messageAction = newRoom.story;
        var messageQuestion = "what should you do?  " + newRoom.lefttext + " or " + newRoom.righttext;
    
        var message = messageAction + "\n" + messageQuestion;
        return message;
    }
    this.processSpeech = function (speechWords) {
        if(!speechWords) return  this.currentRoom;
        //repeat
        if (speechWords.indexOf("repeat") != -1) {
            this.enterRoom(this.currentRoom, speechWords);
            return this.currentRoom;
        }

        if (speechWords == "start" || speechWords == "start over" || speechWords == "yes" || speechWords == "Yes") {
            var room = this.getRoom(START_ROOM);
            this.currentRoom = room;
            return room;
        }


        var room = this.currentRoom.leftBox;
        var keywords = this.currentRoom.lefttext.split(" ");
        for (var keywordKey in keywords) {
            var keyword = keywords[keywordKey];
            if (speechWords.indexOf(keyword) != -1) {
                this.enterRoom(room, speechWords);
                return room;
            }
        }

        var room = this.currentRoom.rightBox;
        var keywords = this.currentRoom.righttext.split(" ");

        for (var keywordKey in keywords) {
            var keyword = keywords[keywordKey];
            if (speechWords.indexOf(keyword) != -1) {
                this.enterRoom(room, speechWords);
                return room;
            }
        }

        return this.currentRoom;
    };
    this.enterRoom = function (room, speechWords) {
        //success found something
        this.currentRoom = room;
        console.log("current room " + room.name);
        //	img.src = currentRoom.imagePath;

        console.log("speechWords " + speechWords);


    };

    function makebox(name, mystory, mysound, mylefttext, myrighttext) {
        var box = {
            name: name,
            story: mystory,
            sound: mysound,
            lefttext: mylefttext,
            righttext: myrighttext
        };
        _this.rooms.push(box);
        return box;
    }
    function setArrowsToBox(box, left, right) {
        box.leftBox = left;
        box.rightBox = right;
    }
    this.createRooms = function () {
        //define variables
        var keywords;
        var NOTUSED = null;
        var AUTOMOVE = true;
        var WAITMOVE = false;
        var rooms = [];

        //create boxes
        //makebox(mytitle,mystory,mysound, mylefttext, myrighttext)
        var cowBox = makebox("cow", "you are a farmer and you see a cow in your barn,and its not your cow. You know this because it has big wings... I wonder where it came from. all the sudden the cow looks at you as if you were a piece of its favorite food its ever had. uh-oh you think...", "moosound", "pet it", "run away");
        var batmanBox = makebox("batman", "The cow with wings gives you a hug of thanks but it is crushing you...do you...", "batmansound", "say,can i ride you", "say you are a bumbo");
        var snowmanBox = makebox("snowman", "moooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo it says happily, you get on and it zips into the air", "snowmansound", "yell, faster faster", "yell, higher! higher!");
        var dogBox = makebox("dog", "It starts crying and it cries so much that you drown in its sad depresed tears", "dogsound", "start over", "this button is useless");
        var deathBox = makebox("death", "The cow thing zips way up into the clouds, vrrrrrrrrrrrrrrrrrrr you hear, i wonder what that could be you ponder... Then all the sudden you see it! its a plane and you get sucked into the turbine", "dudesound", "start over", "play again");
        var cafinatedbrick = makebox("a cafinated brick", "You run away and the cow chases after you..do you say.....", "cowsound", "youre a brick", "can i ride you?");
        var catBox = makebox("cat", "The cow thing zooms faster and faster, so fast that you can hardly hold on any longer...you yell slow down but its no use.....but then you see a seatbelt on the cow you also see a parachute! do you.........", "cowsound", "use the parachute", "buckle up");
        var paraBox = makebox("para", "You jump off with the parachute...You see land probley about 1000 feet below... you hurry and get the parachute out and you deploy it...HUZZAH!, it works! You land safely on the ground. You see The large cow in the sky crying...it cries alot.... so much! A flood starts! You see a canoe and a raft you also see a full size cruise but its far away so you cant get there...do you...", "watersound", "get in the canoe", "get in the raft");
        var raftBox = makebox("raft", "you run to the raft, a good choice. The raft is large and sturdy... you get in and then the first wave hits it is powerfull but not enough to knock over your raft... it knocks you close to the cruise.. do you.....", "water2sounds", "stay in the raft", "board the cruise");
        var deadBox = makebox("dead", "you buckle up...but the seatbelt isnt attached to the cow! you fall off and die.", "bobsounds", "play again", "play again");
        var canoeBox = makebox("canoe", "you run to the canoe and the first wave starts to sweep in...uh-oh you think it sweeps you away because your boat is very un-sturdy...", "canoesound", "start over", "start over");
        var cruiseBox = makebox("cruise", "you hurry up the cruise ladder... a citizen sees you and says hey stop hurting my punny bone...get it puny... anyway you get up into the cruise where people are a little alarmed that a flash flood is happening but not that much... Then you wonder...where the heck is this going and i wonder how much ice cream i can eat bfoe i throw up....", "cruise sounds", "go to the all you can eat buffet", "go ask people where youre going");
        var raft2Box = makebox("raft2", "you stay in the raft... The second wave comes... it is much larger than the first one... it knocks over your raft and you drown.The end.", "deathnoise", "start over", "play again");
        var captainBox = makebox("captain", "you walk up to the captain of the ship and ask and he says...i dont know im just driving around and hopeing of not crashing or getting lost", "goat noises", "go to buffet", "go to buffet");
        var buffetBox = makebox("buffet", "you walk into the buffet and order the usual:two tons of ice cream...you eat some but the boat get hits with another wave... a huge one and part of the bottom has a crack in it and is sinking....!you see a helicopter at the top and the captain getting in do you,,,", "sheep noises", "go to helicopter", "go to rescue boat");
        var rescueBox = makebox("rescue boat", "you hurry down to the resue boats and get on and take off...Another wave of tears come andknock the life raft over... you gasp for air  and look up...The people in the helicopter see you and put and rope ladder down... you climb up the ladder and into the helicopter...after a while the helicopter lands in a landing pad in some mansion house, you thank the captain and he invites you in to spend the night there...do you....", "helicopter noises", "check out the guest bedroom", "go to the hallway");
        var helicopterBox = makebox("helicopter", "you run to the helicopter and beg to be let in... the captain says sure! A few hours later you arive at his private mansion... he askes you if you want too stay the night...sure,you say...", "opopopopsounds", "check out the guest bedroom", "go to the hallway");
        var roomBox = makebox("room", "you walk into the room...it is very pecular...it has green walls and a yellow door...all the sudden year hear a load moan from the closet...its a gangster! Do you...", "monstermash", "run to tell the captain", "fight him");
        var fightBox = makebox("fight", "you attempt to fight the gangster but he is too powerfull...you die", "monstermash", "start over", "this button is very cool and usefull");
        var captain2Box = makebox("c", "you run down the hall and you see the captain...he says ....you shall not have gas and then pulls off a mask...really its a gangster mother....it says/moans...clean your room.....do the dishes....AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!you scream....do you..", "scary msic", "run to the left", "run to the right");
        var leftBox = makebox("l", "you run to the left but it is a DEAD end... and so are you...The End.", "dfagnoises", "go back to start", "press this...itll be fun...");
        var rightBox = makebox("poiu", "you run to the right and you see a large table you could hind under and a large smelly diaper you could throw at it do you....", "pooooooooosound", "hide under the table", "throw diaper");
        var diaperBox = makebox("pu", "you desperetly pick up the diaper and graciously throw it at the gangster mother it has no efferct... hahaha the gangster says, i already smell like diapers...noooooooooooooooooooooooooo are your last and sad words.....", "dsfsdfsdfsdfdsfgfjwsthsounds", "play again", "play again");
        var tableBox = makebox("sgf", "you rush and duck under the smelly and gross table...where are you you savedged runt yelles the gangster mother...it looks for you for over 20 whole seconds but then gives up...wow that was a close one you think", "dsfasdnoises", "stay put under that smelly table", "explore the master bedroom");


        //setArrowsToBox(box, left, right)
        setArrowsToBox(cowBox, batmanBox, cafinatedbrick);
        setArrowsToBox(batmanBox, snowmanBox, dogBox);
        setArrowsToBox(snowmanBox, catBox, deathBox);
        setArrowsToBox(dogBox, cowBox, dogBox);
        setArrowsToBox(cafinatedbrick, dogBox, snowmanBox);
        setArrowsToBox(deathBox, cowBox, cowBox);
        setArrowsToBox(catBox, paraBox, deadBox);
        setArrowsToBox(paraBox, canoeBox, raftBox);
        setArrowsToBox(deadBox, deadBox, deadBox);
        setArrowsToBox(raftBox, raft2Box, cruiseBox);
        setArrowsToBox(canoeBox, cowBox, cowBox);
        setArrowsToBox(cruiseBox, captainBox, captainBox);
        setArrowsToBox(raft2Box, cowBox, cowBox);
        setArrowsToBox(captainBox, buffetBox, buffetBox);
        setArrowsToBox(buffetBox, helicopterBox, rescueBox);
        setArrowsToBox(roomBox, captain2Box, fightBox);
        setArrowsToBox(helicopterBox, roomBox, captain2Box);
        setArrowsToBox(rescueBox, roomBox, captain2Box);
        setArrowsToBox(fightBox, cowBox, cowBox);
        setArrowsToBox(leftBox, cowBox, cowBox);
        setArrowsToBox(captain2Box, leftBox, rightBox);
        setArrowsToBox(rightBox, tableBox, diaperBox);
        setArrowsToBox(diaperBox, cowBox, cowBox);

        return rooms;
    };


    //onload
    //this.rooms = this.createRooms();
    this.rooms = [];
    this.createRooms();
    this.currentRoom = this.getRoom(currentRoom);
    if (!this.currentRoom)
        this.currentRoom = this.getRoom(START_ROOM);
}
module.exports = CrazyCow;


//room constructor
function Room(name, text, soundPath, imagePath, keywords, autoMove) {
    this.name = name;
    this.text = text;
    this.soundPath = soundPath;
    this.imagePath = imagePath;
    this.keywords = keywords;
    this.autoMove = autoMove;
}








