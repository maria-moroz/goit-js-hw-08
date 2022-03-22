import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    formEmailField: document.querySelector('.feedback-form input'),
    formMessageField: document.querySelector('.feedback-form textarea'),
}

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

fillFormFieldsOnReset(savedData);

function fillFormFieldsOnReset(data) {
    if (!data) {
        return;
    }

    if (data.hasOwnProperty('email')) {
        refs.formEmailField.value = data.email;
    }

    if (data.hasOwnProperty('message')) {
        refs.formMessageField.value = data.message;
    }
}

function onFormSubmit(e) {
    e.preventDefault();

    const data = {
        email: refs.formEmailField.value,
        message: refs.formMessageField.value,
    }

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(data);
}

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY , JSON.stringify(formData));
}