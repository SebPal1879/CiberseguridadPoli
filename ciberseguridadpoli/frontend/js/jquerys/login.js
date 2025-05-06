document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

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

  else{
    //Proceder con el logeo
  }
});
