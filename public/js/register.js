document.addEventListener('submit', async (event) => {
  if (event.target.id === 'registerForm') {
    event.preventDefault();

    const { name, email, password } = event.target;

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,

      }),
    });

    const result = await response.json();

    if (result.status === true) {
      window.location.href = '/';
    }

    if (result.status === 'nameLengthFail') {
      const emailInput = document.getElementById('exampleInputName');
      emailInput.value = null;
      emailInput.placeholder = 'Введите логин';
      emailInput.style.borderColor = 'red';

      emailInput.onfocus = function () {
        emailInput.placeholder = '';
        emailInput.style.borderColor = '#ced4da';
      };
    }

    if (result.status === 'emailLengthFail') {
      const emailInput = document.getElementById('exampleInputEmail1');
      emailInput.value = null;
      emailInput.placeholder = 'Введите почту';
      emailInput.style.borderColor = 'red';

      emailInput.onfocus = function () {
        emailInput.placeholder = '';
        emailInput.style.borderColor = '#ced4da';
      };
    }

    if (result.status === 'passFail') {
      const passInput = document.getElementById('exampleInputPassword1');
      passInput.value = null;
      passInput.placeholder = 'Введите пароль';
      passInput.style.borderColor = 'red';

      passInput.onfocus = function () {
        passInput.placeholder = '';
        passInput.style.borderColor = '#ced4da';
      };
    }

    if (result.status === 'emailFail') {
      const emailInput = document.getElementById('exampleInputEmail1');
      emailInput.value = null;
      emailInput.placeholder = 'Почта уже используется';
      emailInput.style.borderColor = 'red';

      emailInput.onfocus = function () {
        emailInput.placeholder = '';
        emailInput.style.borderColor = '#ced4da';
      };
    }
  }
});

document.addEventListener('click', async (event) => {
  if (event.target.id === 'registerBtn') {
    event.preventDefault();

    const response = await fetch('/register');

    const result = await response.text();

    const main = document.getElementById('main');

    main.innerHTML = '';

    main.innerHTML += result;
  }
});
