document.addEventListener('click', async (event) => {
  if (event.target.id === 'editProfileBtn') {
    event.preventDefault();

    const response = await fetch('/profile/add');

    const result = await response.text();

    const editProfileBtn = document.getElementById('editProfileBtn');

    editProfileBtn.remove();

    document.getElementById('profileUser').innerHTML += result;
  }

  if (event.target.id === 'newDataPerson') {
    event.preventDefault();

    const { name, email, password } = event.target.parentNode;
    const response = await fetch('/login', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const result = await response.text();

    if (result === 'false') {
      const inputEmail = document.getElementById('exampleInputEmail1');
      inputEmail.value = null;
      inputEmail.placeholder = 'Такая почта существует';
      inputEmail.style.borderColor = 'red';

      inputEmail.onfocus = function () {
        inputEmail.placeholder = '';
        inputEmail.style.borderColor = '#ced4da';
      };
    } else {
      const main = document.getElementById('main');

      const divProfileUser = document.getElementById('profileUser');

      divProfileUser.remove();

      main.innerHTML += result;

      document.getElementById('nameUser').innerText = `${name.value}`
    }
  }
});
