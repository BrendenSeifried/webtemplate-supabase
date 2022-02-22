import { checkAuth, logout, getWorkshops, deleteClient } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const workshopEl = document.querySelector('.workshop-container');

console.log(workshopEl);
logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkShop() {

    workshopEl.textContent = '';
    const workShops = await getWorkshops();

    for (let workShop of workShops) {
        const workEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const dwarvesEl = document.createElement('div');

        dwarvesEl.classList.add('dwarves');
        workEl.classList.add('workshop');
        nameEl.textContent = workShop.name;

        for (let client of workShop.clients) {
            const dawiEl = document.createElement('div');
            dawiEl.classList.add('dawi');
            dawiEl.textContent = client.name;
            dawiEl.addEventListener('click', async ()=> {
                await deleteClient(client.id);

                const newWorkshops = await getWorkshops();
                displayWorkShop(newWorkshops);
            });
            dwarvesEl.append(dawiEl);
        }
        workEl.append(nameEl, dwarvesEl);
        workshopEl.append(workEl);

    }
}


window.addEventListener('load', async () => {
    const workShops = await getWorkshops();

    displayWorkShop(workShops);
});