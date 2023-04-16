// https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&w=1500
// https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&w=2500&h=1000
// chrome-search://local-ntp/local-ntp.html
// chrome://apps/
// https://mail.google.com/
// https://github.com/

// let imageUrl = `public/images/${Math.floor(Math.random() * 14)}.jpg`;

let startTime = () => {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let amPm = "AM";
  if (h > 12) {
    h = h - 12;
    amPm = "PM";
  }

  if (m.toString().length <= 1) {
    m = "0" + m;
  }
  document.getElementById("innerInnerContainerTime").innerHTML =
    h + ":" + m + " " + amPm;
  setTimeout(startTime, 10000);
};

let addTitle = () => {
  fetch("data.active.json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("innerInnerContainerTitle").innerHTML =
        data[Math.floor(Math.random() * data.length)];
    })
    .catch((error) => console.log(error));
  setTimeout(addTitle, 20000);
};

// let loadImage = async () => {
//   let req = await fetch(
//     "https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&h=800&w=1200"
//   );
//   let data = await req.json();
//   return await data.urls.full;
// };

const getBase64FromUrl = async () => {
  let base64image = await chrome.storage.local.get("image");
  console.log("====================================");
  console.log("base64image: " + base64image.data);
  console.log("====================================");
  if (base64image.data === undefined) {
    console.log("If-----------");
    let url =
      "https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&h=800&w=1200";
    const req = await fetch(url);
    let data1 = await req.json();
    let img_url = await data1.urls.full;

    const data = await fetch(img_url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        chrome.storage.local.set({ image: reader.result }, function (data) {
          console.log("data---->", data);
        });
        resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });
  } else {
    console.log("Else---");
    return base64image.data;
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  let base64image = await getBase64FromUrl();

  console.log("Base64 image loaded: " + base64image);

  document.getElementById("container").style.backgroundImage =
    "url(" + base64image + ")";

  addTitle();
  startTime();

  document
    .getElementById("goChromeTab")
    .addEventListener("click", function (event) {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.update(tab.id, {
          url: "chrome-search://local-ntp/local-ntp.html?dev=false",
        });
      });
    });

  document
    .getElementById("goChromeApps")
    .addEventListener("click", function (event) {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.update(tab.id, {
          url: "chrome://apps/",
        });
      });
    });
});
