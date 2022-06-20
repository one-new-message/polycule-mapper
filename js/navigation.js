var showingMenuDropdown = false;

function openPage(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

function defaultOpen(pageName) {
    document.getElementById(pageName).click();
}

function openMenuDropdown(itemName) {
    showingMenuDropdown = !showingMenuDropdown;
    document.getElementById(itemName).classList.toggle("show");
}

function changeMenuDropdown(itemName) {
    if (showingMenuDropdown) {
        var hoveredItem = document.getElementById(itemName);
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        if (!hoveredItem.classList.contains('show')) {
            hoveredItem.classList.add('show');
        }
    }
}

function openPersonEditor(id) {
    var printname = Object.values(people[id][1]);
    var printpronouns = Object.values(people[id][2]);
    var printtimezone = Object.values(people[id][6]);
    var printtwitter = Object.values(people[id][7]);
    var tempsystems = Object.values(people[id][3])[0];
    var temppolycules = Object.values(people[id][4])[0];
    var temppartners = Object.values(people[id][5])[0];
    var tables = document.getElementsByClassName('itemtable');
    var tops = document.getElementsByClassName('tabtop');
    const parent = document.getElementById('peoplediv');
    const node = document.createElement("div");
    node.innerHTML = personEditor;
    parent.appendChild(node);
    for (let i = 0; i < tables.length; i++) {
        if (!tables[i].classList.contains('hide')) {
            tables[i].classList.add('hide');
        }
    }
    for (let i = 0; i < tops.length; i++) {
        if (!tops[i].classList.contains('hide')) {
            tops[i].classList.add('hide');
        }
    }
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = printname;
    document.getElementById('edit-pronouns').value = printpronouns;
    document.getElementById('edit-timezone').value = printtimezone;
    document.getElementById('edit-twitter').value = printtwitter;
    for (let i = 0; i < systems.length; i++) {
        var container = document.createElement("label");
        container.classList.add('container');
        if (tempsystems.includes(i)) {
            container.innerHTML = Object.values(systems[i][1])[0]+'<input type="checkbox" id="systems-'+i+'" checked="checked"><span class="checkmark"></span>';
        } else {
            container.innerHTML = Object.values(systems[i][1])[0]+'<input type="checkbox" id="systems-'+i+'"><span class="checkmark"></span>';
        }
        document.getElementById('editor-systems').appendChild(container);
    }
    for (let i = 0; i < polycules.length; i++) {
        var container = document.createElement("label");
        container.classList.add('container');
        if (temppolycules.includes(i)) {
            container.innerHTML = Object.values(polycules[i][1])[0]+'<input type="checkbox" id="polycules-'+i+'" checked="checked"><span class="checkmark"></span>';
        } else {
            container.innerHTML = Object.values(polycules[i][1])[0]+'<input type="checkbox" id="polycules-'+i+'"><span class="checkmark"></span>';
        }
        document.getElementById('editor-polycules').appendChild(container);
    }
    for (let i = 0; i < people.length; i++) {
        var container = document.createElement("label");
        container.classList.add('container');
        if (temppartners.includes(i)) {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="partners-'+i+'" checked="checked"><span class="checkmark"></span>';
        } else {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="partners-'+i+'"><span class="checkmark"></span>';
        }
        document.getElementById('editor-partners').appendChild(container);
    }
}

function openSystemEditor(id) {
    var printname = Object.values(systems[id][1]);
    var tables = document.getElementsByClassName('itemtable');
    var tops = document.getElementsByClassName('tabtop');
    const parent = document.getElementById('systemsdiv');
    const node = document.createElement("div");
    node.innerHTML = systemEditor;
    parent.appendChild(node);
    for (let i = 0; i < tables.length; i++) {
        if (!tables[i].classList.contains('hide')) {
            tables[i].classList.add('hide');
        }
    }
    for (let i = 0; i < tops.length; i++) {
        if (!tops[i].classList.contains('hide')) {
            tops[i].classList.add('hide');
        }
    }
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = printname;
    for (let i = 0; i < people.length; i++) {
        var tempid = Object.values(people[i][0])[0];
        var included = Object.values(people[i][3])[0];
        var container = document.createElement("label");
        container.classList.add('container');
        if (included.includes(id)) {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="members-'+tempid+'" checked="checked"><span class="checkmark"></span>';
        } else {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="members-'+tempid+'"><span class="checkmark"></span>';
        }
        document.getElementById('editor-members').appendChild(container);
    }
}

function openPolyculeEditor(id) {
    var printname = Object.values(polycules[id][1]);
    var tables = document.getElementsByClassName('itemtable');
    var tops = document.getElementsByClassName('tabtop');
    const parent = document.getElementById('polyculesdiv');
    const node = document.createElement("div");
    node.innerHTML = polyculeEditor;
    parent.appendChild(node);
    for (let i = 0; i < tables.length; i++) {
        if (!tables[i].classList.contains('hide')) {
            tables[i].classList.add('hide');
        }
    }
    for (let i = 0; i < tops.length; i++) {
        if (!tops[i].classList.contains('hide')) {
            tops[i].classList.add('hide');
        }
    }
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = printname;
    for (let i = 0; i < people.length; i++) {
        var tempid = Object.values(people[i][0])[0];
        var included = Object.values(people[i][4])[0];
        var container = document.createElement("label");
        container.classList.add('container');
        if (included.includes(id)) {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="members-'+tempid+'" checked="checked"><span class="checkmark"></span>';
        } else {
            container.innerHTML = Object.values(people[i][1])[0]+' ('+Object.values(people[i][7])[0]+')<input type="checkbox" id="members-'+tempid+'"><span class="checkmark"></span>';
        }
        document.getElementById('editor-members').appendChild(container);
    }
}

function closeEditor() {
    var editor = document.getElementById('editor');
    var tables = document.getElementsByClassName('itemtable');
    var tops = document.getElementsByClassName('tabtop');
    editor.remove();
    for (let i = 0; i < tables.length; i++) {
        if (tables[i].classList.contains('hide')) {
            tables[i].classList.remove('hide');
        }
    }
    for (let i = 0; i < tops.length; i++) {
        if (tops[i].classList.contains('hide')) {
            tops[i].classList.remove('hide');
        }
    }
    updateView();
}

window.onclick = function(event) {
    if (!event.target.matches('.menubar button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        showingMenuDropdown = false;
    }
}