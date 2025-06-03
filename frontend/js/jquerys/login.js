document.querySelector("form").addEventListener("submit", function (e) {

  e.preventDefault(); //para que no se mueva el cuadro de login al saltar la alerta

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const userCredentials = {
    "user1@example.com": "password1",
    "user2@example.com": "password2"
  }; //ARRAY DE PRUEBA PARA TESTEAR UN INTENTO DE INICIO DE SESION CON UN CORREO INEXISTENTE Y CON CREDENCIALES INCORRECTAS

  function checkCredentials(emailInput, passwordInput) {

    //Notificacion de sweetalert si no está el email o la contraseeña
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, completa ambos campos.',
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
      return;
    }

    else{
      //proceder con el logeo
    }
  }

  checkCredentials(email, password);
});
