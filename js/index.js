var firebaseConfig = {
    apiKey: "AIzaSyDH_k25acA622jH3S_HxzqyLSym85agfNc",
    authDomain: "owo-renting-cool-clothes.firebaseapp.com",
    databaseURL: "https://owo-renting-cool-clothes.firebaseio.com",
    projectId: "owo-renting-cool-clothes",
    storageBucket: "owo-renting-cool-clothes.appspot.com",
    messagingSenderId: "339454110783",
    appId: "1:339454110783:web:e7be0af48ad9b96ec49c8a",
    measurementId: "G-D8P82MD44C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if (email != "" && password != "")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
      }
      else 
      {
        window.alert("Please fill out all fields.");
      }

  });
  $("#logout").click(function()
  {
    firebase.auth().signOut();
  });