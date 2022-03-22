import Vimeo from "@vimeo/player";
import throttle from "lodash.throttle";

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

const currentTime = localStorage.getItem(STORAGE_KEY);

player.setCurrentTime(currentTime).then(function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(currentTime) {
    localStorage.setItem(STORAGE_KEY, currentTime.seconds);
}