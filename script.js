const waterPoints = [
  {id:7, name:"Indoor Complex Stadium Water Point", location:"In front of Indoor Complex Stadium", block:"Sports Area", status:"working", updated:"Verified"},
  {id:8, name:"BH1 Food Court Water Point", location:"Food Court near BH1", block:"BH1", status:"working", updated:"Verified"},
  {id:9, name:"BH2 Food Court Water Point", location:"In front of BH2 Food Court", block:"BH2", status:"working", updated:"Verified"},
  {id:10, name:"DSW Block 14 Water Point", location:"DSW Block 14", block:"Block 14", status:"working", updated:"Verified"},
  {id:11, name:"UniCentre Mall Water Point", location:"UniCentre Mall", block:"UniCentre", status:"working", updated:"Verified"},
  {id:12, name:"UniHospital Water Point", location:"UniHospital", block:"Hospital", status:"working", updated:"Verified"},
  {id:13, name:"Central Library Water Point", location:"Central Library", block:"Library", status:"working", updated:"Verified"},
  {id:14, name:"Unipolis Water Point", location:"Unipolis", block:"Unipolis", status:"working", updated:"Verified"},
  {id:15, name:"Main Gate Water Point", location:"Main Gate – Entry/Exit", block:"Main Gate", status:"working", updated:"Verified"},
];

const grid = document.getElementById("waterGrid");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const resultCount = document.getElementById("resultCount");
const toast = document.getElementById("toast");

function statusLabel(status){
  return status === "working" ? "Working · sample" : status === "maintenance" ? "Under maintenance" : "Needs checking";
}
function renderPoints(){
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const filtered = waterPoints.filter(point =>
    (point.name + " " + point.location + " " + point.block).toLowerCase().includes(query) &&
    (status === "all" || point.status === status)
  );
  resultCount.textContent = `Showing ${filtered.length} of ${waterPoints.length} sample water points`;
  grid.innerHTML = "";
  if(!filtered.length){
    grid.innerHTML = '<div class="empty-state">No matching water points found. Try another block or clear the filters.</div>';
    return;
  }
  filtered.forEach(point => {
    const card = document.createElement("article");
    card.className = "water-card";
    card.innerHTML = `
      <div class="card-top"><span class="location-icon">⌖</span><span class="status status-${point.status}">${statusLabel(point.status)}</span></div>
      <h3>${escapeHTML(point.name)}</h3>
      <p class="card-location">${escapeHTML(point.location)}</p>
      <div class="card-bottom"><span>◷ ${point.updated}</span><button type="button" data-details="${point.id}">View details →</button></div>`;
    grid.appendChild(card);
  });
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
searchInput.addEventListener("input", renderPoints);
statusFilter.addEventListener("change", renderPoints);
document.getElementById("searchButton").addEventListener("click", renderPoints);
document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = ""; statusFilter.value = "all"; renderPoints();
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-details]");
  if(!button) return;
  const point = waterPoints.find(item => item.id === Number(button.dataset.details));
  if(point) showToast(`${point.name}: ${statusLabel(point.status)}. This is illustrative demo data.`);
});

document.querySelectorAll(".map-pin").forEach(pin => {
  pin.addEventListener("click", () => {
    const point = waterPoints.find(item => item.id === Number(pin.dataset.point));
    if(point) document.getElementById("mapTooltip").textContent = `${point.name} — ${statusLabel(point.status)} (sample)`;
  });
});

const modal = document.getElementById("reportModal");
const openModal = () => { modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; };
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
document.querySelectorAll("[data-open-report]").forEach(button => button.addEventListener("click", openModal));
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if(event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if(event.key === "Escape") closeModal(); });

document.getElementById("issueForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const report = {
    location: form.get("location").trim(),
    issue: form.get("issue"),
    details: form.get("details").trim(),
    submittedAt: new Date().toISOString()
  };
  const reports = JSON.parse(localStorage.getItem("aquafindReports") || "[]");
  reports.push(report);
  localStorage.setItem("aquafindReports", JSON.stringify(reports));
  document.getElementById("formFeedback").textContent = "Your demo report has been saved on this device. It has not been sent to campus maintenance.";
  event.currentTarget.reset();
  showToast("Demo report saved on this device.");
});

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
}));

// Optional keyboard shortcut: Ctrl/Cmd + K focuses the water-point search.
document.addEventListener("keydown", event => {
  if((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k"){
    event.preventDefault(); searchInput.focus(); document.getElementById("find").scrollIntoView({behavior:"smooth"});
  }
});

renderPoints();
