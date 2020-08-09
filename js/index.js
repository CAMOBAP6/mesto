const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');
const cardElements = document.querySelector('.element-grid');
const imagePopup = document.querySelector('.popup-image');
const addButton = document.querySelector('.profile__add-button');

const saveEdit = editPopup.querySelector('.popup__save-button');
const editButton = document.querySelector('.profile__edit-button');
const saveAdd = addPopup.querySelector('.popup__save-button');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const imagePopupCloseButton = imagePopup.querySelector('.popup-image__close-button');
const cardTemplate = document.querySelector('#photo-elements-template').content;

const nameInput = editPopup.querySelector('#nameinput');
const jobInput = editPopup.querySelector('#jobinput');
const nameSet = document.querySelector('.profile__name');
const jobSet = document.querySelector('.profile__job');

const addCardName = addPopup.querySelector('#placeinput');
const addCardLink = addPopup.querySelector('#linkinput');
const addCardError = addPopup.querySelector('#place-name-error');
const addLinkError = addPopup.querySelector('#place-link-error');


function togglePopup(popup) {
    popup.classList.toggle('popup_active');
    if (popup.classList.contains('popup_active')) {
        document.addEventListener('keydown', closeEscape);
    } else {
        document.removeEventListener('keydown', closeEscape);
    }
}

const closeEscape = (evt) => {
    const activePopup = document.querySelector('.popup_active')
    if (evt.key === "Escape") {
        activePopup.classList.remove('popup_active');

    }

}

imagePopupCloseButton.addEventListener('click', function(e) {
    e.stopPropagation();
    togglePopup(imagePopup);
});



const showCard = (e) => {
    togglePopup(imagePopup);
    imagePopup.querySelector('.popup-image__image').src = e.target.src;
    imagePopup.querySelector('.popup-image__text').textContent = e.target.nextElementSibling.querySelector('.element-grid__text').textContent;
    imagePopupCloseButton.addEventListener('click', togglePopup);
}


const toggleLikeButton = (e) => {
    e.target.classList.toggle('element-grid__like-button_active');
}

const deletePlace = (evt) => {
    evt.target.closest('.element-grid__element').remove();
}

const createPhotoElement = (text, imageLink) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element-grid__image');
    cardImage.src = imageLink;
    cardElement.querySelector('.element-grid__text').textContent = text;
    cardImage.setAttribute('alt', text);

    cardElement.querySelector('.element-grid__like-button').addEventListener('click', toggleLikeButton);
    cardElement.querySelector('.element-grid__delete-button').addEventListener('click', deletePlace);
    cardImage.addEventListener('click', showCard);

    return cardElement;
}


const renderCard = (card) => {
    cardElements.prepend(card);
}

initialCards.forEach((card) => {
    renderCard(createPhotoElement(card.name, card.link));
})


const toggleEditPopup = () => {
    togglePopup(editPopup);

    nameInput.value = nameSet.textContent;
    jobInput.value = jobSet.textContent;

    togglePopupInputError(editPopup, nameInput);
    togglePopupInputError(editPopup, jobInput);

    if (nameInput.validity.valid && jobInput.validity.valid) {
        saveEdit.disabled = false;
        saveEdit.classList.remove('popup__save-button_disabled');
    }
}

const toggleAddPopup = () => {

    togglePopup(addPopup);

    if (addPopup.classList.contains('popup_active')) {
        if (!addCardName.value.length) {
            resetInputError(addCardName, addCardError)
        }
        if (!addCardLink.value.length) {
            resetInputError(addCardLink, addLinkError)
        }
    }
}

const overlayClose = (evt) => {
    if (evt.target.classList.contains('popup_active')) {
        togglePopup(evt.target);
    }
}


const editSubmitHandler = (evt) => {
    evt.preventDefault();

    nameSet.textContent = nameInput.value;
    jobSet.textContent = jobInput.value;
    toggleEditPopup(editPopup);
}

const disableButton = (buttonElement, classToAdd) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(classToAdd);
}

const addSubmitHandler = (evt) => {
    evt.preventDefault();

    renderCard(createPhotoElement(addCardName.value, addCardLink.value));
    addForm.reset();
    togglePopup(addPopup);
    const submitButton = addForm.querySelector('.popup__save-button');
    disableButton(submitButton, 'popup__save-button_disabled')
}

editPopup.addEventListener('mousedown', (evt) => {
    overlayClose(evt);
});
addPopup.addEventListener('mousedown', (evt) => {
    overlayClose(evt);
});
imagePopup.addEventListener('mousedown', (evt) => {
    overlayClose(evt);
});

editButton.addEventListener('click', () => {
    toggleEditPopup();
});
editPopupCloseButton.addEventListener('click', () => {
    toggleEditPopup();
});
editForm.addEventListener('submit', editSubmitHandler);

addButton.addEventListener('click', () => {
    toggleAddPopup();
});
addPopupCloseButton.addEventListener('click', () => {
    togglePopup(addPopup);
})
addForm.addEventListener('submit', addSubmitHandler);