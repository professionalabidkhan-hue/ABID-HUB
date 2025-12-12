const users = [
  // Trainers
  {
    name: "Abid Khan",
    role: "trainer",
    title: "Full Stack Developer & AI Trainer",
    image: "https://github.com/professionalabidkhan-hue/ABID-KHAN-/blob/main/ABID%20KHAN.png",
    profileUrl: "trainer-abid.html"
  },
  {
    name: "Fatima Ali",
    role: "trainer",
    title: "Cybersecurity Expert",
    image: "images/fatima.jpg",
    profileUrl: "trainer-fatima.html"
  },
  {
    name: "Ahmed Raza",
    role: "trainer",
    title: "Data Science & Analytics",
    image: "images/ahmed.jpg",
    profileUrl: "trainer-ahmed.html"
  },
  // Students
  {
    name: "Student One",
    role: "student",
    title: "O-Level Student",
    image: "images/student-placeholder.jpg",
    profileUrl: "student-one.html"
  },
  {
    name: "Student Two",
    role: "student",
    title: "A-Level Student",
    image: "images/student-placeholder.jpg",
    profileUrl: "student-two.html"
  }
];

// Container for cards
const container = document.getElementById("cardContainer");

// Object to store previously uploaded images
let uploadedImages = {};

// Fetch previously uploaded images from the backend
fetch('http://localhost:3001/uploads-data')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      uploadedImages[item.username] = item.imageUrl;
    });
    renderCards(); // Render cards after loading images
  })
  .catch(err => {
    console.error("Failed to load uploaded images", err);
    renderCards(); // Render anyway if fetch fails
  });

// Function to render all cards
function renderCards() {
  container.innerHTML = '';

  users.forEach(user => {
    const username = user.name.replace(/\s/g,'');
    const imgSrc = uploadedImages[username] || user.image;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="role-badge ${user.role}">${user.role.toUpperCase()}</div>
      <img src="${imgSrc}" alt="${user.name}" id="img-${username}">
      <h3>${user.name}</h3>
      <p>${user.title}</p>
      <button onclick="window.location.href='${user.profileUrl}'">Visit Profile</button>
      <input type="file" accept="image/*" onchange="uploadImage(event, '${username}')">
    `;

    container.appendChild(card);
  });
}

// Upload Image function
function uploadImage(event, username) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);
  formData.append('username', username);

  fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.imageUrl) {
      document.getElementById(`img-${username}`).src = data.imageUrl;
      uploadedImages[username] = data.imageUrl; // update local cache
      alert(`Image for ${username} uploaded successfully!`);
    }
  })
  .catch(err => {
    console.error(err);
    alert('Upload failed!');
  });
}
