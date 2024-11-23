const button = document.getElementById("toggleBtn");

button.addEventListener("click", () => {
  fetch("http://localhost:3000/toggle")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      alert(data); // Optional: Provide user feedback
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
