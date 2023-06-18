/*    JavaScript - Assignment 4

 *    Photo gallery
 *    Author: Julio Vinicius A. de Carvalho
 *    Date: April 1st, 2023

 *    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

const imageName = document.getElementById("imgName");
const images = document.getElementById("image");
const rightArrow = document.getElementById("rightarrow");
const leftArrow = document.getElementById("leftarrow");
const reloadBtn = document.getElementById("reloadButton");

const imageListUrl = "https://comp125-a4-template.onrender.com/imagelist"; 
const imageList = {
  method: "GET",
};

let imageLists = [];
let interval;
let currentIndex = 0;


const fetchImageList = () => {
  fetch(imageListUrl, imageList)
    .then((response) => response.json())
    .then((data) => {
      imageLists = data.ImageList;
      currentIndex = 0;
      displayImage(currentIndex);
      startRotate();
    })
    .catch((error) => console.error(error));
};

const displayImage = (index) => {
  const image = imageLists[index];
  images.src = image.name;
  imageName.textContent = image.name;
};

const startRotate = () => {
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % imageLists.length;
    displayImage(currentIndex);
  }, imageLists[currentIndex].time);
};


const stopRotate = () => {
  clearInterval(interval);
};

rightArrow.addEventListener("click", () => {
  stopRotate();
  currentIndex = (currentIndex + 1) % imageLists.length;
  displayImage(currentIndex);
});

leftArrow.addEventListener("click", () => {
  stopRotate();
  currentIndex = (currentIndex - 1 + imageLists.length) % imageLists.length;
  displayImage(currentIndex);
});

reloadBtn.addEventListener("click", () => {
  stopRotate();
  fetchImageList();
});

window.addEventListener("load", fetchImageList);



