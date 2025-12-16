<html>
<head>
  <title>AbidKhan_ELearningHub</title>
</head>
<body>
<div class="grid" id="tutorialContainer"></div>
  </body>
const tutorials = [
  {
    name: "Web & Software Development",
    category: "IT",
    image: "https://via.placeholder.com/300x140?text=Web+Development",
    description: "React, Node.js, HTML, CSS, JavaScript, Git, and deployment workflows.",
    url: "course-webdev.html"
  },
  {
    name: "Data Science & Analytics",
    category: "Data Science",
    image: "https://via.placeholder.com/300x140?text=Data+Science",
    description: "Python, pandas, visualization, machine learning basics, hands-on projects.",
    url: "course-datascience.html"
  },
  {
    name: "Cloud Computing",
    category: "Cloud",
    image: "https://via.placeholder.com/300x140?text=Cloud+Computing",
    description: "AWS fundamentals, serverless concepts, deploying applications to cloud providers.",
    url: "course-cloud.html"
  },
  {
    name: "Cybersecurity Essentials",
    category: "Cybersecurity",
    image: "https://via.placeholder.com/300x140?text=Cybersecurity",
    description: "Security fundamentals, best practices, secure coding, basic pentesting exercises.",
    url: "course-cybersecurity.html"
  },
  {
    name: "Graphic Designing",
    category: "Design",
    image: "https://via.placeholder.com/300x140?text=Graphic+Design",
    description: "Corel Draw, Adobe Illustrator, Photoshop, InDesign, Canva tutorials.",
    url: "course-graphic.html"
  },
  {
    name: "Digital Marketing",
    category: "Marketing",
    image: "https://via.placeholder.com/300x140?text=Digital+Marketing",
    description: "SEO, social media marketing, content creation, and ad campaigns.",
    url: "course-marketing.html"
  },
  {
    name: "Quran Tutorials",
    category: "Quran",
    image: "https://via.placeholder.com/300x140?text=Quran",
    description: "Learn Holy Quran with proper recitation, tajweed, and interpretation.",
    url: "course-quran.html"
  },
  {
    name: "O-Level Subjects",
    category: "O-Level",
    image: "https://via.placeholder.com/300x140?text=O-Level",
    description: "Mathematics, Physics, Chemistry, Biology, Computer Science tutorials online.",
    url: "course-olevel.html"
  },
  {
    name: "A-Level Subjects",
    category: "A-Level",
    image: "https://via.placeholder.com/300x140?text=A-Level",
    description: "Mathematics, Physics, Chemistry, Biology, Computer Science, Economics, Accounting.",
    url: "course-alevel.html"
  },
  {
    name: "Architect Software",
    category: "Design",
    image: "https://via.placeholder.com/300x140?text=Architect+Software",
    description: "AutoCAD, Revit, 3ds Max, Maya tutorials for architecture and design projects.",
    url: "course-architect.html"
  },
  {
    name: "WordPress Web & App Development",
    category: "IT",
    image: "https://via.placeholder.com/300x140?text=WordPress",
    description: "Build websites and apps using WordPress with themes, plugins, and deployment.",
    url: "course-wordpress.html"
  }
];

// Render tutorials dynamically
const container = document.getElementById("tutorialContainer");

function renderTutorials(filteredTutorials = tutorials) {
  container.innerHTML = "";
  filteredTutorials.forEach(course => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${course.image}" alt="${course.name}">
      <h3>${course.name}</h3>
      <p>${course.description}</p>
      <a class="btn" href="${course.url}">View Tutorial</a>
    `;
    container.appendChild(card);
  });
}

// Filter dropdown
function filterByCategory(category) {
  if (category === "All") {
    renderTutorials();
  } else {
    renderTutorials(tutorials.filter(t => t.category === category));
  }
}

// Initial render
renderTutorials();
</html>
