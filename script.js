const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const filters = document.querySelectorAll(".filter button");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function renderJobs(filter = "All") {
  jobList.innerHTML = "";

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  filteredJobs.forEach((job) => {
  const realIndex = jobs.indexOf(job);

  const li = document.createElement("li");
  li.className = "job-item";
  li.innerHTML = `
    <div>
      <span>${job.company}</span> - ${job.position} (${job.status})
    </div>
    <button class="delete-btn" onclick="deleteJob(${realIndex})">Delete</button>
  `;

  jobList.appendChild(li);
});
}

function deleteJob(index) {
  jobs.splice(index, 1);
  saveJobs();
  renderJobs();
}

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = document.getElementById("company").value;
  const position = document.getElementById("position").value;
  const status = document.getElementById("status").value;

  jobs.push({ company, position, status });
  saveJobs();
  renderJobs();

  jobForm.reset();
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    renderJobs(btn.dataset.status);
  });
});

renderJobs();
