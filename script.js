const filters = [
  "Todos",
  "Lo más vendido",
  "Nuevos",
  "Rock",
  "Anime",
  "Minimal",
  "Vintage",
];

const products = [
  { id:1, name:"Essential Blank Tee", price:29, category:"Minimal", image:"assets/minimal.jpg", badge:"POPULAR" },
  { id:2, name:"Skull Horns Tee", price:42, category:"Rock", image:"assets/guns.png", badge:"POPULAR" },
  { id:3, name:"Anime Character Tee", price:39, category:"Nuevos", image:"assets/rock4.jpg", badge:"Nuevos" },
  { id:4, name:"Retro Rider Tee", price:38, category:"Vintage", image:"assets/naruto.png", badge:"NUEVO" },
  { id:5, name:"Kanji Oversized Tee", price:44, category:"Anime", image:"assets/anime2.webp", badge:"POPULAR" },
  { id:6, name:"Geometric Edge Tee", price:39, category:"Anime", image:"assets/3333.jpg", badge:"" },
  { id:7, name:"Oversized Premium Blank", price:34, category:"Anime", image:"assets/CamisetaAnimeLetrasJapones.webp", badge:"" },
  { id:8, name:"Heritage Vintage Wash", price:42, category:"Vintage", image:"assets/negro.jpg", badge:"POPULAR" },
];

let activeFilter = "Todos";

const filtersContainer = document.getElementById("filters");
const productsContainer = document.getElementById("products");

function renderFilters() {
  filtersContainer.innerHTML = "";

  filters.forEach(filter => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (filter === activeFilter ? " active" : "");
    btn.textContent = filter;

    btn.onclick = () => {
      activeFilter = filter;
      renderFilters();
      renderProducts();
    };

    filtersContainer.appendChild(btn);
  });
}

function getFilteredProducts() {
  if (activeFilter === "Todos") return products;
  if (activeFilter === "Lo más vendido") {
    return products.filter(p => p.badge === "POPULAR");
  }
  return products.filter(p => p.category === activeFilter);
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productsContainer.innerHTML = "";

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-wrapper">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <img src="${p.image}">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>€${p.price.toFixed(2)}</p>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}


const benefits = [
  "Algodón 100% orgánico",
  "Tintas eco-friendly",
  "Lavado garantizado",
  "Envíos rápidos"
];

const benefitsContainer = document.getElementById("benefits");

benefits.forEach(b => {
  const div = document.createElement("div");
  div.className = "benefit-card";
  div.innerHTML = `<div class="benefit-icon">✦</div><p>${b}</p>`;
  benefitsContainer.appendChild(div);
});


const testimonials = [
  { text:"La calidad de la tela es increíble.", author:"María G." },
  { text:"Me diseñé mi propia camiseta.", author:"Carlos R." },
  { text:"Los diseños de anime son brutales.", author:"Ana P." },
  { text:"Envío rápido y calidad premium.", author:"Diego M." }
];

const testContainer = document.getElementById("testimonials");

testimonials.forEach(t => {
  const div = document.createElement("article");
  div.className = "testimonial-card";

  div.innerHTML = `
    <div class="stars">★★★★★</div>
    <p class="testimonial-text">"${t.text}"</p>
    <strong>${t.author}</strong>
  `;

  testContainer.appendChild(div);
});

renderFilters();
renderProducts();

document.getElementById("customForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;

  fetch("https://api.hsforms.com/submissions/v3/integration/submit/TU_PORTAL_ID/TU_FORM_ID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: [
        {
          name: "email",
          value: email
        }
      ]
    })
  })
  .then(res => {
    if (res.ok) {
      alert("🔥 Te suscribiste correctamente");
      document.getElementById("customForm").reset();
    } else {
      alert("❌ Error al enviar");
    }
  })
  .catch(() => alert("❌ Error de conexión"));
});