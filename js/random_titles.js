var target = document.getElementById('countdown-title');
var titles = [
    "Avocato will not come back",
    "Body count starts",
    "You'll be legally allowed to hate Lord Commander",
    "You will lose it",
    "H.U.E. will reboot",
    "Mooncake's laser will be fully charged",
    "Gary grows his mustache",
    "The cookies will bake again",
    "All bets will be off",
    "KVN will reboot",
    "Another sadness deposit",
    "Final Space will return",
    "Season Two will depoly",
    "Launching",
    "We're ready to go",
    "The breach will open in",
    "All pieces will be in place",
    "Season Two will be done"
];
function newTitle () {
    var i = (Math.random() * titles.length) | 0;
    target.innerText = titles[i];
}
newTitle();
