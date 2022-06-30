// VARIABLE
const channelName = "GUESS";
const publishKey = "pub-c-4ea17e48-f4dd-43b4-837d-899d55b43215";
const subscribeKey = "sub-c-9264ee99-02dc-48c2-9158-ae9f6362a43e";
let id;
let isHost = false;
let isMain = false;
let number;
let server;



// MAIN
function playingGame () {
    if (screen.height < screen.width) {
        isHost = true;
    }

    id = "guest" + Math.floor (Math.random (1000000000));
    number = Math.floor (Math.random (10000));

    server = new PubNub ({
        publishKey: publishKey,
        subscribeKey: subscribeKey,
        uuid: id,
    });

    server.subscribe ({
        channels: [channelName],
        withPresence: true,
    });

    server.addListener ({
        message: receivingMessage,
        presence: receivingPresence,
    });

    if (isHost) {
        window.location.href = "landscape.html";
    } else {
        window.location.href = "portrait.html";
    }
}

function receivingMessage (message) {
    console.log (message);
}

function receivingPresence (presence) {
    document.getElementById ("occupancy").textContent = presence.occupancy + " players";

    if (presence.occupancy == 1) {
        if (isHost) {

        } else {
            history.back ();
        }
    } else {

    }
}