import * as React from 'react';


function getUsers() {
    return fetch('http://localhost:5000/users')
        .then(response => {console.log(response)
            return response.json()});
}

function deleteUser(userID) {
    return fetch(`http://localhost:5000/users/${userID}`,{ 
        method: "DELETE"}).then(response => response.json());
}

export {getUsers, deleteUser}

