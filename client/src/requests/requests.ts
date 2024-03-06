export const fetchDataPost = async (url: string, requestOptions: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestOptions),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataPut = async (
  url: string,
  id: number,
  requestOptions: any
) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestOptions),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deletePostById = async (url: string, id: number) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${url}/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error("Error");
    }
    const responseData = await response.json();
    console.log("Response:", responseData);
  } catch (error) {
    console.error(error);
  }
};
