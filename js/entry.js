import {upload} from './file.js';
export function scrollEntry(){
    document.querySelector('.align-column').addEventListener('scroll', function(){
        if(this.scrollTop > document.body.pageY - 70) this.querySelector('.note__nav').classList.add('scroll');
        else this.querySelector('.note__nav').classList.remove('scroll');
    });
}
export async function entriesRequest(type, params = {}){
    const usersStack = params.stack ?? null;
    let users;
    let req = await fetch('/settings/get_entries.php?type='+type);
    if(req.ok){users = await req.json();}
    usersStack(users);
}
export function convertDate(someDate){
    let firstSplitted = someDate.split('/');
    let date = firstSplitted[0].split('.');
    let time = firstSplitted[1].split(':');
    let month;
    let actualDate = new Date();
    let actualDay=actualDate.getDate(), actualMonth=actualDate.getMonth(), actualYear=actualDate.getFullYear();
    let actualHours=actualDate.getHours(), actualMinutes=actualDate.getMinutes();
    let calcMinutes = actualMinutes - time[1];
    let completedDate;
    if(actualYear == date[2] && actualMonth + 1 == date[1] && actualDay==date[0] && actualHours==time[0] && calcMinutes <= 1){completedDate = 'Right now';} 
    else if(actualYear == date[2] && actualMonth+1 == date[1] && actualDay==date[0] && actualHours == time[0] && calcMinutes <= 5){completedDate = `${calcMinutes} minutes ago`;}
    else if(actualYear == date[2] && actualMonth+1 == date[1] && actualDay == date[0]){completedDate = `Today at ${time[0]}:${time[1]}`;}
    else{
         switch(date[1].toString()){
            case '01': 
                date[1]='January';
                break;
            case '02': 
                date[1]='February';
                break;
            case '03': 
                date[1]='March';
                break;
            case '04': 
                date[1]='April';
                break;
            case '05': 
                date[1]='May';
                break;
            case '06': 
                date[1]='June';
                break;
            case '07': 
                date[1]='July';
                break;
            case '08': 
                date[1]='August';
                break;
            case '09': 
                date[1]='September';
                break;
            case '10': 
                date[1]='October';
                break;
            case '11': 
                date[1]='November';
                break;
            case '12': 
                date[1]='December';
                break;
        }
        completedDate = `${date[0]} ${date[1]}, ${date[2]} at ${time[0]}:${time[1]}`;
    }
    return completedDate;
}
export async function calendar(y, m){
    let selectedDate = new Date(y, m, 0);
    document.querySelector('.calendar__today p').innerText = 'Today ' + new Date().toLocaleString('en-us', { day: 'numeric', month:'long', year:'numeric'});
    let calendarTable = document.querySelector('.calendar__table');
    let allDays = [];
    for(let i = 0; i < selectedDate.getDate(); i++){allDays.push(i+1);}
    function dayName(day){
        day = new Date(y, m, day).getDay();
        switch(day.toString()){
            case '0': 
                day = 'Monday'; 
                break;
            case '1': 
                day = 'Tuesday'; 
                break;
            case '2': 
                day = 'Wednesday'; 
                break;
            case '3': 
                day = 'Thursday'; 
                break;
            case '4': 
                day = 'Friday';
                break;
            case '5': 
                day = 'Saturday'; 
                break;
            case '6': 
                day = 'Sunday'; 
                break;
        }
        return day;
    }
    function monthStartDay(){
        let skip = 0;
        let check = new Date(y, m, 1);
        if(check.getDay() === 0) skip = 6;
        else if(check.getDay() !== 1) skip = check.getDay() - 1;
        return skip;
    }
    let userEntries = [];
    await entriesRequest(0, {
        stack(users){
            if(users.length == null) return;
            users.forEach(user =>{
                userEntries.push(user);
            });
        }
    });
    let table = '<table><tr>';
    if(monthStartDay() != 0){
        for(let j = 0; j < monthStartDay(); j++) table += '<td></td>';
    }
    let writedDays = [];
    for(let j = 0; j < allDays.length; j++){
        let getWeekDay = new Date(y, m, j).getDay();
        getWeekDay = getWeekDay + 1;
        if(getWeekDay != 0 && getWeekDay % 7 == 1){ table += '</tr><tr>';}
        for(let k = 0; k < userEntries.length; k++){
            let datee = userEntries[k].date.split('/');
            let leftDate = datee[0].split('.'), rightDate =  datee[1].split(':');
            leftDate[1] = leftDate[1] - 1;
            leftDate[0] = leftDate[0] - 1;
            if(y.toString() == leftDate[2] && m.toString() == leftDate[1] && j.toString() == leftDate[0] && !writedDays.includes(j)){
                table += `
                    <td data-id="${userEntries[k].id}" class="noted table-element">
                        <p>${allDays[j]}</p>
                        <p>${dayName(j)}</p>
                    </td>
                `;
                writedDays.push(j);
            }
        }
        if(!writedDays.includes(j)){  
            table += `
                <td class="table-element">
                    <p>${allDays[j]}</p>
                    <p>${dayName(j)}</p>
                </td>
            `;
        }
    }
    table += '</tr></table>';
    calendarTable.innerHTML = table;
    calendarTable.addEventListener('click', openEntry);
}
export async function openEntry(e){
    let entryId = e.target.dataset.id || e.target.closest('td, .entry, li').dataset.id;
    const note = document.querySelector('.note');
    const calendar = document.querySelector('.calendar');
    const entry = document.querySelector('.entry-list');
    const searchBlock = document.querySelector('.header__search-results');
    let whatOpened = 0, entryType = 0;
    if(calendar.style.display == 'block' || calendar.style.display == '') whatOpened = 'Calendar';
    else if(entry.style.display == 'flex') whatOpened = 'Entries list';
    else if(searchBlock.style.display == 'block') whatOpened = 'Search';
    if(e.target.closest('td, .entry, li').classList.contains('archived')) entryType = 1;
    else if(e.target.closest('td, .entry, li').classList.contains('deleted')) entryType = 2;
    if(!entryId) return;
    let entries = [];
    await entriesRequest(entryType, {
        stack(users){
            if(users.length == null) return;
            users.forEach(user =>{
                entries.push(user);
            });
        }
    });
    for(let i = 0; i < entries.length; i++){
        if(entries[i].id == entryId){
            note.style.display = 'block';
            note.dataset.id = entryId;
            if(whatOpened == 'Calendar') calendar.style.display = 'none';
            else if(whatOpened == 'Entries list') entry.style.display = 'none';
            searchBlock.style.display = 'none';
            note.innerHTML = `
                <div class="note__nav">
                    <div class="nav-back">
                        <object data="icons/back.svg" type=""></object>
                        <p>${whatOpened}</p>
                    </div>
                    <div class="nav-edit">
                        <button>Edit</button>
                        <button class="nav-delete">Delete</button>
                    </div>
                </div>
                <div class="note__title">
                    <p>${entries[i].name}</p>
                    <p>${convertDate(entries[i].date)}</p>
                </div>
                <div class="note__edit-status"><p></p></div>
                <div class="note__text">
                    <p>${entries[i].text}</p>
                    <textarea name="">${entries[i].text}</textarea>
                </div>
                <div class="note__buttons"></div>
            `;
            function openEdit(){
                document.querySelector('.nav-edit button').addEventListener('click', function(){
                    this.innerHTML = 'Editing';
                    this.classList.add('processing');
                    document.querySelector('.note__buttons').innerHTML = `
                        <button class="button-save">Save</button>
                        <button>Cancel</button>
                    `;
                    document.querySelector('.note__title p:first-child').innerHTML = `${entries[i].name} / editing`;
                    document.querySelector('.note__text p').style.display = 'none';
                    document.querySelector('.note__text textarea').style.display = 'block';
                    closeNote();
                    cancelEdit();
                    applyEdit();
                });
            }
            function cancelEdit(){
                document.querySelector('.note__buttons button:last-child').addEventListener('click', ()=>{
                    document.querySelector('.nav-edit button').innerHTML = 'Edit';
                    document.querySelector('.nav-edit button').classList.remove('processing');
                    document.querySelector('.note__text p').style.display = 'block';
                    document.querySelector('.note__text textarea').style.display = 'none';
                    document.querySelector('.note__title p:first-child').innerHTML = `${entries[i].name}`;
                    document.querySelector('.note__buttons').innerHTML = '';
                });
            }
            function applyEdit(){
                document.querySelector('.button-save').addEventListener('click', async function(){
                    let newText = document.querySelector('.note__text textarea').value;
                    let entryId = note.dataset.id;
                    let req = await fetch('/settings/edit_entry.php', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: `text=${newText}&id=${entryId}`,
                    });
                    let ans = await req.text();
                    if(req.ok){
                        document.querySelector('.note__edit-status').classList.remove('error');
                        document.querySelector('.note__edit-status').classList.add('showed');
                        setTimeout(function(){
                            document.querySelector('.note__edit-status').classList.remove('showed');
                        }, 3000);
                        if(ans == 'ok'){
                            document.querySelector('.note__text p').innerHTML = newText;
                            document.querySelector('.note__edit-status p').textContent = 'Your changes saved successfully!';
                        }
                        else if(ans == 'err1'){
                            document.querySelector('.note__edit-status').classList.add('error');
                            document.querySelector('.note__edit-status p').textContent = 'Text cannot be empty. Type something!';
                        }
                    }
                });
            }
            function deleteNote(){
                document.querySelector('.nav-delete').addEventListener('click', async function(){
                    let entryId = note.dataset.id;
                    let status = 2;
                    let req = await fetch('/settings/change_entry-status.php', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: `status=${status}&id=${entryId}`,
                    });
                    let ans = await req.text();
                    if(req.ok){
                        if(ans == 'ok'){
                            note.style.display = 'none';
                            calendar.style.display = 'block';
                        }
                    }
                });
            }
            function closeNote(){
                document.querySelector('.note .note__nav .nav-back').addEventListener('click', ()=>{
                    if(whatOpened == 'Calendar' || whatOpened == 'search'){
                        note.style.display = 'none';
                        calendar.style.display = 'block';
                    }
                    else if(whatOpened == 'Entries list'){
                        note.style.display = 'none';
                        entry.style.display = 'flex';
                    }
                });
            }
            openEdit();
            closeNote();
            deleteNote();
        }
    }
}
export function addEntry(){
    let whatOpened = '';
    document.querySelector('.header__new-entry').addEventListener('click', function(){
        if((document.querySelector('.calendar').style.display == 'block' || document.querySelector('.calendar').style.display == '') && document.querySelector('.note').style.display == ''){
            document.querySelector('.calendar').style.display = 'none';
            document.querySelector('.add .nav-back p').innerHTML = 'Calendar';
            whatOpened = 'calendar';
        }
        else if(document.querySelector('.calendar').style.display == 'none' && document.querySelector('.note').style.display == 'block'){
            document.querySelector('.note').style.display = 'none';
            document.querySelector('.add .nav-back p').innerHTML = 'Entry';
            whatOpened = 'note';
        }
        else if(document.querySelector('.calendar').style.display == 'none' && document.querySelector('.note').style.display == 'none' && document.querySelector('.entry-list').style.display == 'flex'){
            document.querySelector('.entry-list').style.display = 'none';
            document.querySelector('.add .nav-back p').innerHTML = 'Entries list';
            whatOpened = 'list';
        }
        document.querySelector('.add').style.display = 'block';
        document.querySelector('.add__status').classList.remove('show');
    });
    document.querySelector('.add .nav-back').addEventListener('click', ()=>{
        document.querySelector('.add').style.display = 'none';
        if(whatOpened == 'calendar'){document.querySelector('.calendar').style.display = 'block';}
        else if(whatOpened == 'note'){document.querySelector('.note').style.display = 'block';}
        else if(whatOpened == 'list'){document.querySelector('.entry-list').style.display = 'flex';}
        document.querySelector('.add input').value = '', document.querySelector('.add textarea').value = '';
    });
    document.querySelector('.add button').addEventListener('click', async function(){
        let entryName = document.querySelector('.add input').value, entryText = document.querySelector('.add textarea').value;
        let rq = await fetch('/settings/add_entry.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'name='+entryName+'&text='+entryText,
        });
        let ans = await rq.text();
        if(rq.ok){if(ans == 'error') {console.log(ans);}}
        document.querySelector('.add__status').classList.add('show');
        document.querySelector('.add__status').innerHTML = 'Your entry added successfully.';
    });
    let filesArr = [];
    upload('.file-input',{
        multiple: true,
        fileType: ['.png', '.webp', '.gif', '.jpeg'],
        onUpload(files){
            files.forEach(file =>{
                filesArr.push(file);
            });
        }
    });
}