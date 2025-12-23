function setupForm(formId, listId, fields, cardClass) {
  const form = document.getElementById(formId);
  if (!form) return; // Skip if form not found on this page

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Build card dynamically
    let card = `<div class="${cardClass}">`;
    fields.forEach(f => {
      card += `<p><strong>${f.label}:</strong> ${formData.get(f.name)}</p>`;
    });
    card += "</div>";

    // Append to list
    document.getElementById(listId).insertAdjacentHTML("beforeend", card);

    // Optional: Save to backend
    // fetch(`/api/add${cardClass}`, { method: "POST", body: JSON.stringify(Object.fromEntries(formData)) });
  });
}
