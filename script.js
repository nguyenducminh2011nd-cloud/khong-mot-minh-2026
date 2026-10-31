// --- CẤU HÌNH FIREBASE CHUẨN XÁC ---
const firebaseConfig = {
    apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
    authDomain: "khongmotminh2026.firebaseapp.com",
    projectId: "khongmotminh2026",
    storageBucket: "khongmotminh2026.appspot.com",
    messagingSenderId: "391078149804",
    appId: "1:391078149804:web:9ba69127156c66e6966909",
    measurementId: "G-BFXSCXN4Q0"
};

// Khởi tạo Firebase nếu chưa có
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let playerName = "Khách ẩn danh";

// --- XỬ LÝ ĐĂNG NHẬP GOOGLE TOÀN CỤC (BẤM LÀ CHẠY NGAY) ---
window.loginWithGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider).catch((error) => {
        console.error("Lỗi chuyển hướng đăng nhập:", error);
        alert("Lỗi đăng nhập: " + error.message);
    });
};

// --- GỬI ĐÁNH GIÁ TRỰC TIẾP ---
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
        alert("Không thể gửi đánh giá. Cậu kiểm tra lại kết nối nhé!");
    });
};

// Tải danh sách đánh giá từ đám mây
function loadGlobalFeedbacks() {
    const listContainer = document.getElementById('global-feedback-list');
    if (!listContainer) return;

    db.collection("feedbacks").orderBy("timestamp", "desc").limit(5).get()
        .then((querySnapshot) => {
            let html = "";
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                html += `<div style="background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; color: #fff; border-left: 3px solid #34d399; text-align: left;">
                    <strong>${data.name || "Khách"}:</strong> ${data.text}
                </div>`;
            });
            listContainer.innerHTML = html || "Chưa có đánh giá nào.";
        }).catch((err) => {
            console.log("Lỗi tải đánh giá:", err);
        });
}

// Lắng nghe trạng thái đăng nhập thời gian thực
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        playerName = user.displayName;
        const authContainer = document.getElementById('
