import React, { useState } from 'react';

function ProductCategories() {
    const [countCategProduct, setCountCategPro] = useState(0);

    return (
        <section>
            <h2>Categorías con total de sus productos</h2>
            <p>{countCategProduct} categorías</p>
        </section>
    )
};

export default ProductCategories