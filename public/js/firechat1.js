var myName = "";
var provider = new firebase.auth.GoogleAuthProvider();

function authenticateUser() {
	document.getElementById("message").disabled = false;
	firebase.auth().signInWithPopup(provider).then(function (result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
		console.log(result.user)
		myName = String(result.user.displayName);
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		prompt("You must Sign In to Chat");
	});
}

function sendMessage() {
	// get message
	var message = document.getElementById("message").value;

	firebase.database().ref("messages").push().set({
		"sender": myName,
		"message": message
	})

	// save in database


	// prevent form from submitting
	return false;
}


// listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
	var html = "";
	// give each message a unique ID
	html += "<li id='message-" + snapshot.key + "' class='list-group-item'>";
	// show delete button if message is sent by me
	if (snapshot.val().sender == myName) {
		html += "<button data-id='" + snapshot.key + "' type='button' class='btn btn-warning' onclick='deleteMessage(this);'>";
		html += "Delete";
		html += "</button>";
	}
	html += snapshot.val().sender + ": " + snapshot.val().message;
	html += "</li>";

	document.getElementById("messages").innerHTML += html;
});

function deleteMessage(self) {
	// get message ID

	var messageId = self.getAttribute("data-id");

	// delete message
	firebase.database().ref("messages").child(messageId).remove();
}

// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
	// remove message node
	document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
});