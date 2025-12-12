// First, fetch uploaded images from the server
let uploadedImages = {};

fetch('http://localhost:3001/uploads-data')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      uploadedImages[item.username] = item.imageUrl;
    });
    renderCards(); // now render cards
  })
  .catch(err => {
    console.error("Failed to load uploaded images", err);
    renderCards(); // render anyway
  });

// Function to render cards
function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = '';

  users.forEach(user => {
    const username = user.name.replace(/\s/g,'');
    const imgSrc = uploadedImages[username] || user.image; // use uploaded image if exists

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

// Upload Image function remains same
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
