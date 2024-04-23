import React, { useState } from 'react'

function Categories() {
    const [countCateg, setcountCateg] = useState(0);

    return (
        <section>
            <h2>Total de Categorías</h2>
            <p>{countCateg} categorías</p>
        </section>
    )
};

export default Categories