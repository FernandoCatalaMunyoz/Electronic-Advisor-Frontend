export const validame = (type, value) => {
  switch (type) {
    case "firstName":
    case "surname":
    case "name":
      if (value.length < 3) {
        return "Please, the name must have at least three characters.";
      }
      return "";

    case "country":
      if (value.length < 3) {
        return "Please, the country must have at least three characters.";
      }
      return "";
    case "lastName":
      if (value.length < 3) {
        return "Please, the lastname must have at least three characters.";
      }
    case "email":
    case "e-mail":

    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(value)) {
        return "Please, the email must be valid.";
      }
      return "";
    case "password":
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
      if (!passwordRegex.test(value)) {
        return "Password must have at least 8 characters, one uppercase letter, one lowercase letter and one number.";
      }

      return "";

    default:
      console.log("whattttttttttt???");
  }
};
