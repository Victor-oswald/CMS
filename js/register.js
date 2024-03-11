document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('togglePassword').addEventListener('click', function (e) {
    if (password.type === "password") {
      password.type = "text";
      this.textContent = "Hide";
    } else {
      password.type = "password";
      this.textContent = "Show";
    }
  });

  let password = document.getElementById('myPassword');

  let weak_password = "";
  let medium_password = "";
  let strong_password = "";

  password.addEventListener('input', function () {
    let passwordInput = this.value;
    console.log(passwordInput);
    var strengthBar = document.getElementById('password-strength');
    var passwordStrength = '';

    if (passwordInput.length == 0 || passwordInput.length < 8) {
      passwordStrength = 'weak';
      weak_password = passwordStrength;
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordInput)) {
      passwordStrength = 'strong';
      strong_password = passwordStrength;
    } else {
      passwordStrength = 'medium';
      medium_password = passwordStrength;
    }

    strengthBar.className = 'strength-bar ' + passwordStrength;
    strengthBar.style.display = passwordInput.length > 0 ? 'block' : 'none';
  });
  let confirmPassword = document.getElementById('confirm');
  let firstName = document.getElementById('firstName');
  let lastName = document.getElementById('lastName');
  const form = document.getElementById('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!checkInputs()) {
      alert('Please fill in all fields before submitting.');
      return false;
    }

    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match');
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(firstName.value) || !/^[a-zA-Z]+$/.test(lastName.value)) {
      alert('First name and last name should not contain whitespaces or special characters');
      return false;
    }

    if (weak_password) {
      form.querySelector('#password_wrap').style.border = '1px solid red';
      form.querySelector('#password_warn').textContent = 'Your password is too weak, we recommend a stronger password';
      return false;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('../API/auth/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Registration successful');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed');
      });
  });
});

function checkInputs() {
  let myForm = document.getElementById('form');

  function checkForEmptyFieldsAndApplyRedBorder() {
    let allInputs = myForm.querySelectorAll('input');
    let hasEmptyField = false;

    allInputs.forEach(input => {
      if (input.value === "") {
        let parentDiv = input.parentElement;
        parentDiv.style.border = "1px solid red";
        hasEmptyField = true;
      } else {
        let parentDiv = input.parentElement;
        parentDiv.style.border = "";
      }
    });

    return !hasEmptyField;
  }
  myForm.addEventListener('input', checkForEmptyFieldsAndApplyRedBorder);

  return checkForEmptyFieldsAndApplyRedBorder();

}
