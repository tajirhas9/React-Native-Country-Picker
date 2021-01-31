export async function FetchGreeting() {
  var greetingText = null;

  await fetch("http://192.168.0.138:8000/")
    .then((response) => response.json())
    .then((json) => {
      greetingText = json;
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    });

  return greetingText;
}

export async function FetchCountries() {
  var countryList = [];

  var myHeaders = new Headers();
  myHeaders.append("status", "request_key");

  var raw = "";

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://192.168.0.138:8000/countries", requestOptions)
    .then((response) => response.json())
    .then((result) => (countryList = result))
    .then(() => {
      console.log(countryList.length);
    })
    .then(() => {
      console.log("returning " + countryList.length + " countries");
      return countryList;
    })
    .catch((error) => console.log("error", error));
}

export async function CreateNewRecord(text, countries) {
  var countryList = [];

  for (var i = 0; i < countries.length; ++i) {
    countryList.push(countries[i].tag);
  }

  console.log(countryList);

  var myHeaders = new Headers();
  myHeaders.append("status", "request_key");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      text: text,
      tags: countryList,
    }),
    redirect: "follow",
  };

  await fetch("http://192.168.0.138:8000/new/record", requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
}
