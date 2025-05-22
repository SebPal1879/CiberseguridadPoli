document.querySelector("form").addEventListener("submit", function (e) {

  e.preventDefault();

  const inputs = [
    "password",
    "passwordRepeat"
  ];

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

  const invalidInputs = document.querySelectorAll(".is-invalid");

  if (invalidInputs.length === 0) {
    Swal.fire({
      icon: 'success',
      title: 'Cambio de contraseña exitoso',
      text: 'Tu contraseña ha sido actualizada exitosamente.',
      confirmButtonColor: '#58c45c',
      backdrop: true
    }).then(() => {
      // Cambiar contraseña
    });
  }
});

const inputs = [
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
  const passwordRepeatToolTip = { tooltip: $('#passwordRepeatTooltip')}; // Objeto jQuery para acceder al tooltip

  // Logica para manejar el input de repetir contraseña y el icono a la derecha
  if ($(this).val().trim()) {
    passwordRepeat.prop('disabled', false);
    passwordRepeat.css('cursor', 'text');
    passwordRepeatLock.css('cursor', 'default');
  } 
  else {
    passwordRepeat.prop('disabled', true).val('');
    passwordRepeat.removeClass('is-invalid');
    passwordRepeatToolTip.tooltip.css('display', 'none');
    passwordRepeatToolTip.tooltip.css('textContent', '');
    passwordRepeat.css('cursor', 'not-allowed');
    passwordRepeatLock.css('cursor', 'not-allowed');
  }
});
