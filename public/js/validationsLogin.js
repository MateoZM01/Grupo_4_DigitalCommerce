window.addEventListener("load", function () {
    let formulario = document.querySelector("form. formulogin");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

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
