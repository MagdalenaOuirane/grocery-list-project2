// addItems-container
const input = document.querySelector(".addItems-input");
const submitBtn = document.querySelector(".addItems-submit");
const addItemsAction = document.querySelector(".addItems-action");

// displayItems-container
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".displayItems-clear");
const displayItemsAction = document.querySelector(".displayItems-action");

const addItem = (e) => {
  e.preventDefault();
  console.log("submit");

  const newItem = input.value;
  console.log(newItem);

  const id = new Date().getTime().toString();
  console.log("Id:", id);

  if (newItem !== "") {
    const newDiv = document.createElement("div");
    console.log(newDiv);

    newDiv.classList.add("grocery-item");

    //add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    newDiv.setAttributeNode(attr);

    newDiv.innerHTML = `<h4 class="grocery-item__title">${newItem}</h4>
<a href="#" class="grocery-item__link">
    <i class="far fa-trash-alt"></i>
</a>`;

    const trashBtn = newDiv.querySelector(".grocery-item__link");
    console.log(trashBtn);

    // Add Event Listener
    trashBtn.addEventListener("click", removeDiv);

    groceryList.appendChild(newDiv);

    //displayAlert
    displayAlert(`${newItem} added to the list`);

    //add to local Storage
    addToLocalStorage(id, newItem);

    //set back to default
    setBackToDefault();
  } else {
    displayAlert("Please Add Grocery Item");
  }
};

// **********************************

function removeDiv(e) {
  console.log("click");

  const element = e.currentTarget.parentElement;
  const id = element.dataset.id;
  console.log(element);
  groceryList.removeChild(element);

  setBackToDefault();
  //remove from Local Storage
  removeFromLocalStorage(id);
}

function removeList(e) {
  console.log("click");

  groceryList.textContent = "";

  //remove from local Storage
  localStorage.removeItem("list");
  setBackToDefault();

  displayAlert("All Items deleted");
}

//set back to default
function setBackToDefault() {
  console.log("set back to default");
  input.value = "";
}

//display Alert

function displayAlert(text) {
  addItemsAction.textContent = text;
  displayItemsAction.textContent = text;

  if (input.value !== "") {
    addItemsAction.classList.add("success");
  } else if (input.value === "") {
    addItemsAction.classList.add("alert");
  } else if (groceryList.children.length === 0) {
    displayItemsAction.classList.add("alert");
  }

  setTimeout(function () {
    addItemsAction.classList.remove("success", "alert");
    displayItemsAction.classList.remove("alert");
  }, 3000);
}

// ******** LOCAL STORAGE *****************

function addToLocalStorage(id, newItem) {
  const grocery = { id: id, value: newItem };

  const items = getLocalStorage();

  items.push(grocery);

  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// ************* EVENT LISTENERS *************

submitBtn.addEventListener("click", addItem);

clearBtn.addEventListener("click", removeList);
