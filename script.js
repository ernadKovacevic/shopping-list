const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const itemFilter = document.querySelector('.filter');
items = document.querySelectorAll('li');

// --------------------- ADD ITEMS TO LIST --------------------------------
const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem= new FormData(itemForm).get('item');
  addItemToDOM(newItem);
  addItemToStorage(newItem);
}

const addItemToDOM = (newItem) => {
  if (newItem.length != 0){
    createListItem(newItem);
    showFilterAndClearButton();
  }else {
    console.log('Text field empty')
  }
}

const addItemToStorage = (item) => {

  if (item.length !== 0){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
      itemsFromStorage = [];
    }else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
  
    itemsFromStorage.push(item);
  
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }
}

const createListItem = (item) => {
  const li = document.createElement('li');
  li.textContent = item;

  const button = createDeleteButton();
  li.appendChild(button);
  itemList.appendChild(li);

  return li;
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
  localStorage.clear(); //DELETE ALL ITEMS FROM STORAGE
  hideFilterAndClearButton();
}

//---------------   DELETE ONE BY ONE  --------------
const deleteItem = (e) => {
  
  if (e.target.tagName === 'I') {
    const li = e.target.parentNode.parentNode;
    itemList.removeChild(li);

    items = document.querySelectorAll('li');

    if (items.length === 0) {
      hideFilterAndClearButton();
    }
    
    deleteItemFromStorage(li.textContent);
  }
}

const deleteItemFromStorage = (item) => {

  const prevItems = JSON.parse(localStorage.getItem('items'));
  
  newItems = prevItems.filter((el) => {
    return el !== item;
  })

  localStorage.setItem('items', JSON.stringify(newItems))
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


//----------- FETCH ITEMS FROM LOCAL STORAGE ---------------
window.onload = (e) => {
  let loadItems = JSON.parse(localStorage.getItem('items'));

  if (loadItems !== null){
    loadItems.forEach((item) => {
      addItemToDOM(item)
    })
  }
}


//-------- FILTER ITEMS -------
const filterItems = (e) => {
  items.forEach((item) => {
      if (item.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
        item.style.display = 'flex';
      }else {
        item.style.display = 'none';
      }
  })
}

itemForm.addEventListener('submit', onAddItemSubmit);
clearAllButton.addEventListener('click', deleteAllItems);
itemList.addEventListener('click', deleteItem);
itemFilter.addEventListener('input', filterItems)
