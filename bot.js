// JavaScript Document
var BOT = BOT || {};
BOT.learning = false;

BOT.mem_bank = {};

BOT.hear = function(input,src){
	var re = "\\b("+src+")\\b";//two slashes to escape
	var reg = new RegExp(re,"i");
	//console.log("regex of "+reg+" tested on"+input+" was: "+reg.test(input));
	return reg.test(input);
};	

BOT.tag = function(input){
/*
This should listen to input & sort multiple types of the same basic input to decide what 
"TAG" should go on it. Tags are then sent to the "BRAIN" which processes the "TAGS" and generates a result which is passed back to BOT.speak()
*/
  //list all possible tags in this object for ref
  var TAG = {
    "greetings":false,
    "greetings_slang":false,
    "time":false,
    "date":false,
    "about_me":false,
    "unknown":false,
  };
  var STATIC_TAG = TAG; 
  //##TAG LOGIC##
  //greetings
  if(BOT.hear(input,'hello')===true){
    console.log("heard 'hello' as greeting");
    TAG["greetings"] = true;
  }
  if(BOT.hear(input,'hi')===true){
    console.log("heard 'hi' as greeting");
    TAG["greetings"] = true;
  }
  //greetings_slang
  if(BOT.hear(input,'yo')===true){
    console.log("heard 'yo' as slang greeting");
    TAG["greetings_slang"] = true;
  }
  if(BOT.hear(input,'sup')===true){
    console.log("heard 'sup' as slang greeting");
    TAG["greetings_slang"] = true;
  }
  if(BOT.hear(input,'wazup')===true){
    console.log("heard 'wazup' as slang greeting");
    TAG["greetings_slang"] = true;
  }
  //time
  if(BOT.hear(input,'what time')===true){
    console.log("heard 'what time' as time");
    TAG["time"] = true;
  }
  if(BOT.hear(input,'time is')===true){
    console.log("heard 'time is' as time");
    TAG["time"] = true;
  }
  if(BOT.hear(input,'is the time')===true){
    console.log("heard 'is the time' as time");
    TAG["time"] = true;
  }
  if(BOT.hear(input,'have the time')===true){
    console.log("heard 'have the time' as time");
    TAG["time"] = true;
  }
  //date
  if(BOT.hear(input,'date today')===true){
    console.log("heard 'date today' as date");
    TAG["date"] = true;
  }
  if(BOT.hear(input,'today\'s date')===true){
    console.log("heard 'today's date' as date");
    TAG["date"] = true;
  }
  if(BOT.hear(input,'todays date')===true){
    console.log("heard 'todays date' as date");
    TAG["date"] = true;
  }
  //about_me
  if(BOT.hear(input,'your name')===true){
    console.log("heard 'your name' as about_me");
    TAG["about_me"] = true;
  }
  if(BOT.hear(input,'about you')===true){
    console.log("heard 'about you' as about_me");
    TAG["about_me"] = true;
  }
  if(BOT.hear(input,'about yourself')===true){
    console.log("heard 'about yourself' as about_me");
    TAG["about_me"] = true;
  }
  if(BOT.hear(input,'who are you')===true){
    console.log("heard 'who are you' as about_me");
    TAG["about_me"] = true;
  }
  //unknown
  return(TAG);
};
BOT.think = function(TAG,input){
/*
This is where we take the "tag" var and decide what to do with it
"Thoughts" should be made in order that we want them to come out
*/
   //chooses a random result from the list of available results
  function getRes(option_list){
    //later this will include logic for filtering based on memory
    var ret = option_list[Math.floor(Math.random() * option_list.length)];
    return(ret);
  }
  //define vars used for thought funtions
  var res = "";
  var option_list = [];
  //thought funtions, this could get messy
  /*
  NOTES
  */
  if(TAG["greetings"]===true){
    console.log("Thinking about greetings");
    option_list = [
      "Hello! ",
      "Good Day! ",
      "Greetings! ",
      "Hi there! ",
      "'Ello! "
    ];
    res += getRes(option_list);
  }
  if(TAG["greetings_slang"]===true){
    console.log("Thinking about slang greetings");
    option_list = [
      "Yo! ",
      "Sup?! ",
      "Whats up! ",
      "Holla! ",
      "YEZZIR! "
    ];
    res += getRes(option_list);
  }
  if(TAG["time"]===true){
    console.log("Thinking about the time");
    option_list = [
      "Time for you to get a watch! ",
      "I don't know what time it is! ",
    ];
    res += getRes(option_list);
  }
  if(TAG["date"]===true){
    console.log("Thinking about the date ");
    option_list = [
      "Time for you to get a calander! ",
      "I don't know what date it is! ",
    ];
    res += getRes(option_list);
  }
  if(TAG["about_me"]===true){
    console.log("Thinking about myself");
    option_list = [
      "My name is bot. ",
      "I don't know a whole lot about myself right now, but my name is bot. ",
      "I'm bot. I exist in Javascript. ",
    ];
    res += getRes(option_list);
  }
  //unkown (gross function that must include everything)
  if(TAG["greetings"]===false&&TAG["greetings_slang"]===false&&TAG["time"]===false&&TAG["date"]===false&&TAG["about_me"]===false){
    res = "I dont know what '"+input+"' means! Maybe I can learn from you. what would you say to this?";
    BOT.learning = true;
  }
  return(res);
};
BOT.listen = function(input){
  var TAG = BOT.tag(input);
  var res="";
  if(BOT.learning===true){
    res = "I should remember that, but I have no memories yet!";
    BOT.learning=false;
  }
  else{
    res = BOT.think(TAG,input);
  }
  BOT.speak(res);
};

BOT.speak = function(res,q){
  if(!q){
    var msg = new SpeechSynthesisUtterance(res);
    window.speechSynthesis.speak(msg);
  }
  console.log("Said: "+res);
	$("#result").html(res);
};


$("#say").click(function(){
  var getinput = $("#input").val();
  BOT.listen(getinput);
});



//SPEECH
if (!('webkitSpeechRecognition' in window)) {
  console.log("NO SPEECH REG");
} else {
  console.log("SPEECH REG WORKING");
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  
  //recognition.onstart = function() { ... }
  recognition.onresult = function(event) {
    $("#input").val("speech");
  };
  //recognition.onerror = function(event) { ... }
  //recognition.onend = function() { ... }
}

//BOT.listen("yo, what is the date today?");
//BOT.speak("hello world","q");