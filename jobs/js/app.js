var app = new Framework7({
    material: true
});
var $ = Dom7;

// Auth
// Register
$('.button-signup').on('click', function () {
    var email = $('.popup-auth input[name="email"]').val();
    var password = $('.popup-auth input[name="password"]').val();
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            function(value) {
                console.log(value);
            },
            function(error) {
               // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              app.alert(errorMessage);
            }
        );
});
// Log In
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('Logged In', user);
  } else {
    // No user is signed in.
  }
});