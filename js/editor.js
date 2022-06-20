const personEditor = '<div class="editor" id="editor"><div><h3>Edit Person</h3><table class="editortable"><tr><th>Basic Information</th><th>Systems</th><th>Polycules</th><th>Partners</th></tr><tr><td><p>ID:</p><p><input class="new-input" id="edit-id" readonly></p><p>Name:</p><p><input placeholder="Name" class="new-input" id="edit-name"></p><p>Pronouns:</p><p><input placeholder="Pronouns" class="new-input" id="edit-pronouns"></p><p>Time Zone:</p><p><input placeholder="Time Zone" class="new-input" id="edit-timezone"></p><p>Twitter:</p><p><input placeholder="Twitter" class="new-input" id="edit-twitter"></p><p><button onclick="updatePerson()" id="updateperson">Update</button><button class="buttongray" onclick="closeEditor()">Cancel</button></p></td><td id="editor-systems"></td><td id="editor-polycules"></td><td id="editor-partners"></td></tr></table></div></div>';
const systemEditor = '<div class="editor" id="editor"><div><h3>Edit System</h3><table class="editortable"><tr><th>Basic Information</th><th>Members</th></tr><tr><td><p>ID:</p><p><input class="new-input" id="edit-id" readonly></p><p>Name:</p><p><input placeholder="Name" class="new-input" id="edit-name"></p><p><button onclick="updateSystem()" id="updatesystem">Update</button><button class="buttongray" onclick="closeEditor()">Cancel</button></p></td><td id="editor-members"></td></tr></table></div></div>';
const polyculeEditor = '<div class="editor" id="editor"><div><h3>Edit Polycule</h3><table class="editortable"><tr><th>Basic Information</th><th>Members</th></tr><tr><td><p>ID:</p><p><input class="new-input" id="edit-id" readonly></p><p>Name:</p><p><input placeholder="Name" class="new-input" id="edit-name"></p><p><button onclick="updatePolycule()" id="updatepolycule">Update</button><button class="buttongray" onclick="closeEditor()">Cancel</button></p></td><td id="editor-members"></td></tr></table></div></div>';