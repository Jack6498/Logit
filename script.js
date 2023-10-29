//Startup code
document.getElementById('create_acc').style.display = 'none';
document.getElementById('log_in').style.display = 'flex'
const form = document.getElementById('SUFORM');
//Add new user to data base
//Broken i think

var options = [
  document.getElementById('parent'),
  document.getElementById('teacher'),
  document.getElementById('admin')
];

function update(element) {
  var ele = document.getElementById(element.id);
  //set all values except one selected to false
  options.forEach((choice) => {
    choice.setAttribute('value', 'false');
    choice.classList.remove('selected');

  });
  ele.setAttribute('value', 'true');
  ele.classList.add('selected');

}

function ProcessSignUp() {
  //where I put my php function
  var password = document.getElementById('newPassword').value;
  var confirmation = document.getElementById('confirmPassword').value;
  var email = document.getElementById('newEmail').value;
  var fullName = document.getElementById('fullName').value;
  var type1;
  //get the type of user
  options.forEach((choice) => {
    if (choice.getAttribute('value') == 'true') {
      type1 = choice.id;
    }
  })
  if (password == confirmation) {
    if (checkInput(password, type1)) {
      //post to server (uses JQuery)

      $.ajax({
        type: "POST",
        url: "phpFunctions/submitLoginCreds.php",
        data: {
          email: email,
          fullName: fullName,
          password: password,
          type1: type1
        },
        success: function (data) {
          console.log(data);
          if (data == 'true ') {
            window.location.href = "Dashboard/dashboard.html";
            sessionStorage.setItem("username", fullName);
          }

        },
        error: function (xhr, status, error) {
          console.error(xhr);
        }
      });
    }
  } else {
    alert("Passwords must match");
  }
}
function ProcessLogin() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	$.ajax({
		type:"POST",
		url: "phpFunctions/checkLoginCreds.php",
		data:{
			email: email,
			password: password
		},
		success: function (data) {
			if (data != 'false'){
        
        var arr = data.split(",");
        arr.forEach(ele => {
          console.log(ele);
        });
        sessionStorage.setItem("username", arr[0]);
        sessionStorage.setItem("type", arr[1]);
        window.location.href = "Dashboard/dashboard.html";
			}else{
        console.log(data);
				window.location.href = "index.html";
			}
		}
	})


}


function checkInput(inputText, type) {
  // Create an empty array to store the error messages.
  const errors = [];

  //Make sure an account type has been selected
  if (type == "") {
    errors.push("Did not choose account type");
    alert("Pick an account type. [Parent, Teacher, Admin]");
  }
  // Check the length of the input text.
  if (inputText.length < 8) {
    errors.push("The input text must be at least 8 characters long.");
    alert("The input text must be at least 8 characters long.");
  }

  // Check if the input text contains a capital letter.
  const hasCapitalLetter = /[A-Z]/.test(inputText);
  if (!hasCapitalLetter) {
    errors.push("The input text must contain at least 1 capital letter.");
    alert("The input text must contain at least 1 capital letter.");
  }

  // Check if the input text contains a symbol.
  const hasSymbol = /[!@#$%^&*]/.test(inputText);
  if (!hasSymbol) {
    errors.push("The input text must contain at least 1 symbol.");
    alert("The input text must contain at least 1 symbol.");
  }

  // Check if the input text contains a number.
  const hasNumber = /[0-9]/.test(inputText);
  if (!hasNumber) {
    errors.push("The input text must contain at least 1 number.");
    alert("The input text must contain at least 1 number.");
  }

  // Return true if there are no errors, otherwise return false.
  return errors.length === 0;
}

//open the signup page
const Sign_Up_Button = document.getElementById('load_create_acc');
Sign_Up_Button.addEventListener('click', () => {
  document.getElementById('log_in').style.display = 'none'
  document.getElementById('create_acc').style.display = 'flex';
});

//open signin page
const Sign_In_Button = document.getElementById('load_log_in');
Sign_In_Button.addEventListener('click', () => {
  document.getElementById('log_in').style.display = 'flex'
  document.getElementById('create_acc').style.display = 'none';
});
