// ------------------------- game demo v1 ------------- www.rabbitoreg.com (Zsolt Olah)
function startGame() {
  var player = GetPlayer();
  player.SetVar("Turn", 1);
  console.log(1);
  player.SetVar("CurrentEvent", "10");
  player.SetVar("Speed", "1");
  console.log(2);
  randomEvents();
  setScenario();
}

function selectYes() {
  var player = GetPlayer();
  var turn = player.GetVar("Turn");
  checkEvent(player.GetVar("CurrentEvent") + "y");
  var scenario = events["" + player.GetVar("CurrentEvent") + "y" + ""].desc;

  var scenario_array = Array(4);
  scenario_array[1] =
    player.GetVar("Lvs") +
      events["" + player.GetVar("CurrentEvent") + "y" + ""].lvs <
    0
      ? -player.GetVar("Lvs")
      : events["" + player.GetVar("CurrentEvent") + "y" + ""].lvs;
  scenario_array[2] =
    player.GetVar("Nrg") +
      events["" + player.GetVar("CurrentEvent") + "y" + ""].nrg <
    0
      ? -player.GetVar("Nrg")
      : events["" + player.GetVar("CurrentEvent") + "y" + ""].nrg;
  scenario_array[3] =
    player.GetVar("Pro") +
      events["" + player.GetVar("CurrentEvent") + "y" + ""].pro <
    0
      ? -player.GetVar("Nrg")
      : events["" + player.GetVar("CurrentEvent") + "y" + ""].pro;
  scenario_array[1] = cap(scenario_array[1], 0, 100);
  scenario_array[2] = cap(scenario_array[2], 0, 100);
  scenario_array[3] = cap(scenario_array[3], 0, 1000);

  player.SetVar("Scenario", scenario);
  player.SetVar("LastLives", scenario_array[1]);
  player.SetVar("LastNrg", scenario_array[2]);
  player.SetVar("LastProgress", scenario_array[3]);
  player.SetVar(
    "gainLives",
    scenario_array[1] >= 0 ? scenario_array[1] : scenario_array[1]
  );
  player.SetVar(
    "gainNrg",
    scenario_array[2] >= 0 ? scenario_array[2] : scenario_array[2]
  );
  player.SetVar(
    "gainDist",
    scenario_array[3] >= 0 ? scenario_array[3] : scenario_array[3]
  );

  player.SetVar("LastChoice", 1);

  setButton("Yes", 0);
  setButton("No", 0);
  setButton("Gotit", 1);
  count("LastProgress", "Pro");
  count("LastLives", "Lvs");
  count("LastNrg", "Nrg");
  showResult();
}

function cap(val, min, max) {
  var ret = val;
  if (val < min) {
    val = min;
  }
  if (val > max) {
    val = max;
  }
  return ret;
}

function selectNo() {
  var player = GetPlayer();
  var turn = player.GetVar("Turn");
  checkEvent(player.GetVar("CurrentEvent") + "n");
  var scenario = events["" + player.GetVar("CurrentEvent") + "n" + ""].desc;

  var scenario_array = Array(4);
  scenario_array[1] =
    player.GetVar("Lvs") +
      events["" + player.GetVar("CurrentEvent") + "n" + ""].lvs <
    0
      ? -player.GetVar("Lvs")
      : events["" + player.GetVar("CurrentEvent") + "n" + ""].lvs;
  scenario_array[2] =
    player.GetVar("Nrg") +
      events["" + player.GetVar("CurrentEvent") + "n" + ""].nrg <
    0
      ? -player.GetVar("Nrg")
      : events["" + player.GetVar("CurrentEvent") + "n" + ""].nrg;
  scenario_array[3] =
    player.GetVar("Pro") +
      events["" + player.GetVar("CurrentEvent") + "n" + ""].pro <
    0
      ? -player.GetVar("Nrg")
      : events["" + player.GetVar("CurrentEvent") + "n" + ""].pro;
  scenario_array[1] = cap(scenario_array[1], 0, 100);
  scenario_array[2] = cap(scenario_array[2], 0, 100);
  scenario_array[3] = cap(scenario_array[3], 0, 1000);

  player.SetVar("Scenario", scenario);
  player.SetVar("Scenario", scenario);
  player.SetVar("LastLives", scenario_array[1]);
  player.SetVar("LastNrg", scenario_array[2]);
  player.SetVar("LastProgress", scenario_array[3]);
  player.SetVar(
    "gainLives",
    scenario_array[1] >= 0 ? scenario_array[1] : scenario_array[1]
  );
  player.SetVar(
    "gainNrg",
    scenario_array[2] >= 0 ? scenario_array[2] : scenario_array[2]
  );
  player.SetVar(
    "gainDist",
    scenario_array[3] >= 0 ? scenario_array[3] : scenario_array[3]
  );

  player.SetVar("LastChoice", 2);
  setButton("Yes", 0);
  setButton("No", 0);
  setButton("Gotit", 1);
  count("LastProgress", "Pro");
  count("LastLives", "Lvs");
  count("LastNrg", "Nrg");
  showResult();
}

function feedbackDone() {
  var player = GetPlayer();
  var turn = player.GetVar("Turn");

  var scenario =
    events["" + player.GetVar("CurrentEvent") + ""].desc +
    " " +
    GetPlayer().GetVar("History");
  player.SetVar("History", "");
  var scenario_array = Array(4);
  scenario_array[1] = events["" + player.GetVar("CurrentEvent") + ""].y;
  scenario_array[2] = events["" + player.GetVar("CurrentEvent") + ""].n;

  console.log(scenario_array);
  console.log(GetPlayer().GetVar("LastChoice"));
  console.log(scenario_array[GetPlayer().GetVar("LastChoice")]);
  //console.log(scenario);
  //var next_scenario = scenario.split("||")[1];
  //console.log(next_scenario);

  if (
    player.GetVar("Lvs") <= 0 ||
    player.GetVar("Nrg") <= 0 ||
    player.GetVar("Pro") <= 0
  ) {
    player.SetVar("FinalScreen", 0);
    player.SetVar("FinalScreen", 1);
    player.SetVar(
      "CurrentEvent",
      scenario_array[GetPlayer().GetVar("LastChoice")]
    );
    turnOne();
    //setScenario();
  } else {
    player.SetVar(
      "CurrentEvent",
      scenario_array[GetPlayer().GetVar("LastChoice")]
    );
    turnOne();
    setScenario();
  }
}

function setScenario() {
  var player = GetPlayer();
  var turn = player.GetVar("Turn");
  console.log(player.GetVar("CurrentEvent"));
  console.log(events);
  console.log(events[player.GetVar("CurrentEvent")]);

  var scenario = events[player.GetVar("CurrentEvent")].desc;

  if (player.GetVar("CurrentEvent") == "100") {
    setButton("Yes", 0);
    setButton("No", 0);
    setButton("Gotit", 1);
    player.SetVar("Pro", 0);

    player.SetVar("FinalScreen", 0);
    player.SetVar("FinalScreen", 1);
  } else {
    player.SetVar("Scenario", "" + scenario + "");
    setButton("Yes", 1);
    setButton("No", 1);
    setButton("Gotit", 0);
  }
}

function setButton(btn, status) {
  var player = GetPlayer();
  player.SetVar(btn + "Button", -1);
  player.SetVar(btn + "Button", status);
}

function turnOne() {
  var player = GetPlayer();
  player.SetVar("Turn", player.GetVar("Turn") + 1 * player.GetVar("Speed"));
}

function showResult() {
  var player = GetPlayer();
  player.SetVar("ResultSlide", -1);
  player.SetVar("ResultSlide", 1);
}

//----------------------------------------adjusting

function count(cnt, target) {
  var x = GetPlayer().GetVar(cnt);
  var amount = x >= 0 ? 1 : -1;
  if (x != 0) {
    GetPlayer().SetVar(target, GetPlayer().GetVar(target) + amount);
    GetPlayer().SetVar(cnt, GetPlayer().GetVar(cnt) - amount);
    if (target < 0) {
      GetPlayer().SetVar(target, 0);
      GetPlayer().SetVar(cnt, 0);
    } else {
      return setTimeout(function () {
        count(cnt, target);
      }, Math.round(600 / cnt));
    }
  } else {
    return 0;
  }
}

//-----------------------------------------story
var events = Array();
var revents = Array();

events["10"] = {
  desc:
    "Hello, good morning! Thanks for helping us getting out of here! We're tired. And also, out of the blue, a snow storm just popped up in the distance. There's a safe place 200 pixies away but we're not sure if we can make it. Should we look for a shelter nearby?",
  y: 11,
  n: 20,
};

events["10y"] = {
  desc:
    "Best chance to survive is the Pixairport (across the river) or a Pixellphone anywhere to call a PixuberX. While the Flemmings were searching for a shelter they got lost in the snowpix and walked even farther away. One of the Flemmings fell behind.",
  lvs: -1,
  nrg: -10,
  pro: 40,
};

events["10n"] = {
  desc:
    "Best chance to survive is the Pixairport (across the river) or a Pixellphone anywhere to call a PixuberX. The Flemmings headed towards the safehouse, hoping there's going to be food because they were pretty hangry early in the morning.",
  lvs: 0,
  nrg: -20,
  pro: -150,
};

events["11"] = {
  desc:
    "Finally, we found something. Looks like a cave. Out of the blue visibility dropped to zero. What's that noise? It comes from the cave!! Should we go in?",
  y: 12,
  n: 20,
};

events["11y"] = {
  desc:
    "The Flemmings made it inside. It's much calmer in the cave! But that noise is scary. Two of the Flemmings went to look. Oh, bad move. This is a Vark. The worse type: visual. This is a visual Vark. If you make eye contact they attack.",
  lvs: -2,
  nrg: -5,
  pro: 0,
};

events["11n"] = {
  desc:
    "One more loud growl from the cave and all the Flemmings were running like there's no tomorrow. Can they make it to the safehouse?",
  lvs: 0,
  nrg: -20,
  pro: -150,
};

events["12"] = {
  desc:
    "Out of the blue this damn visual Vark launched a pixiviscious attack. Should we run?",
  y: 50,
  n: 30,
};

events["12y"] = {
  desc:
    "The Flemmings ran hundreds of pixies in the snowstorm until they all collapsed under some trees. The Vark caught only the slower ones.",
  lvs: -5,
  nrg: -50,
  pro: -150,
};

events["12n"] = {
  desc:
    "The Flemmings faught off the Vark and destroyed its myth. However, they lost lives and precious energy. As the snowstorm stopped, they headed towards the safehouse hoping there is food.",
  lvs: -8,
  nrg: -40,
  pro: 0,
};

events["20"] = {
  desc: "We're caught in the storm. Can't see a thing. Should we hunker down?",
  y: 30,
  n: 30,
};

events["20y"] = {
  desc:
    "After hunkering down the storm covered the Flemmings with snow. Half of them froze as they were standstill. Some will win, some will lose - said the other half and headed towards the safe house as the storm calmed down. ",
  lvs: -50,
  nrg: -10,
  pro: 0,
};

events["20n"] = {
  desc:
    "The Flemmings marched for hours to reach the safehouse. Along the way, they lost many of them in the blixard.",
  lvs: -50,
  nrg: -50,
  pro: -150,
};

events["30"] = {
  desc:
    "We made it to the safehouse. We're exhausted. Damn! The door is locked. Should we break in?",
  y: 40,
  n: 40,
};

events["30y"] = {
  desc:
    "As the Flemmings were trying to break in the accumulated snow from the roof came down like an avalanche. They lost 20 Flemmings. And then, out of the blue... ",
  lvs: -20,
  nrg: -30,
  pro: 0,
};

events["30n"] = {
  desc:
    "Instead of breaking in the Flemmings had an idea and knocked on the door.",
  lvs: 0,
  nrg: -1,
  pro: 0,
};

events["40"] = {
  desc:
    "Someone opened the door! Looks like one of those fake Elvis imitators with a hound dog. It could be trap! Should we go in?",
  y: 51,
  n: 50,
};

events["40y"] = {
  desc:
    "The Flemmings had a good brunch with the host, played Just Dance on the Wii before they all took a powernap. The ground hog even gave them of his latest catch: a mocking bird.",
  lvs: 0,
  nrg: +40,
  pro: 0,
};

events["40n"] = {
  desc:
    "The Flemmings ran away from the safehouse into the woods where they all collapsed with exhaustion. ",
  lvs: -2,
  nrg: -20,
  pro: -150,
};

events["50"] = {
  desc:
    "Seems like we survived the storm. But we're starving. My stomach just growled. There's a bird on a tree. She's mocking us. She's asking: \"Are you? Are you? Are you coming to the tree?\" Should we eat that mocking bird?",
  y: 51,
  n: 60,
};

events["50y"] = {
  desc:
    "The Flemmings caught the mocking bird after a short chase and decided to make a fire to roast it.",
  lvs: 0,
  nrg: -5,
  pro: 0,
};

events["50n"] = {
  desc:
    "The Flemmings followed the mocking bird to an old, dry tree near the frozen river.",
  lvs: 0,
  nrg: -20,
  pro: -150,
};

events["51"] = {
  desc:
    "We're about to make a fire to roast the bird but the wood around here is too wet. Should we split into two groups to find dry wood?",
  y: 52,
  n: 60,
};

events["51y"] = {
  desc:
    "The Flemmings split into two groups to search for dry wood. One group soon returned with success and the Flemmings had a feast. The other group never showed up.",
  lvs: -20,
  nrg: +40,
  pro: 0,
};

events["51n"] = {
  desc:
    "The Flemmings took the bird with them and headed towards the river to find dry wood. Just when they were leaving the forest behind, out of the blue a lightning strike hit an old, dry tree and it burst into flames. Here we go: the feast is on!",
  lvs: 0,
  nrg: 20,
  pro: -150,
};

events["52"] = {
  desc:
    "I'm afraid something happened to the other group. Should we wait for them?",
  y: 53,
  n: 61,
};

events["52y"] = {
  desc:
    "The Flemmings waited for a long time but the other group never showed. Then suddenly, out of the blue, mad cows attacked the group. They started chasing the Flemmings towards some ominous smoke...",
  lvs: -20,
  nrg: -20,
  pro: -150,
};

events["52n"] = {
  desc:
    "The remaining Flemmings headed for the river. The closer they got the more clearly they could see some smoke coming from the area. It could be man-made or monster-made.",
  lvs: 0,
  nrg: -5,
  pro: -150,
};

events["53"] = {
  desc:
    "There's smoke on the water and fire in the sky. This could mean man-made, maybe some kind of transporation vehicle to help us. Maybe the pixaport with the pixaxopters? Should we checkout the smoke?",
  y: 61,
  n: 60,
};

events["53y"] = {
  desc:
    "It wasn't man-made. Looks like lightning strike hit an old, dry tree and some fried tomatoes around. Good vegan meal.",
  lvs: 0,
  nrg: 30,
  pro: -40,
};

events["53n"] = {
  desc:
    "The Flemmings went out of their way to avoid the smoke. They reached the river at a point where it was pretty wide.",
  lvs: 0,
  nrg: -10,
  pro: 120,
};

events["60"] = {
  desc:
    "So the river seems frozen but we're not sure how strong the ice is. Should we try to cross anyway?",
  y: 10,
  n: 70,
};

events["60y"] = {
  desc:
    "As the Flemmings were crossing the ice cracked under their weight and they all sank like the Titanic.",
  lvs: -99,
  nrg: -40,
  pro: 0,
};

events["60n"] = {
  desc:
    "The Flemmings walked the path along the river to the Tixerrary bridge. It's a long way to Tixerrary. Luckily, they found a dead tourist's pixelphone on the bridge.",
  lvs: 0,
  nrg: -10,
  pro: 120,
};

events["61"] = {
  desc:
    "So the river seems frozen but we're not sure how strong the ice is. Should we try to cross anyway?",
  y: 70,
  n: 70,
};

events["61y"] = {
  desc:
    "As the Flemmings were crossing the river the ice cracked under their weight... But they made it. They even found a pixelphone.",
  lvs: 0,
  nrg: -10,
  pro: -200,
};

events["61n"] = {
  desc:
    "The Flemmings walked the path along the river to the Tixerrary bridge. It's a long way to Tixerrary. Luckily, they found a dead tourist's pixelphone on the bridge.",
  lvs: 0,
  nrg: -10,
  pro: 120,
};

events["70"] = {
  desc:
    "We made it over the river and even found a pixelphone! Battery is really low, though. Called a PixuberX quickly but if it won't make it here in time and our day will start again!! Should we risk waiting for the PixuberX??",
  y: 80,
  n: 10,
};

events["70n"] = {
  desc:
    "Unfortunetely, not waiting for the PixuberX was a big mistake. Half way to the destination the group lost their way. The day trip starts again!",
  lvs: -99,
  nrg: -99,
  pro: 0,
};

events["70y"] = {
  desc:
    "It was a risky move but it paid off! The PixuberX took the team to the Pixairport.",
  lvs: 0,
  nrg: -10,
  pro: -600,
};

events["80"] = {
  desc:
    "We made it to the Pixairport's three gates. Gate #1 is closest. Should we go there?",
  y: 90,
  n: 10,
};

events["80y"] = {
  desc:
    "Good move! Just in time before an out of control pixaluggage car starts swirling its way through. It would've been a sad ending.",
  lvs: 0,
  nrg: -5,
  pro: -100,
};

events["80n"] = {
  desc:
    "Out of the blue, an out of control pixaluggage car hits the Flemmings. Sad ending.",
  lvs: -99,
  nrg: -99,
  pro: 0,
};

events["90"] = {
  desc:
    "Okay, gatekeeper says: \"I have three pixacopters. One of them has a real pilot who can take you to #Devlearn. The other two have fake pilots. You picked gate #1 before. I'll tell you between #2 and #3, #2 is a fake one. Now, I'll give you a chance to switch to #3 or stick to #1.\" Should we switch to #3?",
  y: 100,
  n: 10,
};

events["90y"] = {
  desc:
    "By switching to #3 you raised your chances for a real pilot from 1/3 to 2/3. Congratulations! You're going to #DevLearn. Out of the blue!",
  lvs: 0,
  nrg: 0,
  pro: -900,
};

events["90n"] = {
  desc:
    "By not switching, your chances were only 1/3 instead 2/3. Next time remember: always switch to raise it to 2/3. Unfortunetly, your fake pilot crashed the pixacopter.",
  lvs: -99,
  nrg: -99,
  pro: 0,
};

events["100"] = {
  desc: "Done!",
};

//-------------------------------------------------------Turn-based events
events["1000r"] = {
  desc:
    "Hey, we found some bricks. They would slow us down but who knows, maybe they'll be useful. Should we picked them up?",
  y: -1,
  n: -1,
};

events["1000ry"] = {
  desc: "Got it! Heavy like metal. We're going to walk 10x slower.",
  lvs: 0,
  nrg: 0,
  pro: 0,
};

events["1000rn"] = {
  desc: "You're right! It's just another brick in the wall.",
  lvs: 0,
  nrg: 0,
  pro: 0,
};
//---------------------------------------------------------------------------------Conditional checks
function checkEvent(e) {
  console.log("checking " + e);
  console.log("bricks " + GetPlayer().GetVar("HasBricks"));
  switch (e) {
    case "1000ry":
      speedChange(10);
      GetPlayer().SetVar("HasBricks", 1);
      console.log("bricks set to " + GetPlayer().GetVar("HasBricks"));

      break;

    case "61y":
      if (GetPlayer().GetVar("HasBricks") > 0) {
        events["61y"].lvs = -40;
        console.log(events);
      }

      break;

    case "52y":
      if (GetPlayer().GetVar("HasBricks") > 0) {
        events["52y"].lvs = -10;
        events["52y"].nrg = -30;
        events["52y"].desc +=
          "The bricks helped! The Flemmings dropped all of them.";
        GetPlayer().SetVar("HasBricks", 0);
        GetPlayer().SetVar("Speed", 1);
      }

      break;
  }
}

function speedChange(x) {
  var player = GetPlayer();
  player.SetVar("Speed", x);
  //player.SetVar("History",player.GetVar("History")+" The Flemmings are 10x slower with the bricks.");
}
//---------------------------------------------------------------------------------
function randomEvents() {
  var rand = "10";
  var randmax = 0;
  var keys = [];
  for (var key in events) {
    if (events.hasOwnProperty(key)) {
      if (
        key.indexOf("y") == -1 &&
        key.indexOf("n") == -1 &&
        key.indexOf("r") == -1
      )
        keys.push(key);
    }
  }
  var randy = Math.floor(Math.random() * Math.floor(keys.length / 5)) + 1;
  var tempn = events[keys[randy]].n;
  var tempy = events[keys[randy]].y;
  events[keys[randy]].n = "1000r";
  events[keys[randy]].y = "1000r";
  events["1000r"].n = tempn;
  events["1000r"].y = tempy;
}
//----------------------------------------------------------------endgame
function endGame(status) {
  var message = "";
  switch (status) {
    case 1:
      message =
        "Success!! From the mountains to #DevLearn! We have " +
        GetPlayer().GetVar("Lvs") +
        " Flemmings friends left and enough energy to learn.";

      break;
    case 0:
      message =
        "Oh, no!! We were so close to #DevLearn, " +
        GetPlayer().GetVar("Pro") +
        " pixies away. ";
      message +=
        GetPlayer().GetVar("Lvs") <= 0
          ? "We ran out of Flemmings... "
          : "At least we have some Flemmings left. ";
      message +=
        GetPlayer().GetVar("Nrg") <= 0
          ? "We ran out of energy... "
          : "At least we have some energy left. ";
      break;
  }

  GetPlayer().SetVar("ScenarioFinal", message);
}
