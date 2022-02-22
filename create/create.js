import { checkAuth, createClient, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('.client-form');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const dawi = { name: formData.get('client-name'), workshopId: formData.get('workshop-id') };
    console.log(dawi);
    await createClient(dawi);
    
    form.reset();
});

window.addEventListener('load', async () => {

    const select = document.querySelector('select');
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const option = document.createElement('option');
        option.value = workshop.id;
        option.textContent = workshop.wname;
        select.append(option);
    }
});




const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});



