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

// tema claro/escuro

const chk = document.getElementById("themeCheckbox");

function toggleCleanmode() {
  document.body.classList.toggle("clean");
}

function loadTheme() {
  const cleanMode = localStorage.getItem("clean");
  if (cleanMode) {
    toggleCleanmode();
  }
}

loadTheme();

chk.addEventListener("change", () => {
  toggleCleanmode();

  localStorage.removeItem("clean");

  if (document.body.classList.contains("clean")) {
    localStorage.setItem("clean", 1);
  }
});

// Envio de formulario

const formE1 = document.getElementById("form-api");

formE1.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const formDados = new FormData(formE1);
  const data = Object.fromEntries(formDados.entries());

  fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    })
    .then((data) => {
      console.log("Formulário enviado com sucesso:", data);
      window.location.href = "../pages/obrigado.html";
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});

// Exibir meu repositorio

const usernameInput = document.querySelector("#username-input");
const repoList = document.querySelector("#repo-list");
const searchButton = document.querySelector("#search-button");
const myRepoList = document.querySelector("#my-repo-list");

const myUsername = "francieli-alvarenga";

fetch(`https://api.github.com/users/${myUsername}/repos`)
  .then((response) => response.json())
  .then((repos) => {
    if (!Array.isArray(repos)) {
      console.error("repos is not an array");
      return;
    }

    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    for (const repo of repos) {
      const listItem = document.createElement("li");
      listItem.textContent = repo.name;
      myRepoList.appendChild(listItem);
    }
  })
  .catch((error) => console.error("Error:", error));

// exibir  outros repositorios

searchButton.addEventListener("click", function () {
  repoList.innerHTML = "";

  const username = usernameInput.value;

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repos) => {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      for (const repo of repos) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = repo.name;
        link.href = repo.html_url;
        link.target = "_blank";
        listItem.appendChild(link);
        repoList.appendChild(listItem);
      }
    })
    .catch((error) => console.error("Error:", error));
});
