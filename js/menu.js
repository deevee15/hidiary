import { convertDate, openEntry, entriesRequest } from "./entry.js";
export function sliderMenu(element) {
    element.addEventListener('mouseover', function(){this.classList.add('hovered');});
    element.addEventListener('mouseout', function(){this.classList.remove('hovered');});
}
export function searchHeader(){
    document.querySelector('.header__search-icon').addEventListener('click', () =>{
        document.querySelector('.header__search').classList.toggle('clicked');
        if(!document.querySelector('.header__search-input').classList.contains('clicked')){
             document.querySelector('.header__search-results').style.display = 'none';
             document.querySelector('.header__search-input input').value = '';
        }
    });
}
export async function selectMenu(e){
    let entryList = document.querySelector('.entry-list');
    let getType = e.target.dataset.element || e.target.closest('.menu__item').dataset.element;
    if(!getType) return;
    if(document.querySelector('.clicked')) document.querySelector('.clicked').classList.remove('clicked');
    document.querySelector(`[data-element=${getType}]`).classList.add('clicked');
    entryList.innerHTML = '';
    entryList.style.display = 'flex';
    document.querySelector('.note').style.display = 'none'; document.querySelector('.calendar').style.display = 'none'; document.querySelector('.add').style.display = 'none';
    let sendType = 0;
    switch(getType){
        case 'all-entries':
            sendType = 0;
            document.title = 'hidiary! - all entries';
            break;
        case 'archived-entries':
            sendType = 1;
            document.title = 'hidiary! - archived entries';
            break;
        case 'deleted-entries':
            sendType = 2;
            document.title = 'hidiary! - deleted entries';
            break;
    }
    let userEntries = [];
    await entriesRequest(sendType, {
        stack(users){
            if(users.length == null) return;
            users.forEach(user =>{
                userEntries.push(user);
            });
        }
    });
    let setType = getType.split('-');
    for(let i = 0; i < userEntries.length; i++){
        entryList.innerHTML += `
            <div class="entry ${setType[0]}" data-id="${userEntries[i].id}">
                <div class="entry__preview"><p>${userEntries[i].text}</p></div>
                <div class="entry__name">${userEntries[i].name}</div>
                <div class="entry__date">${convertDate(userEntries[i].date)}</div>
            </div>
        `;
    }
    entryList.addEventListener('click', openEntry);
}
export async function logout(e){
    if(!document.querySelector('.header__profile ul').classList.contains('clicked')) document.querySelector('.header__profile ul').classList.add('clicked');
    else document.querySelector('.header__profile ul').classList.remove('clicked');
    let param = e.target.className;
    if(param != 'logout') return;
    let req = await fetch('/settings/logout.php');
    let ans = await req.text();
    if(req.ok){
        if(ans == 'ok') window.location = '/index.php';
    }
}
export function searchEntry(){
    document.querySelector('.header__search-input input').addEventListener('keydown', async function(){
        const searchResults = document.querySelector('.header__search-results');
        let searchText = this.value;
        if(searchText) searchResults.style.display = 'block';
        searchResults.innerHTML = '';
        let req = await fetch('/settings/search_entry.php',{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "search="+searchText,
        });
        let entries;
        if(req.ok){
            entries = await req.json();
            for(let i = 0; i < entries.length; i++){
                let status;
                if(entries[i].status == 1) status = 'archived';
                else if(entries[i].status == 2) status = 'deleted';
                else status = 'all';
                searchResults.innerHTML += `
                    <li data-id="${entries[i].id}" class="${status}">${entries[i].text}</li>
                `;
            }
        }
        searchResults.addEventListener('click', openEntry);
    });
}