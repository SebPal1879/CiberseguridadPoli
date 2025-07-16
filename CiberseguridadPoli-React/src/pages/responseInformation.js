/*
Función para desestructurar la información de una respuesta tipo objeto y retornarla,
para evitar repetir el mismo procedimiento una y otra vez donde se solicite la información.
*/
function responseInformation(responseData) {
  console.log(responseData);
  const id = responseData.id;
  const email = responseData.email;
  const firstName = responseData.first_name;
  const lastName = responseData.last_name;
  const userName = responseData.user;
  const telephoneNumber = responseData.telephone_number;
  const level = responseData.level;
  const profilePictureURL =
    "http://127.0.0.1:8000/" + responseData.profile_picture;
  const program = responseData.program;
  return {
    id,
    email,
    firstName,
    lastName,
    userName,
    telephoneNumber,
    level,
    profilePictureURL,
    program,
  };
}

export default responseInformation;
