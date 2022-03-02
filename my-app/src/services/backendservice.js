import * as React from 'react';

// gets all users from the database
function getUsers() {
    return fetch('http://localhost:5000/users')
        .then(response => {
            return response.json()});
}

// deletes a user with the ID that is passed in
function deleteUser(userID) {
    return fetch(`http://localhost:5000/users/${userID}`,{ 
        method: "DELETE"}).then(response => response.json());
}

// fetch request to update user information in the database
function updateUser(userObject) {
    return fetch(`http://localhost:5000/users/${userObject.Id}`,{
        method: "PUT",
        body: JSON.stringify(userObject),
        headers: {"Content-Type": "application/json"}}
        ).then(response => response.json()
        ).catch(Error => console.log("update fetch failed"));
}

export {getUsers, deleteUser, updateUser}

