document.addEventListener('submit', async (event) => {
  if (event.target.id === 'loginForm') {
    event.preventDefault();
    const { email, password } = event.target;

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const result = await response.json();

    if (result.status === true) {

      window.location.href = '/';
    }

    if (result.status === 'passFail') {
      const inputPass = document.getElementById('exampleInputPassword1');
      inputPass.value = null;
      inputPass.placeholder = 'Не верный пароль';
      inputPass.style.borderColor = 'red';

      inputPass.onfocus = function () {
        inputPass.placeholder = '';
        inputPass.style.borderColor = '#ced4da';
      };
    }

    if (result.status === 'emailFail') {
      const inputEmail = document.getElementById('exampleInputEmail1');
      inputEmail.value = null;
      inputEmail.placeholder = 'Пользователь не найден';
      inputEmail.style.borderColor = 'red';

      inputEmail.onfocus = function () {
        inputEmail.placeholder = '';
        inputEmail.style.borderColor = '#ced4da';
      };
    }
  }
});

document.addEventListener('click', async (event) => {
  if (event.target.id === 'loginBtn') {
    event.preventDefault();

    const response = await fetch('/login');

    const result = await response.text();

    const main = document.getElementById('main');

    main.innerHTML = '';

    main.innerHTML += result;
  }
});
