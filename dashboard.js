const trainers = [
  {
    name: "Abid Khan",
    title: "Full Stack Developer & AI Trainer",
    image: "https://github.com/professionalabidkhan-hue/ABID-KHAN-/blob/main/ABID%20KHAN.png",
    profileUrl: "trainer-abid.html"
  },
  {
    name: "Fatima Ali",
    title: "Cybersecurity Expert",
    image: "images/fatima.jpg",
    profileUrl: "trainer-fatima.html"
  },
  {
    name: "Ahmed Raza",
    title: "Data Science & Analytics",
    image: "images/ahmed.jpg",
    profileUrl: "trainer-ahmed.html"
  }
  // Add more trainers here
];

const container = document.getElementById("cardContainer");

trainers.forEach(trainer => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${trainer.image}" alt="${trainer.name}">
    <div class="card-content">
      <h3>${trainer.name}</h3>
      <p>${trainer.title}</p>
      <button onclick="window.location.href='${trainer.profileUrl}'">Visit Profile</button>
    </div>
  `;

  container.appendChild(card);
});
