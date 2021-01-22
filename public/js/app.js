
var db = firebase.firestore();

    var table1 = document.getElementById("highScoreTable");
var lastRow  = table1.rows.length ;
console.log(lastRow);
var docRef = db.collection("user_highScore");
docRef.orderBy("highScore","desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data())
        var row = table1.insertRow(lastRow);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        
        cell1.innerHTML = String(lastRow);
        cell2.innerHTML = String(doc.data().userName);
        cell3.innerHTML = String(doc.data().highScore);
        lastRow+=1;
    });
});

