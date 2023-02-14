const form = document.getElementById('sign-up');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/sign-up', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => console.log(json));
})