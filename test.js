function checkImageExists(url) {
  fetch(url, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        console.log("Image exists!");
      } else {
        console.log("Image does not exist.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      console.log("Image does not exist.");
    });
}

const imageUrl = "https://docs.looksrare.org/assets/images/looks-icon-dimensions-01f7a3a1ddcfacfb5af647b4ff8d9fb5.png";
checkImageExists(imageUrl);
