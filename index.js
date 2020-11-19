set_events();
show();
var keys = ""
function get_peeps() {
    var peeps = fetch('https://chitter-backend-api-v2.herokuapp.com/peeps')
        .then(response => response.json())
    return peeps
}

function get_users() {
    var users = fetch('https://chitter-backend-api-v2.herokuapp.com/users')
        .then(response => response.json())
    return users
}

async function postData(url, data) {
    var token = 'Token token=' + keys['session_key']
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(data)
    });
    return response.json();
}

function create_users() {
    const username = document.getElementById('new_username').value
    const password = document.getElementById('new_password').value
    const data = {"user": {"handle": username, "password": password}}
    postData('https://chitter-backend-api-v2.herokuapp.com/users', data)
}
async function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const data = {"session": {"handle": username, "password": password}}
    keys = await postData('https://chitter-backend-api-v2.herokuapp.com/sessions', data)
    console.log(keys)
}

function post_peep() {

    const peep = document.getElementById('peep').value
    const data = {"peep": {"user_id": keys['user_id'], "body": peep}}
    postData('https://chitter-backend-api-v2.herokuapp.com/peeps', data)

}
function like_peep() {

}

function unlike_peep(){

}

function set_events(){
    document.getElementById("create-user").addEventListener('click', this.create_users.bind(this));
    document.getElementById("login-user").addEventListener('click', this.login.bind(this));
    document.getElementById("add-peep").addEventListener('click',this.post_peep.bind(this));
}   
async function show() {
    let peeps = await get_peeps()
    list_of_peeps = "<ul>"
    for (var i = 0; i< peeps.length; i++) {
        list_of_peeps += "<li>"+ peeps[i]['body'] + " -"+peeps[i]['user']['handle']
    }
    list_of_peeps += "</ul>"
    document.getElementById("peeps").innerHTML = list_of_peeps;
}

