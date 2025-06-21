const auth = firebase.auth();
const db = firebase.firestore();

let jobs = [];
let currentUser = null;

const STATUS_LIST = [
    { key: "entry_consideration", label: "エントリー検討" },
    { key: "casual_chat", label: "カジュアル面談" },
    { key: "selection", label: "選考中" },
    { key: "offer_meeting", label: "オファー面談" }
  ];

document.getElementById("loginBtn").addEventListener("click", () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      currentUser = result.user;
      alert(`こんにちは、${currentUser.displayName}さん`);
      loadJobs();
    });
});

document.getElementById("addBtn").addEventListener("click", addJob);

function addJob() {
    const title = prompt("求人タイトルを入力してください");
    if (!title) return;
  
    const company = prompt("会社名を入力してください");
    if (!company) return;
  
    const url = prompt("求人のURLを入力してください（例：https://...）");
    if (!url) return;

    const entryDate = prompt("エントリー日を入力してください（例：2025-06-19）");
    if (!entryDate) return;
  
    const job = {
      title,
      company,
      url,
      entryDate,
      status: "entry_consideration" // ← ここを修正！
    };
    
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
      updateDashboard();  
    }
  });
}

function renderJobs() {
    const board = document.getElementById("board");
    board.innerHTML = "";
  
    STATUS_LIST.forEach(status => {
      const column = document.createElement("div");
      column.id = `col-${status.key}`; // 20250620追加！
      column.setAttribute("data-status", status.key); // 20250620追加
      column.className = "w-64 bg-white p-3 rounded shadow";
      column.innerHTML = `<h3 class="font-bold mb-3">${status.label}</h3>`;
  
      const columnJobs = jobs.filter(job => job.status === status.key);
      columnJobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "bg-gray-100 p-3 mb-2 rounded";
        card.innerHTML = `
          <p class="font-semibold">${job.title}</p>
          <p class="text-sm text-gray-600">${job.company}</p>
          <a href="${job.url}" class="text-blue-500 underline text-sm" target="_blank">求人を見る</a>
          ${job.entryDate ? `<p class="text-xs text-gray-500 mt-1">エントリー日：${job.entryDate}</p>` : ""}
          <p class="text-xs text-gray-400 mt-1">${status.label}</p>
        `;
        column.appendChild(card);
      });
  
      board.appendChild(column);
    });
    enableDragAndDrop(); // ← 最後に追加（renderJobsの末尾でOK）
  }
  
  auth.onAuthStateChanged(user => {
    if (user) {
      currentUser = user;
      document.getElementById("username").textContent = user.displayName;
      document.getElementById("logoutBtn").classList.remove("hidden");
      loadJobs();
    }
  });
  
  function logout() {
    auth.signOut().then(() => {
      location.reload();
    });
  }
  //20250615 看板移動
  function enableDragAndDrop() {
    STATUS_LIST.forEach(status => {
      const column = document.getElementById(`col-${status.key}`);
      new Sortable(column, {
        group: 'jobs',
        animation: 150,
        onEnd: (evt) => {
          const item = evt.item;
          const newStatus = evt.to.getAttribute('data-status');
          const title = item.getAttribute('data-title');
          const job = jobs.find(j => j.title === title);
          if (job) {
            job.status = newStatus;
            renderJobs();
            if (currentUser) {
              db.collection("users").doc(currentUser.uid).set({ jobs });
            }
          }
        }
      });
    });
  }

  // 20250620_updateDashboard() 関数の追加
  function updateDashboard() {
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) return;  // カンバンページでは無効化
  
    let html = "<h2 class='font-semibold text-lg mb-2'>📊 あなたの応募状況</h2><ul class='list-disc pl-5'>";
    STATUS_LIST.forEach(st => {
      const c = jobs.filter(j => j.status === st.key).length;
      html += `<li>${st.label}：${c} 件</li>`;
    });
    html += "</ul>";
    dashboard.innerHTML = html;
  }
  
  
