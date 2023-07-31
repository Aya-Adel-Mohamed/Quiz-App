import {Settings} from './settings.js'

let settings = new Settings()
var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = '../images/7718875.png';