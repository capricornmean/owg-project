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
        firebase.auth().signInWithEmailAndPassword(email,password).then(authUser => {
          if(authUser.user.emailVerified){
            window.location.href = "htmlCss/home_page.html";  
          }else{
            window.alert("Your email is not verified. Please verify before using.")
            firebase.auth().signOut();
            window.location.href = "signin.html";
          }
        }).catch(function(error)
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
  
    var product = getInputVal("product");
    var desc = getInputVal("description");
    var price = getInputVal("price");
    var image = document.getElementById("selected-image").src;
    
    console.log(product, desc, price, image + "On click\n");
    saveMessage(product, desc, price,image)
  };

  function getInputVal(id)
  {
    return document.getElementById(id).value;
  };

  //Save data to firebase
  function saveMessage(product, desc, price, image){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      product: product,
      desc: desc,
      price: price,
      image: image
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
      var curMessage = snapshot.val();

      var image = document.createElement("img");
      image.setAttribute("src", curMessage.image);
      image.setAttribute("width", "100%");

      var card = document.createElement('div');
      card.setAttribute("class", "card");
      var h1 = document.createElement('h1');
      var a1 = document.createElement('a');
      a1.setAttribute('href', 'product_view.html')
      a1.appendChild(document.createTextNode(curMessage.product));
      h1.appendChild(a1)

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

  function getUserInfo(){
    var profile = document.getElementById('profile');
    var user = firebase.auth().currentUser;
    console.log(user);
    var userID = user.uid;
    console.log(userID);
    var userRef = firebase.database().ref("User/" + userID);
    console.log(userRef);

    userRef.once('value').then(function(snapshot) {
      var curUser = snapshot.val();
      console.log(curUser);

      var fullName = document.createElement("h1");
      fullName.appendChild(document.createTextNode(curUser.firstName + " " + curUser.lastName));

      var email = document.createElement("h2");
      email.appendChild(document.createTextNode(user.email));

      var phone = document.createElement("h2");
      phone.appendChild(document.createTextNode(curUser.phone));

      /*var bio = document.createTextNode("p");
      bio.appendChild(document.createTextNode(curUser.bio));*/

      profile.appendChild(fullName);
      profile.appendChild(email);
      profile.appendChild(phone);
      //profile.appendChild(bio);
    })  
  }
  

  