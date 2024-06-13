const root =
  "https://electronic-advisor-backend-production.up.railway.app/api/";

export const GetArtists = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${root}artist`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getClubs = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${root}clubs`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};
