const SUPABASE_URL = 'https://kwuprxiphonycrgvghdh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dXByeGlwaG9ueWNyZ3ZnaGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzUzMzEsImV4cCI6MTk2MDAxMTMzMX0.62oTUOOAQuTrdr4remhHfeCx6BxTyHszj7IU3dya7f8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

//-------------------My Stuff-----------------

export async function getWorkshops() {
    // fetch all families and their bunnies
    const response = await client.from('workshops').select('*, clients(*)').match({ 'clients.user_id': client.auth.session().user.id });
    console.log(response);
    return checkError(response);
}

export async function deleteClient(id) {
    // delete a single bunny using the id argument
    const response = await client.from('clients').delete().match({ id:id }).single();
    return checkError(response);
}


export async function createClient(banana) {
    // create a bunny using the bunny argument
    const response = await client.from('clients').insert({ name:banana.name, workshop_id: banana.workshopId });
    console.log(response, 'testing');
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
