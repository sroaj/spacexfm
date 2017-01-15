//TODO: use a more robust onload
var DOMYoutubeIFrame = document.getElementById('youtube-iframe');

DOMYoutubeIFrame.src = 'about:blank';

var trackList = [
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':0, 'endSeconds': 128,          'name': 'Flowing',                                'artist': 'Chill Purpose'},
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':128, 'endSeconds': 531,        'name': 'First Step',                             'artist': '5 seconds media'},
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':531, 'endSeconds': 682,        'name': 'Subcultures',                            'artist': 'Chris Southward'},
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':682, 'endSeconds': 788,        'name': 'Particles',                              'artist': 'Chris Southward'},
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':788, 'endSeconds': 1044,       'name': 'Grace VS Technique',                     'artist': 'Chris Southward'},
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':1044, 'endSeconds': 1346,      'name': 'Louder',                                 'artist': '5 seconds media'},
    {'videoId': 'Ggo7E0LyEJw', 'startSeconds':11, 'endSeconds': undefined,   'name': 'Orbital',                                'artist': 'Thomas hogan'},
    {'videoId': 'CQnR5fhCXkQ', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Unknown Falcon 9 First Stage Return',    'artist': 'Unknown'},
    {'videoId': 'MX76RyZulI8', 'startSeconds':0, 'endSeconds': 144,          'name': 'Unknown SpaceX Dragon V2 Unveil Intro',  'artist': 'Unknown'},
    {'videoId': 'MX76RyZulI8', 'startSeconds':1048, 'endSeconds': 1223,      'name': 'Unknown SpaceX Dragon V2 Unveil Outro',  'artist': 'Unknown'},
    {'videoId': 'Cf_-g3UWQ04', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Now The Time Is Here',                   'artist': 'Toni Halliday' },
    {'videoId': '0NKFtrlrOIs', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Trip Wire',                              'artist': 'Aleksandar Dimitrijevic'},
    {'videoId': 'vrR31nHCV-U', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Unknown SpaceX Rocket Tank Production',  'artist': 'Unknown'},
    {'videoId': 'IBm9xpltdIo', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Unknown SpaceX Webcast Music 10.01.2015','artist': 'Unknown'},
    {'videoId': 'Tccj8-rcQ08', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Cascade',                                'artist': 'Chill Purpose'},
    {'videoId': 'SOLOZRVNM8w', 'startSeconds':132, 'endSeconds': 348,        'name': 'Gravity',                                'artist': 'Parker & Hanson'},
    {'videoId': '7uflq0d4rzg', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Unknown SpaceX Webcast Music 28.06.2015','artist': 'Unknown'},
    {'videoId': 'xjSb_b4TtxI', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Drifting Clouds',                        'artist': 'Andrew Britton and David Goldsmith' },
    {'videoId': 'IOUjcEtT5_w', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Samus',                                  'artist': 'Test Shot Starfish' },
    {'videoId': 'yXAEAUN6Az8', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Ice Kid',                                'artist': 'Test Shot Starfish'},
    {'videoId': 'd0X82bh42gQ', 'startSeconds':0, 'endSeconds': undefined,    'name': 'Flight',                                 'artist': 'Test Shot Starfish'},
    {'videoId': 'zLbUTy0K97c', 'startSeconds':283, 'endSeconds': 571,        'name': 'Unknown B',                              'artist': 'Unknown' },
	{'videoId': 'hVTXPwNBu7g', 'startSeconds':1, 'endSeconds': undefined,    'name': 'The Strangers',                          'artist': 'The Deep'},
	{'videoId': 'A1YxNYiyALg', 'startSeconds':0, 'endSeconds': 263,          'name': 'Resonator',                              'artist': 'Test Shot Starfish' },
    {'videoId': 'A1YxNYiyALg', 'startSeconds':263, 'endSeconds': 561,        'name': 'Unknown A',                              'artist': 'Unknown' },
	{'videoId': 'A1YxNYiyALg', 'startSeconds':830, 'endSeconds': 1156,       'name': 'Forwared Nostalgic',                     'artist': 'Test Shot Starfish' },
    {'videoId': '0qo78R_yYFA', 'startSeconds':0, 'endSeconds': undefined,    'name': 'SpaceX Interplanetary Transport System', 'artist': 'Unknown' },
];

var trackPlaying = false;
var trackCursor = Math.floor(Math.random() * trackList.length);
var newTrack = pickTrack();
DOMYoutubeIFrame.src = 'https://www.youtube.com/embed/'+newTrack.videoId+'?start='+newTrack.startSeconds+'&end='+newTrack.endSeconds+'&autoplay=1&enablejsapi=1&origin='+window.location.protocol + "//" + window.location.hostname;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player(DOMYoutubeIFrame, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        if (trackPlaying == false) {
            console.log("Attempting to play another video too fast");
        } else {
            trackPlaying = false;
            increaseTrackCursor()
            player.loadVideoById(pickTrack());
        }
    }
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("Track now playing");
        trackPlaying = true;
    }
    if (event.data == -1) {
        setTimeout(function() {
            if (player.getPlayerState() == -1) {
                console.log("Still unstarted after 1 second, skipping");
                increaseTrackCursor();
                player.loadVideoById(pickTrack());
            }
        },1000)
    }
    if (document.getElementById('media').className != "active") {
        document.getElementById('media').className = 'active';
    }
}

function pickTrack() {
    console.log('Playing track '+(trackCursor+1) +' of '+ trackList.length)
    console.log('Artist: '+trackList[trackCursor].artist);
    console.log('Name: '+trackList[trackCursor].name);
    return trackList[trackCursor];
}
function increaseTrackCursor() {
    trackCursor = (trackCursor+1) % trackList.length;
}
function decreaseTrackCursor() {
    trackCursor = (trackCursor+trackList.length-1) % trackList.length;
}
document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 32: // space
            if (player.getPlayerState() == YT.PlayerState.PAUSED ) {
                player.playVideo();
            } else if (player.getPlayerState() == YT.PlayerState.PLAYING ) {
                player.pauseVideo();
            }
        break;

        case 37: // left
            decreaseTrackCursor();
            player.loadVideoById(pickTrack());
        break;

        case 38: // up
            player.setVolume(player.getVolume()+10);
        break;

        case 39: // right
            increaseTrackCursor();
            player.loadVideoById(pickTrack());
        break;

        case 40: // down
            player.setVolume(player.getVolume()-10);
        break;

        default: return;
    }
    e.preventDefault();
};
