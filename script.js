const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const onSubmit = (e) => {
  e.preventDefault();
  const form = new FormData(itemForm);

  if (form.get('item').length != 0){
    createListItem(form.get('item'));
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


itemForm.addEventListener('submit', onSubmit);