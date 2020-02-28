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

  //Uploading data to the database


  //Reference form collection
  var messagesRef = firebase.database().ref('messages');

  //Listen for form submit
  document.getElementById("upload-form").addEventListener('submit', submitForm);

  //Submit form
  function submitForm(e)
  {
    e.preventDefault();
    console.log(123)
  
    // Get values
    var product = getInputVal("product");
    var desc = getInputVal("description");
    var price = getInputVal("price");
    

    console.log(product, desc, price + "On click\n");
    saveMessage(product, desc, price)
  };

  function getInputVal(id)
  {
    return document.getElementById(id).value;
  };

  

  //Save data to firebase
  function saveMessage(product, desc, price){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      product: product,
      desc: desc,
      price: price
    });
  }
  

  function getMessage(){
    messagesRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      }
      else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }