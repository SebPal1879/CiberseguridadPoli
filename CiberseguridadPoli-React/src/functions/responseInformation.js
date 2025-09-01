/*
Función para desestructurar la información de una respuesta tipo objeto y retornarla,
para evitar repetir el mismo procedimiento una y otra vez donde se solicite la información.
*/

import { API_URL } from "../../urls.js";
function responseInformation(responseData) {
  const id = responseData.id;
  const email = responseData.email;
  const firstName = responseData.first_name;
  const lastName = responseData.last_name;
  const userName = responseData.user;
  const telephoneNumber = responseData.telephone_number;
  const level = responseData.level;
  console.log(responseData.profile_picture);
  const profilePictureURL = responseData.profile_picture
    ? API_URL + responseData.profile_picture
    : null;
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
