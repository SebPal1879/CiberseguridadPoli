document.addEventListener("DOMContentLoaded", function () {

  // dropArea se refiere a la funcion de arrastrar y soltar archivos en el apartado de avatar
  const dropArea = document.getElementById("drop-area");
  const avatarPick = document.getElementById("avatar-pick");
  const input = document.getElementById("customFile");
  const preview = document.getElementById("imagePreview");
  const imageContainer = document.getElementById("image-container");
  const removeButton = document.getElementById("removeImageButton");

  input.addEventListener("change", handleFile);

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", (e) => {

    e.preventDefault();
    dropArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      input.files = e.dataTransfer.files; 
      handleFile();
    } 
    else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor selecciona solo archivos de imagen.",
      });
    }
  });

  function handleFile() {

    const file = input.files[0];

    if (file && file.type.startsWith('image/')) {

      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        imageContainer.style.display = 'flex';
        imageContainer.style.flexDirection = 'column';
        imageContainer.style.alignItems = 'center';
        dropArea.style.display = 'none'; 
        avatarPick.style.display = 'none';
      };

      reader.readAsDataURL(file);
    }
  }

  removeButton.addEventListener("click", function () {

    preview.src = ''; 
    imageContainer.style.display = 'none';
    dropArea.style.display = 'block'; 
    avatarPick.style.display = 'flex';
  });
});

document.querySelector("form").addEventListener("submit", function (e) {
  
  e.preventDefault();

  const inputs = [
    "firstNames",
    "lastNames",
    "username",
    "email",
    "password",
    "passwordRepeat"
  ];
  /*
    VARIABLES DE PRUEBA, PUEDEN BORRARSE Y TODAS LAS CONDICIONES RELACIONADAS A ELLAS 
  */
  const registeredUsernames = ["admin", "usuario1"]; //ARRAY DE PRUEBA PARA NOMBRE DE USUARIO REPETIDO
  const registeredEmails = ["user1@example.com", "user2@example.com"]; //ARRAY DE PRUEBA PARA CORREO REPETIDO
  const usernameCheck = document.getElementById("username").value.trim();//VARIABLE DE NOMBRE DE USUARIO DE PRUEBA
  const emailCheck = document.getElementById("email"); //VARIABLE DE EMAIL DE PRUEBA

  let hasEmpty = false;

  inputs.forEach(id => {

    const input = document.getElementById(id);
    const tooltip = input.parentElement.querySelector(".invalid-tooltip");
  
    if (!input.value.trim()) {

      input.classList.add("is-invalid");
      hasEmpty = true;
      
      if (tooltip) tooltip.style.display = 'none';

    } else {

      if(tooltip){
        return;
      }

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

  else if (registeredUsernames.includes(usernameCheck)) {

    Swal.fire({
      icon: 'warning',
      title: 'Nombre de usuario en uso',
      text: 'El nombre de usuario ingresado ya existe. Ingrese otro.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    return;
  }

  else if (registeredEmails.includes(emailCheck)) {

    Swal.fire({
      icon: 'warning',
      title: 'Correo electrónico en uso',
      text: 'El correo electrónico ingresado ya está vinculado a una cuenta existente. Ingrese otro.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    });

    return;
  }

  const invalidInputs = document.querySelectorAll(".is-invalid");

  if (invalidInputs.length === 0) {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Tu cuenta ha sido creada exitosamente.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    }).then(() => {
      // Proceder con el registro
    });
  }
});

const inputs = [
  "firstNames",
  "lastNames",
  "username",
  "email",
  "password",
  "passwordRepeat"
];

inputs.forEach(id => {

  const input = document.getElementById(id);

  if (!input) return;

  const tooltip = input.parentElement.querySelector(".invalid-tooltip");

  input.addEventListener("input", () => {

    const value = input.value.trim();

    // Quitar el borde rojo al empezar a escribir en un campo vacio
    if (input.classList.contains("is-invalid") && value) {
      input.classList.remove("is-invalid");
      if (tooltip && id !== "username") {
        tooltip.textContent = ""; 
      }
    }

    if (id === "username") {
      if (value.length > 10) {
        input.classList.add("is-invalid");
        if (tooltip) {
          tooltip.textContent = "El nombre de usuario debe tener menos de 10 caracteres";
          tooltip.style.display = "block";
        }
      } 
      else {
        input.classList.remove("is-invalid");
        tooltip.textContent = "";
        tooltip.style.display = "none";
      }
    }

    if (id === "firstNames" || id === "lastNames" || id === "email") {

      if (value.length > 30) {
        input.classList.add("is-invalid");
        if (tooltip) {
          tooltip.textContent = "Este campo debe tener menos de 30 caracteres";
          tooltip.style.display = "block";
        }
        if (tooltip && id === "email") {
          tooltip.textContent = "El email debe tener menos de 30 caracteres";
          tooltip.style.display = "block";
        }
      } 
      else {
        input.classList.remove("is-invalid");
        tooltip.textContent = "";
        tooltip.style.display = "none";
      }
    }

    if(id === "password"){
      if(value.length !== 15){
        input.classList.add("is-invalid");
        if (tooltip) {
          tooltip.textContent = "La contraseña debe tener 15 caracteres";
          tooltip.style.display = "block";
        }
      }
      else {
        input.classList.remove("is-invalid");
        tooltip.textContent = "";
        tooltip.style.display = "none";
      }
    }

    if (id === "passwordRepeat") {
      if (value !== password.value.trim()) {
        input.classList.add("is-invalid");
        if (tooltip) {
          tooltip.textContent = "Las contraseñas no coinciden"; 
          tooltip.style.display = "block";
        }
      } 
      else {
        input.classList.remove("is-invalid");
        tooltip.textContent = "";
        tooltip.style.display = "none";
      }
    }    
  });
});

$('#password').on('input', function () {

  const passwordRepeat = $('#passwordRepeat');
  const passwordRepeatLock = $('#lockIconContainer');
  const passwordRepeatToolTip = {
    tooltip: $('#passwordRepeatTooltip') // Objeto jQuery para acceder al tooltip
  };

  // Logica para manejar el input de repetir contraseña y el icono a la derecha
  if ($(this).val().trim()) {
    passwordRepeat.prop('disabled', false);
    passwordRepeat.css('cursor', 'text');
    passwordRepeatLock.css('cursor', 'default');
    passwordRepeatLock.css('background-color', '#ffffff');
  } 
  else {
    passwordRepeat.prop('disabled', true).val('');
    passwordRepeat.removeClass('is-invalid');
    passwordRepeatToolTip.tooltip.css('display', 'none');
    passwordRepeatToolTip.tooltip.css('textContent', '');
    passwordRepeat.css('cursor', 'not-allowed');
    passwordRepeatLock.css('cursor', 'not-allowed');
    passwordRepeatLock.css('background-color', '#e9ecef');
  }
});






