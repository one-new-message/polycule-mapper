var people = [];
var systems = [];
var polycules = [];

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function openFilePrompt() {
    let input = document.createElement('input');
    input.type = 'file';
    input.setAttribute("accept",".json");
    input.onchange = _this => {
        let files =   Array.from(input.files);
        importData(files[0]);
    };
    input.click();
}

function importData(data) {
    const reader = new FileReader();
    reader.onload = function(evt) {
        contents = evt.target.result;
        contents = JSON.parse(contents);
        contents = Object.values(contents);
        people = Object.values(contents[0]);
        systems = Object.values(contents[1]);
        polycules = Object.values(contents[2]);
        updateView();
    };
    var contents = reader.readAsText(data);
}

function saveFilePrompt() {
    var package = '{"people":'+JSON.stringify(people)+',"systems":'+JSON.stringify(systems)+',"polycules":'+JSON.stringify(polycules)+'}';
    download(package, 'polycule.json', 'text/json');
}

function updateView() {
    var persontable = document.getElementById('persontable');
    var systemtable = document.getElementById('systemtable');
    var polyculetable = document.getElementById('polyculetable');
    persontable.innerHTML = "<tr><th>Name</th><th>Pronouns</th><th>Systems</th><th>Polycules</th></tr>";
    systemtable.innerHTML = "<tr><th>Name</th><th>Members</th></tr>";
    polyculetable.innerHTML = "<tr><th>Name</th><th>Number of Members</th></tr>";
    for (let i = 0; i < people.length; i++) {
        var printname = Object.values(people[i][1]);
        var printtwitter = Object.values(people[i][7]);
        var printpronouns = Object.values(people[i][2]);
        var tempsystems = Object.values(people[i][3])[0];
        var temppolycules = Object.values(people[i][4])[0];
        var printsystems = "";
        var printpolycules = "";
        if (tempsystems.length == 0) {
            printsystems = "N/A";
        } else {
            for (let u = 0; u < tempsystems.length; u++) {
                var sysid = tempsystems[u];
                for (let o = 0; o < systems.length; o++) {
                    if (Object.values(systems[o][0])[0] == sysid) {
                        sysid = o;
                        break;
                    }
                }
                if (printsystems.length == 0) {
                    printsystems = printsystems + Object.values(systems[sysid][1]);
                } else {
                    printsystems = printsystems + ", " + Object.values(systems[sysid][1]);
                }
            }
        }
        if (temppolycules.length == 0) {
            printpolycules = "N/A";
        } else {
            for (let u = 0; u < temppolycules.length; u++) {
                var polyid = temppolycules[u];
                for (let o = 0; o < polycules.length; o++) {
                    if (Object.values(polycules[o][0])[0] == polyid) {
                        polyid = o;
                        break;
                    }
                }
                if (printpolycules.length == 0) {
                    printpolycules = printpolycules + Object.values(polycules[polyid][1]);
                } else {
                    printpolycules = printpolycules + ", " + Object.values(polycules[polyid][1]);
                }
            }
        }
        var row = persontable.insertRow(-1);
        var namecell = row.insertCell(0);
        var pronounscell = row.insertCell(1);
        var systemscell = row.insertCell(2);
        var polyculescell = row.insertCell(3);
        namecell.innerHTML = "<a href='#' onclick='openPersonEditor("+Object.values(people[i][0])[0]+")'><b>"+printname+"</b> ("+printtwitter+")</a>";
        pronounscell.innerHTML = printpronouns;
        systemscell.innerHTML = printsystems;
        polyculescell.innerHTML = printpolycules;
    }
    for (let i = 0; i < systems.length; i++) {
        var membernames = "N/A";
        var printname = Object.values(systems[i][1]);
        var row = systemtable.insertRow(-1);
        var namecell = row.insertCell(0);
        var memberscell = row.insertCell(1);
        namecell.innerHTML = "<a href='#' onclick='openSystemEditor("+Object.values(systems[i][0])[0]+")'><b>"+printname+"</b></a>";
        for (let u = 0; u < people.length; u++) {
            if (Object.values(people[u][3])[0].includes(Object.values(systems[i][0])[0])) {
                if (membernames == "N/A") {
                    membernames = Object.values(people[u][1]);
                } else {
                    membernames = membernames + ", " + Object.values(people[u][1]);
                }
            }
        }
        memberscell.innerHTML = membernames;
    }
    for (let i = 0; i < polycules.length; i++) {
        var membernum = 0;
        var printname = Object.values(polycules[i][1]);
        var row = polyculetable.insertRow(-1);
        var namecell = row.insertCell(0);
        var memberscell = row.insertCell(1);
        namecell.innerHTML = "<a href='#' onclick='openPolyculeEditor("+Object.values(polycules[i][0])[0]+")'><b>"+printname+"</b></a>";
        for (let u = 0; u < people.length; u++) {
            if (Object.values(people[u][4])[0].includes(Object.values(polycules[i][0])[0])) {
                membernum++;
            }
        }
        memberscell.innerHTML = membernum;
    }
}

function addPerson() {
    var nameinput = document.getElementById('newperson-name');
    var pronounsinput = document.getElementById('newperson-pronouns');
    var id;
    if (nameinput.classList.contains('outline-red')) {
        nameinput.classList.remove('outline-red');
    }
    if (pronounsinput.classList.contains('outline-red')) {
        pronounsinput.classList.remove('outline-red');
    }
    if (people.length == 0) {
        id = 0;
    } else {
        id = parseInt(Object.values(people[people.length-1][0])) + 1;
    }
    var name = nameinput.value;
    var pronouns = pronounsinput.value;
    if (name.length == 0) {
        if (!nameinput.classList.contains('outline-red')) {
            nameinput.classList.add('outline-red');
        }
        return;
    }
    if (pronouns.length == 0) {
        if (!pronounsinput.classList.contains('outline-red')) {
            pronounsinput.classList.add('outline-red');
        }
        return;
    }
    people.push([{"id":id},{"name":name},{"pronouns":pronouns},{"systems":[]},{"polycules":[]},{"partners":[]},{"timezone":""},{"twitter":""}]);
    updateView();
    nameinput.value = "";
    pronounsinput.value = "";
}

function addSystem() {
    var nameinput = document.getElementById('newsystem-name');
    var id;
    if (nameinput.classList.contains('outline-red')) {
        nameinput.classList.remove('outline-red');
    }
    if (systems.length == 0) {
        id = 0;
    } else {
        id = parseInt(Object.values(systems[systems.length-1][0])) + 1;
    }
    var name = nameinput.value;
    if (name.length == 0) {
        if (!nameinput.classList.contains('outline-red')) {
            nameinput.classList.add('outline-red');
        }
        return;
    }
    systems.push([{"id":id},{"name":name}]);
    updateView();
    nameinput.value = "";
}

function addPolycule() {
    var nameinput = document.getElementById('newpolycule-name');
    var id;
    if (nameinput.classList.contains('outline-red')) {
        nameinput.classList.remove('outline-red');
    }
    if (polycules.length == 0) {
        id = 0;
    } else {
        id = parseInt(Object.values(polycules[polycules.length-1][0])) + 1;
    }
    var name = nameinput.value;
    if (name.length == 0) {
        if (!nameinput.classList.contains('outline-red')) {
            nameinput.classList.add('outline-red');
        }
        return;
    }
    polycules.push([{"id":id},{"name":name}]);
    updateView();
    nameinput.value = "";
}

function updatePerson() {
    var tempid;
    var idinput = parseInt(document.getElementById('edit-id').value);
    var nameinput = document.getElementById('edit-name').value;
    var pronounsinput = document.getElementById('edit-pronouns').value;
    var timezoneinput = document.getElementById('edit-timezone').value;
    var twitterinput = document.getElementById('edit-twitter').value;
    var editorsystems = document.getElementById('editor-systems').getElementsByTagName('input');
    var editorpolycules = document.getElementById('editor-polycules').getElementsByTagName('input');
    var editorpartners = document.getElementById('editor-partners').getElementsByTagName('input');
    var editedsystems = [];
    var editedpolycules = [];
    var editedpartners = [];
    for (let i = 0; i < editorsystems.length; i++) {
        var id = parseInt(editorsystems[i].id.split("-")[1]);
        if (editorsystems[i].checked) {
            editedsystems.push(id);
        }
    }
    for (let i = 0; i < editorpolycules.length; i++) {
        var id = parseInt(editorpolycules[i].id.split("-")[1]);
        if (editorpolycules[i].checked) {
            editedpolycules.push(id);
        }
    }
    var oldpartners = Object.values(people[idinput][5])[0];
    for (let i = 0; i < editorpartners.length; i++) {
        var id = parseInt(editorpartners[i].id.split("-")[1]);
        if (editorpartners[i].checked) {
            editedpartners.push(id);
        }
    }
    for (let i = 0; i < oldpartners.length; i++) {
        var id = oldpartners[i];
        if (!editedpartners.includes(id)) {
            for (let u = 0; u < people.length; u++) {
                if (Object.values(people[u][0])[0] == id) {
                    id = u;
                    break;
                }
            }
            var extpartners = Object.values(people[id][5])[0];
            extpartners.splice(extpartners.indexOf(idinput), 1);
            people[id][5] = {"partners":extpartners};
        }
    }
    for (let i = 0; i < editedpartners.length; i++) {
        var id = editedpartners[i];
        for (let u = 0; u < people.length; u++) {
            if (Object.values(people[u][0])[0] == id) {
                id = u;
                break;
            }
        }
        var array = Object.values(people[id][5])[0];
        if (!array.includes(idinput)) {
            array.push(idinput);
            people[id][5] = {"partners":array};
        }
    }
    for (let i = 0; i < people.length; i++) {
        if (Object.values(people[i][0])[0] == idinput) {
            tempid = i;
            break;
        }
    }
    people[tempid] = [{"id":idinput},{"name":nameinput},{"pronouns":pronounsinput},{"systems":editedsystems},{"polycules":editedpolycules},{"partners":editedpartners},{"timezone":timezoneinput},{"twitter":twitterinput}];
    closeEditor();
}

function updateSystem() {
    var tempid;
    var idinput = parseInt(document.getElementById('edit-id').value);
    var nameinput = document.getElementById('edit-name').value;
    var editormembers = document.getElementById('editor-members').getElementsByTagName('input');
    var editedmembers = [];
    for (let i = 0; i < editormembers.length; i++) {
        var id = parseInt(editormembers[i].id.split("-")[1]);
        if (editormembers[i].checked) {
            editedmembers.push(id);
        }
    }
    for (let i = 0; i < people.length; i++) {
        if (!editedmembers.includes(Object.values(people[i][0])[0]) && Object.values(people[i][3])[0].includes(idinput)) {
            var tempsystems = Object.values(people[i][3])[0];
            tempsystems.splice(tempsystems.indexOf(idinput), 1);
            people[i][3] = {"systems":tempsystems};
        }
    }
    for (let i = 0; i < editedmembers.length; i++) {
        var id = editedmembers[i];
        for (let u = 0; u < people.length; u++) {
            if (Object.values(people[u][0])[0] == id) {
                tempid = u;
                break;
            }
        }
        var array = Object.values(people[tempid][3])[0];
        if (!array.includes(idinput)) {
            array.push(idinput);
            people[tempid][3] = {"systems":array};
        }
    }
    for (let i = 0; i < systems.length; i++) {
        if (Object.values(systems[i][0])[0] == idinput) {
            tempid = i;
            break;
        }
    }
    systems[tempid] = [{"id":idinput},{"name":nameinput}];
    closeEditor();
}

function updatePolycule() {
    var tempid;
    var idinput = parseInt(document.getElementById('edit-id').value);
    var nameinput = document.getElementById('edit-name').value;
    var editormembers = document.getElementById('editor-members').getElementsByTagName('input');
    var editedmembers = [];
    for (let i = 0; i < editormembers.length; i++) {
        var id = parseInt(editormembers[i].id.split("-")[1]);
        if (editormembers[i].checked) {
            editedmembers.push(id);
        }
    }
    for (let i = 0; i < people.length; i++) {
        if (!editedmembers.includes(Object.values(people[i][0])[0]) && Object.values(people[i][4])[0].includes(idinput)) {
            var temppolycules = Object.values(people[i][4])[0];
            temppolycules.splice(temppolycules.indexOf(idinput), 1);
            people[i][4] = {"polycules":temppolycules};
        }
    }
    for (let i = 0; i < editedmembers.length; i++) {
        var id = editedmembers[i];
        for (let u = 0; u < people.length; u++) {
            if (Object.values(people[u][0])[0] == id) {
                tempid = u;
                break;
            }
        }
        var array = Object.values(people[tempid][4])[0];
        if (!array.includes(idinput)) {
            array.push(idinput);
            people[tempid][4] = {"polycules":array};
        }
    }
    for (let i = 0; i < polycules.length; i++) {
        if (Object.values(polycules[i][0])[0] == idinput) {
            tempid = i;
            break;
        }
    }
    polycules[tempid] = [{"id":idinput},{"name":nameinput}];
    closeEditor();
}