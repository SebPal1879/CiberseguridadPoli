document.querySelector("form").addEventListener("submit", function (e) {
  
  e.preventDefault();
  
  /*
    VARIABLES DE PRUEBA, PUEDEN BORRARSE Y TODAS LAS CONDICIONES RELACIONADAS A ELLAS 
  */
    const registeredEmails = ["user1@example.com", "user2@example.com"]; //ARRAY DE PRUEBA PARA CORREO EXISTENTE
    const emailCheck = document.getElementById("email"); //VARIABLE DE EMAIL DE PRUEBA
  /*
    VARIABLES DE PRUEBA, PUEDEN BORRARSE Y TODAS LAS CONDICIONES RELACIONADAS A ELLAS 
  */

  const email = document.getElementById("email");

  if(!email.value.trim()){

    email.classList.add("is-invalid");

    Swal.fire({
      icon: 'warning',
      title: 'Campos requeridos',
      text: 'Por favor, ingresa un correo electrónico.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    return;
  }

  else if (!registeredEmails.includes(emailCheck.value.trim())) {

    email.classList.add("is-invalid");

    Swal.fire({
      icon: 'warning',
      title: 'Correo electrónico no existente',
      text: 'El correo electrónico ingresado no está vinculado a ninguna cuenta existente.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    return;
  }

  const invalidInputs = document.querySelectorAll(".is-invalid");

  if (invalidInputs.length === 0) {
    Swal.fire({
      icon: 'success',
      title: 'Correo enviado',
      text: 'Se ha enviado un correo para reestablecer tu contraseña.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    }).then(() => {
      // Proceder con la recuperacion de contraseña
    });
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => {

  const value = email.value.trim();

  if (email.classList.contains("is-invalid") && value){
    email.classList.remove("is-invalid");
  }
});