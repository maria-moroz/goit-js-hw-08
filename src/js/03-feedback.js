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

fillFormFieldsOnReset();

function fillFormFieldsOnReset() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!savedData) {
        return;
    }

    refs.formEmailField.value = savedData.email;
    refs.formMessageField.value = savedData.message;

}

function onFormSubmit(e) {
    e.preventDefault();

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        if ((savedData.email !== '' && savedData.message !== '')) {
            e.currentTarget.reset();
            localStorage.removeItem(STORAGE_KEY);
            console.log(savedData);
            return;
        }
    }

    window.alert('Please, fill in all fields!')
    return;
}

function onFormInput(e) {
    formData['email'] = refs.formEmailField.value;
    formData['message'] = refs.formMessageField.value;
    localStorage.setItem(STORAGE_KEY , JSON.stringify(formData));
}