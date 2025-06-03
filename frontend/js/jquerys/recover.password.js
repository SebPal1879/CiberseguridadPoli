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
  let hasEmpty = false;

  if(!email.value.trim()){
    hasEmpty = true;
  }

  if (hasEmpty) {

    Swal.fire({
      icon: 'warning',
      title: 'Campos requeridos',
      text: 'Por favor, ingresa un correo electrónico.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    email.classList.add("is-invalid");

    return;
  }

  else if (!registeredEmails.includes(emailCheck)) {

    Swal.fire({
      icon: 'warning',
      title: 'Correo electrónico no existente',
      text: 'El correo electrónico ingresado no está vinculado a ninguna cuenta existente.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    email.classList.add("is-invalid");

    return;
  }
});
