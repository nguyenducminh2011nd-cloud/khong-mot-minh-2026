// --- CẤU HÌNH CHUẨN XÁC TỪ GOOGLE CLOUD & FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
    authDomain: "khongmotminh2026.firebaseapp.com",
    projectId: "khongmotminh2026",
    storageBucket: "khongmotminh2026.fireappstorage.app",
    messagingSenderId: "391078149804",
    appId: "1:391078149804:web:9ba69127156c66e6966909",
    measurementId: "G-BFXSCXN4Q0"
};

// Khởi tạo Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

// --- ĐĂNG NHẬP GOOGLE ---
window.loginWithGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        console.log("Đăng nhập thành công:", result.user);
    }).catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        alert("Lỗi đăng nhập: " + error.message);
    });
};

// --- GỬI ĐÁNH GIÁ ---
window.submitHomeFeedback = function() {
    const input = document.getElementById('home-feedback-input');
    const text = input ? input.value.trim() : "";
    
    if (!text) {
        alert("Cậu vui lòng viết vài dòng đánh giá trước khi gửi nhé!");
        return;
    }

    let authorName = currentUser && currentUser.displayName ? currentUser.displayName : "Khách ẩn danh";

    db.collection("feedbacks").add({
        name: authorName,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        input.value = "";
        alert("❤️ Cảm ơn cậu đã gửi đánh giá lên hệ thống chung!");
        loadGlobalFeedbacks();
    }).catch((error) => {
        console.error("Lỗi gửi đánh giá:", error);
        alert("Không thể gửi đánh giá do thiếu quyền hoặc lỗi mạng!");
    });
};

// --- TẢI ĐÁNH GIÁ ---
function loadGlobalFeedbacks() {
    const listContainer = document.getElementById('global-feedback-list');
    if (!listContainer) return;

    db.collection("feedbacks").orderBy("timestamp", "desc").limit(5).get()
        .then((querySnapshot) => {
            let html = "";
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                html += `<div style="background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; color: #fff; border-left: 3px solid #34d399;">
                    <strong>${data.name || "Khách"}:</strong> ${data.text}
                </div>`;
            });
            listContainer.innerHTML = html || "Chưa có đánh giá nào.";
        }).catch((err) => {
            console.log("Lỗi tải đánh giá:", err);
            listContainer.innerHTML = "Chưa thể tải dữ liệu từ Firestore.";
        });
}

// --- THEO DÕI TRẠNG THÁI ĐĂNG NHẬP ---
auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById('auth-container');
    if (user) {
        currentUser = user;
        if (authContainer) {
            authContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.85); padding: 6px 14px; border-radius: 30px; border: 1px solid rgba(52,211,153,0.4);">
                    <img src="${user.photoURL}" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid #34d399;">
                    <div style="text-align: left; font-size: 13px; color: #fff;">
                        <strong>${user.displayName}</strong><br>
                        <span style="font-size: 10px; color: #34d399;">Đã kết nối Cloud 🛡️</span>
                    </div>
                </div>
            `;
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadGlobalFeedbacks();
});
