// Function to render all cards
function renderCards() {
  container.innerHTML = '';

  filteredUsers.forEach(user => {
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
    `;

    container.appendChild(card);
  });
}
