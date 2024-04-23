import React, { useState} from 'react';

function Products() {
    const [countProducts, setCountProducts] = useState(0);

    return (
        <section>
            <h2>Total de productos</h2>
            <p>{countProducts} productos</p>
        </section>
    )

};

export default Products