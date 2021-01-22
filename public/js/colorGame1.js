var db = firebase.firestore();
var playerName = "";
var highScore_frm_db = 0;
var score_written = true;
//var docRef = db.collection("user_highScore").doc(playerName);
var provider = new firebase.auth.GoogleAuthProvider();
var signInBTN = document.getElementById("signInBTN");
signInBTN.addEventListener("click",function(){
	authenticateUser()
});
function authenticateUser(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(result.user)
        playerName = String(result.user.displayName);
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
// docRef.get().then(function(doc) {
//     if (doc.exists) {
// 		console.log("Document data:", doc.data());
// 		highScore_frm_db = doc.data().highScore;
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

function update_Score(score,playerName){
	// Add a new document in collection "cities"
db.collection("user_highScore").doc(this.playerName).set({
    userName: playerName,
    highScore : score
},{ merge:true})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}








//var colors = [];
var numberOfSquares = 6;
var squares = document.querySelectorAll(".square");
var colors = generateRandomColors(numberOfSquares);
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
colorDisplay.textContent = pickedColor;




easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numberOfSquares = 3;
	colors = generateRandomColors(numberOfSquares);

	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor="steelblue";
})
hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numberOfSquares = 6;
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		//if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		//}
		//else {
			squares[i].style.display = "block";
		//}
	}
	h1.style.backgroundColor="steelblue";
})

resetButton.addEventListener("click" , function(){
	// alert("Button CLicked");
	//genrate all new colors
	score_written = true;
	messageDisplay.textContent = "";
	colors = generateRandomColors(numberOfSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change color display to match picked colors
	colorDisplay.textContent = pickedColor;
	//change colors
	this.textContent = "New Colors";
	
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
	h1.style.backgroundColor="steelblue";

})
for (var i = 0; i < colors.length; i++) {
	//add intital colors to sqaures
 	squares[i].style.backgroundColor =  colors[i];
 	//add click listener 
 	squares[i].addEventListener("click", function(){
 		//grab color of clicked square
 		var clickedColor = this.style.backgroundColor;
 		//compare color to picked color
 		if(clickedColor === pickedColor){
 			messageDisplay.textContent = "Correct";
 			changeColor(clickedColor);
 			h1.style.backgroundColor = clickedColor
			resetButton.textContent = "Play Again?";
			
			
			if(score_written === true){
				if(playerName === ""){
					alert("Sign In to Store Your Score ")
				}
				else{
					highScore_frm_db += 1;
					update_Score(highScore_frm_db,playerName);
					
				}
				
			}
			score_written = false;
			
 			
 		}
 		else{
 			this.style.backgroundColor = "steelblue";
 			messageDisplay.textContent = "Try Again";
 		}
 	});

}

function changeColor(color){
	//loop thru
	for (var i = 0; i < squares.length; i++) {
	 squares[i].style.backgroundColor = color;
	}
	//change each color to match given color
}
function pickColor(){
	var random = Math.floor((Math.random() * colors.length) );
	return colors[random];
}
function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num rnadom colors to array
	for (var i = 0; i < num; i++) {
		//get radom color and push in array
		arr.push(randomColor());
		
	}
	//return array
	return arr;
}
function randomColor(){
	//pick red 0 to 255
	var r = Math.floor(Math.random() * 256) 
	//pick green 0 to 255 
	var g = Math.floor(Math.random() * 256) 
	//pick blue 0 to 255 
	var b = Math.floor(Math.random() * 256) 
	return "rgb(" + r + ", " + g +", " + b + ")";
}
