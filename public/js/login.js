var provider = new firebase.auth.GoogleAuthProvider();
var success  = document.getElementById("success");
var userName = "";
function authenticateUser(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user.displayName);
        var string1 = String(user.displayName);
        userName = String(user.displayName);
        console.log(string1);
        success.textContent = "Hello" + string1;
        f();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

   
}

function f(){
  console.log("FROM OUTSIDE "+userName); }