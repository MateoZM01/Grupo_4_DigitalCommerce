import React, { useState } from 'react';

function ProductList() {
    const [productList, setProductList] = useState([]);

    return (
        <section>
            <h2>Listado de productos</h2>
            <div>
                <p>Nombre:</p>
            </div>
        </section>
    )
};

export default ProductList