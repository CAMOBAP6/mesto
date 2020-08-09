const resetInputError = (formInput, inputElementError) => {
    inputElementError.textContent = '';
    inputElementError.classList.remove('popup__input-error_active');
    formInput.classList.remove('popup__input_type_error');
}

const togglePopupInputError = (popup, formInput) => {
    const inputElementError = popup.querySelector(`#${formInput.name}-error`);
    if (formInput.value.length > 0) {
        resetInputError(formInput, inputElementError);
    }
}


const showInputError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`#${formInput.name}-error`);
    formInput.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`#${formInput.name}-error`);
    formInput.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
        return !formInput.validity.valid;
    });
}
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__save-button_disabled');
        buttonElement.disabled = false;
    }
}

const checkValid = (formElement, formInput) => {
    if (formInput.validity.valid) {
        hideInputError(formElement, formInput);
    } else {
        showInputError(formElement, formInput, formInput.validationMessage);
    }
}

const setEventListeners = (formElement, parametr) => {
    const inputList = Array.from(formElement.querySelectorAll(parametr.inputSelector));
    const submitButton = formElement.querySelector(parametr.submitButtonSelector);
    inputList.forEach((formInput) => {
        formInput.addEventListener('input', (evt) => {
            checkValid(formElement, formInput, parametr);
            toggleButtonState(inputList, submitButton, parametr);
        });
    });
}

const enableValidation = (parametr) => {
    const arrayList = Array.from(document.querySelectorAll(parametr.formSelector));
    arrayList.forEach((formElement) => {
        setEventListeners(formElement, parametr);

    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});