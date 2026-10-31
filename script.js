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

// --- XỬ LÝ ĐĂNG NHẬP GOOGLE (Tương thích tuyệt đối trên Mobile & PC) ---
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
}

// Xử lý khi trang được tải xong
window.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra kết quả sau khi Google chuyển hướng trả về
    auth.getRedirectResult()
        .then((result) => {
            if (result.user) {
                currentUser = result.user;
                playerName = currentUser.displayName;
                updateAuthUI();
            }
        }).catch((error) => {
            console.error("Lỗi đăng nhập:", error);
        });

    // Lắng nghe trạng thái tài khoản thời gian thực
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            playerName = user.displayName;
            updateAuthUI();
        }
    });

    loadGlobalFeedbacks();
});

// Giao diện thẻ thông tin tài khoản sau khi đăng nhập thành công
function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (authContainer && currentUser) {
        authContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.08); padding: 10px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                <img src="${currentUser.photoURL}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid #34d399;">
                <div style="text-align: left; font-size: 14px; color: #fff;">
                    <strong>${playerName}</strong><br>
                    <span style="font-size: 11px; color: #34d399; font-weight: 500;">Đã liên kết Cloud thành công 🛡️</span>
                </div>
            </div>
        `;
    }
}

// --- LƯU ĐIỂM SỐ LÊN CLOUD FIRESTORE ---
function saveScoreToCloud(score, rankTitle) {
    if (!currentUser) return; // Chưa đăng nhập thì bỏ qua
    
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
                html += `<div style="background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; color: #fff; border-left: 3px solid #34d399;">
                    <strong>${data.name}:</strong> ${data.text}
                </div>`;
            });
            listContainer.innerHTML = html || "Chưa có đánh giá nào.";
        });
}


// ==========================================
// TOÀN BỘ LOGIC GAME CŨ CỦA CẬU (300 câu hỏi, Fisher-Yates shuffle, v.v.)
// Cậu dán toàn bộ phần code xử lý game cũ của mình ngay dưới dòng này:
// ==========================================
