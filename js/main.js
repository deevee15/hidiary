import {sliderMenu as slider, searchHeader as search, selectMenu, logout, searchEntry} from './menu.js';
import {scrollEntry, calendar, addEntry} from './entry.js';
const menu = document.querySelector('.menu'), searchEl = document.querySelector('.header__search-icon');
const date = new Date();
document.querySelector('.entry-list').style.display = 'none';
async function checkAccount(){
    let req = await fetch('/settings/check-account.php');
    if(req.ok){
        let data = await req.text();
        if(data == 'none'){window.location = '/index.php';}
    }
}
setInterval( ()=>{checkAccount();}, 1000);
slider(menu);
search();
scrollEntry();
calendar(date.getFullYear(), date.getMonth());
addEntry();
searchEntry();
document.querySelector('.menu').addEventListener('click', selectMenu);
document.querySelector('.header__profile').addEventListener('click', logout);