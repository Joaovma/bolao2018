
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

function firebaseSignOut() {
	firebase.auth().signOut();
}