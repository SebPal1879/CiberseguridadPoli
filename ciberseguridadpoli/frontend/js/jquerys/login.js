document.querySelector("form").addEventListener("submit", function (e) {

  e.preventDefault(); //para que no se mueva el cuadro de login al saltar la alerta

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const inputs = [
    "email",
    "password"
  ];
  const userCredentials = {
    "user1@example.com": "password1",
    "user2@example.com": "password2"
  }; //ARRAY DE PRUEBA PARA TESTEAR UN INTENTO DE INICIO DE SESION CON UN CORREO INEXISTENTE Y CON CREDENCIALES INCORRECTAS

  function checkCredentials(emailInput, passwordInput) {

    let hasEmpty = false;

    inputs.forEach(id => {

      const input = document.getElementById(id);
    
      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        hasEmpty = true;
      } else {
        input.classList.remove("is-invalid");
      }
    });
    
    if (hasEmpty) {

      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, completa todos los campos marcados como requeridos.',
        confirmButtonColor: '#58c45c',
        backdrop: true
      });

      return;
    }
    
    //El email no esta registrado
    else if (!userCredentials[emailInput]) {

      Swal.fire({
        icon: 'warning',
        title: 'Correo no registrado',
        text: 'El correo ingresado no está vinculado a ninguna cuenta.',
        confirmButtonColor: '#58c45c',
        backdrop: true
      });

      document.getElementById(inputs[0]).classList.add("is-invalid");

      return;
    }
  
    //Credenciales incorrectas
    else if (userCredentials[emailInput] !== passwordInput) {

      Swal.fire({
        icon: 'warning',
        title: 'Credenciales incorrectas',
        text: 'Las credenciales ingresadas son incorrectas.',
        confirmButtonColor: '#58c45c',
        backdrop: true
      });

      document.getElementById(inputs[0]).classList.add("is-invalid");
      document.getElementById(inputs[1]).classList.add("is-invalid");

      return;
    }

    const invalidInputs = document.querySelectorAll(".is-invalid");

  if (invalidInputs.length === 0) {
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesion exitoso',
      text: 'Se te redijirá a la página de inicio',
      confirmButtonColor: '#58c45c',
      backdrop: true
    }).then(() => {
      // Proceder con el registro
    });
  }
  }

  checkCredentials(email, password);
});

const inputs = [
  "email",
  "password"
];

inputs.forEach(id => {

  const input = document.getElementById(id);

  input.addEventListener("input", () => {

    const value = input.value.trim();

    // Quitar el borde rojo al empezar a escribir en un campo vacio
    if (input.classList.contains("is-invalid") && value) {
      input.classList.remove("is-invalid");
    }
  });
});