window.addEventListener("load", function () {
    let formulario = document.querySelector("form.formproducts");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

        // Nombre
        let campoNombre = document.querySelector("input.nombre");

        if (campoNombre.value == "") {
            errores.push("El campo de nombre es obligatorio");
        } else if (campoNombre.value.length < 5) {
            errores.push("El campo de nombre debe tener al menos 5 caracteres");
        }

        // Descripción
        let campoDescripcion = document.querySelector("input.descripcion");

        if (campoDescripcion.value.length < 20) {
            errores.push("El campo de descripción debe tener al menos 20 caracteres");
        }

        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }

    });

});