// botao menu
const btnMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay-menu");

btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
});

menu.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
});

// overlay.addEventListener("click", () => {
//   menu.classList.remove("abrir-menu");
// });

// tema claro/escuro

const chk = document.getElementById("chk");

function toggleCleanmode(){
  document.body.classList.toggle("clean");
}

function loadTheme(){
  const cleanMode = localStorage.getItem('clean')
  if(cleanMode){
    toggleCleanmode();
  }
}

loadTheme();

chk.addEventListener("change", () => {
  toggleCleanmode();


  localStorage.removeItem('clean')

  if(document.body.classList.contains('clean')){
    localStorage.setItem('clean',1)
  }
});

// Envio de formulario 

const formE1 = document.getElementById('form-api');

formE1.addEventListener('submit', evento => {
  evento.preventDefault();
  
  const formDados = new FormData(formE1);
  const data = Object.fromEntries(formDados.entries());

  fetch('https://api.staticforms.xyz/submit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao enviar o formulário');
    }
  }).then(data => {
    console.log('Formulário enviado com sucesso:', data);
    window.location.href = '../pages/obrigado.html';
  }).catch(error => {
    console.error('Erro:', error);
  });
});