import * as React from 'react';

export default function getUsers() {
    return fetch('http://localhost:5000/users')
        .then(response => {console.log(response)
            return response.json()});
}