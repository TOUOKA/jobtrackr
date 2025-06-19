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
  const company = prompt("会社名を入力してください");
  const job = { title, company, status: "気になる" };
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
    div.className = "job";
    div.innerHTML = `<strong>${job.title}</strong><br>${job.company}<br>${job.status}`;
    list.appendChild(div);
  });
}
