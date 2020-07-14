/**
 * ON RECUPERE LES ELEMENTS
 */
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("#input");

form.addEventListener("submit", function (e) {
  // * On recupère les infos du form
  e.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = []; // Creation d'un objet vide pour accueillir les todos, check, et l'autorisation de modification

const displayTodo = () => {
  // Fonction d'affichage de la todo
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index); // Si l'edition est true alors on active le champ de modification
    } else {
      return createTodoElement(todo, index); // Sinon on affiche la todo (modifier ou pas)
    }
  });
  ul.innerHTML = ""; // On vide la liste
  ul.append(...todosNode); // On remplis la list avec un tableau des todos
};

/**
 * * Fonction pour créer input de la todo
 * @param {*} todo
 * @param {*} index
 */
const createTodoElement = (todo, index) => {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const btnDelete = document.createElement("button");
  const btnModify = document.createElement("button");
  btnModify.classList.add("btn", "btn-warning");
  btnDelete.classList.add("btn", "btn-danger");
  div.classList.add("form-check", "input-group", "align-items-center");
  li.classList.add("flex-grow-1", "p-2");

  btnDelete.addEventListener("click", (e) => {
    // * Evenement pour supprimer la todo
    event.stopPropagation();
    deleteTodo(index);
  });
  btnModify.addEventListener("click", (e) => {
    // * Evenement pour modifier la todo
    event.stopPropagation();
    editTodoMode(index);
  });

  btnModify.innerHTML = "Modifier";
  btnDelete.innerHTML = "Supprimer";

  li.appendChild(div);

  div.innerHTML = ` 

            <input class="form-check-input" type="checkbox" " ${
              todo.done ? "checked" : ""
            }>
            <label class="form-check-label p-2 flex-grow-1" ">
                ${todo.text}
            </label>
            
    `;
  div.addEventListener("click", (e) => {
    toggleTodo(index);
  });
  div.append(btnModify, btnDelete);

  return li;
};

/**
 * * Fonction d'edition de la todo
 * @param {*} todo
 * @param {*} index
 */
const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const div = document.createElement("div");
  const buttonSave = document.createElement("button");
  const buttonCancel = document.createElement("button");

  div.classList.add("input-group");
  input.type = "text";
  input.value = todo.text;
  input.classList.add("form-control");
  buttonSave.innerHTML = "Valider";
  buttonCancel.innerHTML = "Annuler";
  buttonSave.classList.add("btn", "btn-warning");
  buttonCancel.classList.add("btn", "btn-danger");

  buttonCancel.addEventListener("click", (e) => {
    // Evenement d'annulation de modification de la todos
    e.stopPropagation();
    editTodoMode(index);
  });
  buttonSave.addEventListener("click", (e) => {
    // Evenement de modification de la todos
    editTodo(index, input);
  });
  li.appendChild(div);
  div.append(input, buttonCancel, buttonSave);
  return li;
};

/**
 * * Fonction d'ajout de la todo a l'objet
 * @param {*} text
 */
const addTodo = (text) => {
  if (text.length < 2) {
    alert("Le champ doit contenir 2 caractères minimum");
  } else {
    todos.push({
      text,
      done: false,
    });
  }
  displayTodo();
};

/**
 * * Fonction de suppression de la todo
 * @param {*} index
 */
const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

/**
 * * Fonction d'annulation de modification de la todo
 * @param {*} index
 */
const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

/**
 * * Fonction d'autorisation d'activation du mode d'edition
 * @param {*} index
 */
const editTodoMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

/**
 * * Fonction d'edition de la todo
 * @param {*} index
 * @param {*} input
 */
const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};
