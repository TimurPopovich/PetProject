let array = [];
let arrayMainTrand = [];

async function spokenLanguageFunc() {

  const response = await fetch('https://api.trending-github.com/github/spoken-languages');

  const result = await response.json();

  array = [...result]

  const autoCompleteJS1 = new autoComplete({
    placeHolder: "Выберите свой язык...",
    data: {
      src: result,
      cache: true,
      keys: ['language'],
    },
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Создание элемента нет результатов
          const message = document.createElement("div");
          // Добавление к нему класса
          message.setAttribute("class", "no_result");
          // Добавляем текстовое сообщение
          message.innerHTML = `<span> Не найдено соответствий для "${data.query}"</span>`;
          // Добавляем в лист результатов
          list.prepend(message);
        }
      },
      noResults: true,
      tabSelect: true,
    },
    resultItem: {
      highlight: true,
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS1.input.value.length) {
            autoCompleteJS1.start()
          };
        }
      }
    }
  });

  autoCompleteJS1.input.addEventListener("selection", function (event) {
    const feedback = event.detail;

    autoCompleteJS1.input.blur();

    const selection = feedback.selection.value[feedback.selection.key];

    autoCompleteJS1.input.value = selection;
  });

  const autoCompleteJS3 = new autoComplete({
    placeHolder: "Выберите дни поиска...",
    data: {
      src: ['daily', 'weekly', 'monthly'],
      cache: true,
    },
    selector: "#autoComplete3",
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Create "No Results" message element
          const message = document.createElement("div");
          // Add class to the created element
          message.setAttribute("class", "no_result");
          // Add message text content
          message.innerHTML = `<span> Не найдено соответствий для "${data.query}"</span>`;
          // Append message element to the results list
          list.prepend(message);
        }
      },
      noResults: true,
      tabSelect: true,
    },
    resultItem: {
      highlight: true
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS3.input.value.length) {

            autoCompleteJS3.start()
          };
        }
      }
    }
  });

  autoCompleteJS3.input.addEventListener("selection", function (event) {
    const feedback = event.detail;

    autoCompleteJS3.input.blur();

    const selection = feedback.selection.value;

    autoCompleteJS3.input.value = selection;
  });

}

async function languagePrograming() {

  const response = await fetch('https://api.trending-github.com/github/languages');

  const result = await response.json();

  const autoCompleteJS2 = new autoComplete({
    placeHolder: "Выберите свой язык программирования...",
    data: {
      src: result,
      cache: true,
    },
    selector: "#autoComplete2",
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Create "No Results" message element
          const message = document.createElement("div");
          // Add class to the created element
          message.setAttribute("class", "no_result");
          // Add message text content
          message.innerHTML = `<span> Не найдено соответствий для "${data.query}"</span>`;
          // Append message element to the results list
          list.prepend(message);
        }
      },
      noResults: true,
      tabSelect: true,
    },
    resultItem: {
      highlight: true
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS2.input.value.length) {
            autoCompleteJS2.start()
          };
        }
      }
    }
  });

  autoCompleteJS2.input.addEventListener("selection", function (event) {
    const feedback = event.detail;

    autoCompleteJS2.input.blur();

    const selection = feedback.selection.value;

    autoCompleteJS2.input.value = selection;
  });

}

async function findRepositories(languagePrograming = 'JavaScript', period = 'deily', spokenLanguage = 'ru') {

  const path = `language=${languagePrograming}&period=${period}&spokenLanguage=${spokenLanguage}`

  const containerCard = document.getElementById('containerCard');
  containerCard.innerHTML = ''
  containerCard.innerHTML +=
    `
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    `
  const response = await fetch(`https://api.trending-github.com/github/repositories?${path}`);

  const result = await response.json();



  if (result.length === 0) {
    containerCard.innerHTML = ''
    containerCard.innerHTML += '<h1>Информация не найдена</h1>'
  } else {

    containerCard.innerHTML = ''

    result.forEach((el) => {
      if (!el.language) { el.language = 'No language related' }
      else { el.language = 'Developped in ' + el.language }
      containerCard.innerHTML +=
        `
        <div data-link="${el.url}" class="Onecard">
        
          <div>
            <div data-link="${el.url}" class="cardHeader">${el.name}</div>
            <div data-link="${el.url}" class="cardNick">${el.author}</div>
            <div data-link="${el.url}" class="cardBody"><img src="${el.avatar}" class="uiImg">${el.description}</div>
          </div>
  
          <div data-link="${el.url}" class="cardFooter">
            <p>
            ${el.stars}
            <i class="iconStar">⭐</i>
            ${el.forks}
            <i>🔗</i><br>
            ${el.language}

          <button id="btnAdd" class="btn btn-danger">В Избранное</button>

          </p>
          </div>
  
        </div>
        `
    })
  }

}

async function mainTrand() {
  if (document.getElementById('containerCard')) {
    const containerCard = document.getElementById('containerCard');
    containerCard.innerHTML = ''
    containerCard.innerHTML +=
      `
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-secondary" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-danger" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-warning" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    `

    const response = await fetch(`https://api.trending-github.com/github/repositories?language=&period=&spokenLanguage=`);

    const result = await response.json();

    arrayMainTrand = [...result];

    containerCard.innerHTML = ''

    result.forEach((el) => {
      if (!el.language) { el.language = 'No language related' }
      else { el.language = 'Developped in ' + el.language }
      containerCard.innerHTML +=
        `
      <div data-link="${el.url}" class="Onecard">
      
        <div>
          <div data-link="${el.url}" class="cardHeader">${el.name}</div>
          <div data-link="${el.url}" class="cardNick">${el.author}</div>
          <div data-link="${el.url}" class="cardBody"><img src="${el.avatar}" class="uiImg">${el.description}</div>
        </div>

        <div data-link="${el.url}" class="cardFooter">
          <p>
          ${el.stars}
          <i class="iconStar">⭐</i>
          ${el.forks}
          <i>🔗</i><br>
          ${el.language}

          <button id="btnAdd" class="btn btn-danger">В Избранное</button>
          
          </p>
        </div>

      </div>
      `
    })
  }
}

document.addEventListener('click', async (event) => {
  if (event.target.className === 'Onecard' || event.target.className === 'cardFooter' || event.target.className === 'cardHeader') {
    event.preventDefault();
    window.open(event.target.dataset.link)
  }
  if (event.target.className === 'cardBody') {
    event.preventDefault();
    window.open(event.target.dataset.link)
  }
  if (event.target.id === 'btnAdd') {
    event.preventDefault();

    const link = event.target.parentNode.parentNode.dataset.link;

    const findPost = arrayMainTrand.filter(el => el = el.url === link)

    const response = await fetch('/profile/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rep: findPost[0]
      })
    })
  }
  if (event.target.id === 'btnDelete') {
    event.preventDefault();

    const link = event.target.parentNode.parentNode.dataset.link;

    const response = await fetch('/profile/card', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rep: link
      })
    })

    const result = await response.json();

    if (result.status === true) {
      event.target.parentNode.parentNode.parentNode.remove()
    }

  }
})

document.addEventListener('submit', (event) => {

  if (event.target.id === 'searchForm') {
    event.preventDefault();

    let spokenLanguageSymbol = event.target[0].value[0]?.toUpperCase() + event.target[0].value.slice(1);

    if (spokenLanguageSymbol === undefined) { spokenLanguageSymbol = 'Russian'; }

    const newArray = array.filter(el => el.language === spokenLanguageSymbol);

    let spokenLanguage = 'ru';

    if (newArray.length !== 0) {

      spokenLanguage = newArray[0].code

    }

    let languagePrograming = event.target[1].value

    let period = event.target[2].value;

    if (event.target[2].value === '') {

      period = 'deily'

    }

    if (event.target[1].value === 'C++') {

      languagePrograming = 'C'

    } else if (event.target[1].value === '') {

      languagePrograming = 'JavaScript'

    }

    findRepositories(languagePrograming, period, spokenLanguage)

  }

})

mainTrand();

languagePrograming();

spokenLanguageFunc();



