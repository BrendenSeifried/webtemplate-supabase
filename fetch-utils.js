const SUPABASE_URL = '';
const SUPABASE_KEY = '';

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
        location.replace('./other-page');
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

export async function deleteBunny(id) {
    // delete a single bunny using the id argument
    const response = await client.from('fuzzy_bunnies').delete().match({ id:id }).single();
    return checkError(response);
}


// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
