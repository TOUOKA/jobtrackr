const auth = firebase.auth();
const db = firebase.firestore();

let jobs = [];
let currentUser = null;

document.getElementById("loginBtn").addEventListener("click", () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      currentUser = result.user;
      alert(`こんにちは、${currentUser.displayName}さん`);
      loadJobs();
    });
});

function addJob() {
    const title = prompt("求人タイトルを入力してください");
    if (!title) return;
  
    const company = prompt("会社名を入力してください");
    if (!company) return;
  
    const url = prompt("求人のURLを入力してください（例：https://...）");
    if (!url) return;
  
    const job = { title, company, url, status: "気になる" };
    jobs.push(job);
    renderJobs();
  
    if (currentUser) {
      db.collection("users").doc(currentUser.uid).set({ jobs });
    }
  } 

function loadJobs() {
  db.collection("users").doc(currentUser.uid).get().then(doc => {
    if (doc.exists) {
      jobs = doc.data().jobs || [];
      renderJobs();
    }
  });
}

function renderJobs() {
    const list = document.getElementById("job-list");
    list.innerHTML = "";
  
    jobs.forEach(job => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 mb-4 rounded-lg shadow-md";
  
      div.innerHTML = `
        <h2 class="text-lg font-semibold">${job.title}</h2>
        <p class="text-sm text-gray-600">${job.company}</p>
        <a href="${job.url}" target="_blank" class="text-blue-600 underline text-sm">求人を見る</a>
        <p class="text-xs text-gray-400 mt-1">${job.status}</p>
      `;
  
      list.appendChild(div);
    });
  }
  
  
