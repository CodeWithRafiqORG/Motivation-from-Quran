// https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&w=1500
// https://api.unsplash.com/photos/random?page=1&query=natural&client_id=ej5PjFlElrFnuzhpXL8-UYlOEmGzo6chhU9ojnUk9cg&w=2500&h=1000
// chrome-search://local-ntp/local-ntp.html
// chrome://apps/
// https://mail.google.com/
// https://github.com/

let imageUrl = `public/images/${Math.floor(Math.random() * 14)}.jpg`;

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
  fetch("data2.json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("innerInnerContainerTitle").innerHTML =
        data[Math.floor(Math.random() * data.length)];
    })
    .catch((error) => console.log(error));
  setTimeout(addTitle, 20000);
};

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("container").style.backgroundImage =
    "url(" + imageUrl + ")";
  console.log(imageUrl);
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
