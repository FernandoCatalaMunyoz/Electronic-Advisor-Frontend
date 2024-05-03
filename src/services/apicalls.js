const root = "http://localhost:4000/api/";

export const LoginUser = async (user) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${root}auth/login`, options);
    console.log(response, "response");
    const data = await response.json();
    console.log(data, "data");

    if (!data.success) {
      throw new Error(data.message);
    }
    //SI NECESITASE TOKEN
    if (data.message === "Token Error") {
      dispatch(logout({ credentials: "" }));
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  try {
    const response = await fetch(`${root}auth/register`, options);
    const data = await response.json();
    console.log(data, "data");
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};
