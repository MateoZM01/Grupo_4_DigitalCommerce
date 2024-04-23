import React, {useState} from 'react';

function Users() {
    const [countUsers, setCountUsers] = useState(0);

    return (
        <section>
            <h2>Total de usuarios</h2>
            <p>{countUsers} usuarios</p>
        </section>
    )
};

export default Users