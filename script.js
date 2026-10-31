// --- CẤU HÌNH FIREBASE CHO DỰ ÁN ---
const firebaseConfig = {
    apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
    authDomain: "khongmotminh2026.firebaseapp.com",
    projectId: "khongmotminh2026",
    storageBucket: "khongmotminh2026.appspot.com",
    messagingSenderId: "391078149804",
    appId: "1:391078149804:web:9ba69127156c66e6966909",
    measurementId: "G-BFXSCXN4Q0"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let playerName = "Khách ẩn danh";

// --- XỬ LÝ ĐĂNG NHẬP GOOGLE ---
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            currentUser = result.user;
            playerName = currentUser.displayName;
            
            const authContainer = document.getElementById('auth-container');
            if (authContainer) {
                authContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.08); padding: 10px; border-radius: 10px;">
                        <img src="${currentUser.photoURL}" style="width: 32px; height: 32px; border-radius: 50%;">
                        <div style="text-align: left; font-size: 13px; color: #fff;">
                            <strong>${playerName}</strong><br>
                            <span style="font-size: 11px; color: #34d399;">Đã liên kết tài khoản Google 🛡️</span>
                        </div>
                    </div>
                `;
            }
            alert(`🎉 Chào mừng ${playerName} đã đăng nhập thành công!`);
        })
        .catch((error) => {
            console.error("Lỗi đăng nhập:", error);
            alert("⚠️ Đăng nhập không thành công. Cậu vui lòng thử lại nhé!");
        });
}

// --- LƯU ĐIỂM SỐ LÊN CLOUD FIRESTORE ---
function saveScoreToCloud(score, rankTitle) {
    if (!currentUser) return; // Nếu chưa đăng nhập thì bỏ qua
    
    db.collection("leaderboard").doc(currentUser.uid).set({
        name: currentUser.displayName,
        photo: currentUser.photoURL,
        score: score,
        rank: rankTitle,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Đã đồng bộ điểm lên bảng xếp hạng chung!");
    }).catch((error) => {
        console.error("Lỗi lưu điểm:", error);
    });
}

// --- GỬI VÀ HIỂN THỊ ĐÁNH GIÁ CHUNG ---
function submitHomeFeedback() {
    const input = document.getElementById('home-feedback-input');
    const text = input ? input.value.trim() : "";
    
    if (!text) {
        alert("Cậu vui lòng viết vài dòng đánh giá trước khi gửi nhé!");
        return;
    }

    let authorName = currentUser ? currentUser.displayName : "Khách ẩn danh";

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
    });
}

// Tải danh sách đánh giá từ đám mây
function loadGlobalFeedbacks() {
    const listContainer = document.getElementById('global-feedback-list');
    if (!listContainer) return;

    db.collection("feedbacks").orderBy("timestamp", "desc").limit(5).get()
        .then((querySnapshot) => {
            let html = "";
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                html += `<div style="background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 6px; margin-bottom: 6px; color: #fff;">
                    <strong>${data.name}:</strong> ${data.text}
                </div>`;
            });
            listContainer.innerHTML = html || "Chưa có đánh giá nào.";
        });
}

// Tự động tải đánh giá khi mở trang
window.addEventListener('DOMContentLoaded', () => {
    loadGlobalFeedbacks();
});


// ==========================================
// TOÀN BỘ LOGIC GAME CŨ CỦA CẬU (300 câu hỏi, Fisher-Yates shuffle, v.v.)
// Cậu tiếp tục dán phần code game cũ của mình ngay dưới đây nhé:
// ==========================================
