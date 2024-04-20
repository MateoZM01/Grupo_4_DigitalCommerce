window.addEventListener("load", function () {
    let formulario = document.querySelector("form.formuregister");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

        // Nombre
        let campoNombre = document.querySelector("input.nombre");

        if (campoNombre.value == "") {
            errores.push("El campo de nombre es obligatorio");
        } else if (campoNombre.value.length < 2) {
            errores.push("El campo de nombre debe tener al menos 2 caracteres");
        }

        // Apellido
        let campoApellido = document.querySelector("input.apellido");

        if (campoApellido.value == "") {
            errores.push("El campo de apellido es obligatorio");
        } else if (campoNombre.value.length < 2) {
            errores.push("El campo de apellido debe tener al menos 2 caracteres");
        }

        // Email
        let campoEmail = document.querySelector("input.email");

        if (campoEmail.value == "") {
            errores.push("El campo de email es obligatorio");
        } else if (campoEmail.value.length < 2) {
            errores.push("El campo de email debe ser válido");
        }

        // Contraseña
        let campoContraseña = document.querySelector("input.contraseña");

        if (campoContraseña.value == "") {
            errores.push("El campo de contraseña es obligatorio");
        } else if (campoContraseña.value.length < 8) {
            errores.push("El campo de contraseña debe tener al menos 8 caracteres");
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