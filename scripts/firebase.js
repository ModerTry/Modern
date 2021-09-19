const firebaseConfig = {
    apiKey: "AIzaSyAg8cCPSi7gkT52_OEPRvpUQScDgwPpLqg",
    authDomain: "themodernacademy-39281.firebaseapp.com",
    projectId: "themodernacademy-39281",
    storageBucket: "themodernacademy-39281.appspot.com",
    messagingSenderId: "408477873165",
    appId: "1:408477873165:web:f1e6de22f1b51f8395d144",
    measurementId: "G-4MHR6EWZGB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // Initialize variables
  const auth=firebase.auth()
  const database=firebase.database()
  //Set up our register Function
  function register(){
      //Get all our input fields
      form = document.getElementById('form').value;
      username = document.getElementById('username').value;
      email = document.getElementById('email').value;
      password = document.getElementById('password').value;
     password2 = document.getElementById('password2').value;
  }
  
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser
     // Add this user to Firebase Database
     var database_ref = database.ref()

     // Create User data
     var user_data = {
        username: username,
        email:email,
        password:password,
        password2:password2,
      last_login : Date.now()
    }
 
     // Push to Firebase Database
     database_ref.child('users/' + user.uid).set(user_data)
 
     // DOne
     alert('User Created!!')
   })
   .catch(function(error) {
     // Firebase will use this to alert of its errors
     var error_code = error.code
     var error_message = error.message
 
     alert(error_message)
   })
 
 // Set up our login function
 function login () {
   // Get all our input fields
   email = document.getElementById('email').value
   password = document.getElementById('password').value
 
   // Validate input fields
   if (validate_email(email) == false || validate_password(password) == false) {
     alert('Email or Password is Outta Line!!')
     return
     // Don't continue running the code
   }
 
   auth.signInWithEmailAndPassword(email, password)
   .then(function() {
     // Declare user variable
     var user = auth.currentUser
 
     // Add this user to Firebase Database
     var database_ref = database.ref()
 
     // Create User data
     var user_data = {
       last_login : Date.now()
     }
 
     // Push to Firebase Database
     database_ref.child('users/' + user.uid).update(user_data)
 
     // DOne
     alert('User Logged In!!')
 
   })
   .catch(function(error) {
     // Firebase will use this to alert of its errors
     var error_code = error.code
     var error_message = error.message
 
     alert(error_message)
   })
 }
 
 
 
 
 // Validate Functions
 function validate_email(email) {
   expression = /^[^@]+@\w+(\.\w+)+\w$/
   if (expression.test(email) == true) {
     // Email is good
     return true
   } else {
     // Email is not good
     return false
   }
 }
 
 function validate_password(password) {
   // Firebase only accepts lengths greater than 6
   if (password < 6) {
     return false
   } else {
     return true
   }
 }
 
 function validate_field(field) {
   if (field == null) {
     return false
   }
 
   if (field.length <= 0) {
     return false
   } else {
     return true
   }
 }