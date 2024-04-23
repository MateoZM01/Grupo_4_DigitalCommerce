import React, { useState } from 'react';

function LastUser() {
    const [lastUser, setLastUser] = useState([]);
    
    return (
        <section>
            <h2>Detalle del último usuario creado</h2>
            <main>
                <p>Nombre:</p>
                <p>Apellido:</p>
                <p>Email:</p>
                <p>Fecha de nacimiento:</p>
                <p>Dirección:</p>
            </main>
        </section>
    )
};

export default LastUser