
// Initialize Firebase
var config = {
	apiKey: "AIzaSyD-b-FKQceXUbjFCh3XSkaqW1OV5ZZh-PM",
	authDomain: "bolao2018copadomundo.firebaseapp.com",
	databaseURL: "https://bolao2018copadomundo.firebaseio.com",
	projectId: "bolao2018copadomundo"
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
    	if (window.location.pathname != '/index.html' && window.location.pathname != '/') {
    		window.location = 'index.html';
    	}
    }
});

var databaseBolao = firebase.database();

function firebaseSignOut() {
	firebase.auth().signOut();
}

function firebaseGetUserData(){
	return new Promise (function (resolve, reject){
		firebase.auth().onAuthStateChanged(function (user){
			const UID = user.uid;
			databaseBolao.ref('usuarios/'+ UID).once('value', function(snap){
				resolve(snap.val());
			}, function (errorObject) {
				console.error("CAGOU A PORRA TODA - Read failed" + errorObject);
				reject(errorObject);
			});
		}); 
		
	});
}