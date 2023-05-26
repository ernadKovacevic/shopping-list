const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const itemFilter = document.querySelector('.filter');


// --------------------- ADD ITEMS TO LIST --------------------------------
const onSubmit = (e) => {
  e.preventDefault();
  const form = new FormData(itemForm);

  if (form.get('item').length != 0){
    createListItem(form.get('item'));
    showFilterAndClearButton();
  }else {
    console.log('Text field empty')
  }
}

const createListItem = (item) => {
  const li = document.createElement('li');
  li.textContent = item;

  const button = createDeleteButton();
  li.appendChild(button);
  itemList.appendChild(li);
}


const createDeleteButton = () => {
  const deleteButton = document.createElement('button');
  const icon = document.createElement('i');
  
  deleteButton.className = 'remove-item btn-link text-red'
  icon.className = "fa-solid fa-xmark";
  deleteButton.appendChild(icon);

  return deleteButton;
}

//---------------   DELETE ALL ITEMS --------------

const deleteAllItems = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  hideFilterAndClearButton();
}

//---------------   DELETE ONE BY ONE  --------------
const deleteItem = (e) => {
  
  if (e.target.tagName === 'I') {
    const li = e.target.parentNode.parentNode;
    itemList.removeChild(li);

    const items = document.querySelectorAll('li');

    if (items.length === 0) {
      hideFilterAndClearButton();
    }
  }
}

// ----- HIDE AND SHOW FILTER INPUT AND CLEAR ALL BUTTON IF LIST EMPTY -----
const hideFilterAndClearButton = () => {
  clearAllButton.style.display = 'none';
  itemFilter.style.display = 'none';
}

const showFilterAndClearButton = () => {
  clearAllButton.style.display = 'block';
  itemFilter.style.display = 'block';
}



itemForm.addEventListener('submit', onSubmit);
clearAllButton.addEventListener('click', deleteAllItems);
itemList.addEventListener('click', deleteItem);