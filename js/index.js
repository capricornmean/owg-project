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

  $("#btn-resetPassword").click(function()
  {
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") 
    {
      var reset = auth.sendPasswordResetEmail(email).then(function() 
      {
        window.alert("An email has been sent to you. Please check and verify.");
      });
      reset.catch(function(error) 
      {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message : " + errorMessage);
      })
    }
    else{
      window.alert("Please write your email first.");
    }
  });

  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmPassword").val();

      if (email != "" && password != "" && password != "")
      {
        if (password == cPassword) 
        {
          var result = firebase.auth().createUserWithEmailAndPassword(email,password);

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
          window.alert("Password does not match with the Confirm Password.");
        }
      }
      else 
      {
        window.alert("Form is incomplete. Please fill out all fields.");
      }

  });

  $("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("User");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (fName !="" && lName !="" && country!="" && gender!="" && bio!="" && address!="" && phone!="") 
    {
      var userData = 
      {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName": fName,
        "lastName" : lName,
        "country": country,
        "gender": gender
      };

      usersRef.set(userData, function(error)
      {
        if (error)
        {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message : " + errorMessage);
        }
        else
        {
          window.location.href = "htmlCss/home_page.html";
        }
      });
    }

    else
    {
      window.alert("Please fill out all fields.")
    }
  });

  //Uploading data to the database
  //Reference form collection
  var messagesRef = firebase.database().ref('products');
  //Listen for form submit
  document.getElementById("upload-form").addEventListener('submit', submitForm);
  //Submit form
  function submitForm(e)
  {
    e.preventDefault();
    location.href = "home_page.html"
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
  
  function createth(name){
    return th;
  }

  function getMessage(){
    var tbl = document.getElementById('table-data');
    messagesRef.on("child_added", function(snapshot, prevChildKey) {
      var curMessage = snapshot.val();
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      td1.appendChild(document.createTextNode(curMessage.product));
      tr.appendChild(td1);
      var td2 = document.createElement('td');
      td2.appendChild(document.createTextNode(curMessage.desc));
      tr.appendChild(td2);
      var td3 = document.createElement('td');
      td3.appendChild(document.createTextNode(curMessage.price));
      tr.appendChild(td3);
      tbl.appendChild(tr);
    });
  }

  function getProduct(){
    var displayer = document.getElementById('display');
    messagesRef.on("child_added", function(snapshot, prevChildKey) {
      var image = document.createElement("img");
      image.setAttribute("src", "/images/IMG_7466_small.jpg");
      image.setAttribute("width", "100%");
      var curMessage = snapshot.val();
      var card = document.createElement('div');
      card.setAttribute("class", "card");
      var h1 = document.createElement('h1');
      h1.appendChild(document.createTextNode(curMessage.product));
      var description = document.createElement('p');
      description.appendChild(document.createTextNode(curMessage.desc));
      var price = document.createElement('p');
      price.setAttribute("class", "price");
      price.appendChild(document.createTextNode(curMessage.price));
      var button = document.createElement('button');
      button.innerHTML = "Add to Rent Cart";
      card.appendChild(image);
      card.appendChild(h1);
      card.appendChild(price);
      card.appendChild(description);
      card.appendChild(button);
      displayer.appendChild(card);
    });
  }