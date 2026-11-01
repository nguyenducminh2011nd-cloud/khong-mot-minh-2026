// --- CẤU HÌNH FIREBASE AN TOÀN (CHỐNG TREO KHI BỊ CHẶN MẠNG) ---
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        const firebaseConfig = {
            apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
            authDomain: "khongmotminh2026.firebaseapp.com",
            projectId: "khongmotminh2026",
            storageBucket: "khongmotminh2026.fireappstorage.app",
            messagingSenderId: "391078149804",
            appId: "1:391078149804:web:9ba69127156c66e6966909",
            measurementId: "G-BFXSCXN4Q0"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
    }
} catch (e) {
    console.warn("Firebase không khả dụng hoặc bị chặn:", e);
}

const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai!",
    "⚡ Thử thách đỉnh cao: Khó (40đ/câu) & Hack Não (100đ/câu), cày điểm bứt phá rank!",
    "🔥 Cẩn thận: Các đáp án đều được cân bằng độ dài, hãy tư duy logic để vượt ải!"
];

function getPlayerRank(score) {
    if (score >= 600) return { name: "🏆 Thách Đấu", color: "#f43f5e" };
    if (score >= 400) return { name: "💎 Kim Cương", color: "#38bdf8" };
    if (score >= 200) return { name: "🥇 Vàng", color: "#fbbf24" };
    if (score >= 80)  return { name: "🥈 Bạc", color: "#94a3b8" };
    return { name: "🥉 Đồng", color: "#cd7f32" };
}

// --- KHO 15 CÂU KHÓ & HACK NÃO ---
const questionPools = {
    kho: [
        { q: "1. Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức và báo công an địa phương", "Chuyển tiền vào tài khoản để chứng minh trong sạch", "Cung cấp mã OTP qua điện thoại cho người gọi", "Hẹn gặp trực tiếp người gọi ở nơi vắng vẻ"], correct: "Cúp máy ngay lập tức và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "2. Tin nhắn MXH thông báo trúng thưởng xe máy lớn nhưng phải nộp khoản phí làm thủ tục. Bạn làm gì?", options: ["Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", "Nộp tiền phí qua thẻ cào để nhận thưởng lớn", "Gửi ảnh chụp thẻ ngân hàng cho người thông báo", "Chia sẻ bài viết công khai để nhận xe nhanh"], correct: "Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "3. Tuyển cộng tác viên online thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu nhận diện lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước để mua đơn hàng", "Công ty trả lương qua ngân hàng chính thống", "Có hợp đồng ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào từ đầu"], correct: "Yêu cầu nộp tiền ứng trước để mua đơn hàng", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" },
        { q: "4. Nhận đường link lạ từ bạn bè giục click xem video hot hoặc hình ảnh cá nhân. Rủi ro lớn nhất là gì?", options: ["Dính mã độc đánh cắp tài khoản và thông tin", "Chỉ làm tốn dung lượng kết nối mạng 4G", "Không có rủi ro gì vì do bạn bè gửi tặng", "Làm thiết bị di động chạy mượt mà hơn"], correct: "Dính mã độc đánh cắp tài khoản và thông tin", explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động phát tán link mã độc!" },
        { q: "5. Khi đặt mật khẩu tài khoản quan trọng, cấu trúc nào mang lại mức độ an toàn cao nhất?", options: ["Kết hợp chữ hoa, thường, số và ký tự đặc biệt", "Sử dụng ngày tháng năm sinh của bản thân", "Sử dụng dãy số liên tiếp từ một đến tám", "Dùng chung một mật khẩu duy nhất mọi nơi"], correct: "Kết hợp chữ hoa, thường, số và ký tự đặc biệt", explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động." },
        { q: "6. Nhận cuộc gọi thông báo sim sắp bị khóa cần chuẩn hóa thông tin gấp. Bạn nên làm gì?", options: ["Tự đến điểm giao dịch nhà mạng để kiểm tra", "Đọc ngay mã OTP vừa nhận được cho người gọi", "Chuyển khoản tiền theo hướng dẫn để mở sim", "Cung cấp toàn bộ số series thẻ sim cho họ"], correct: "Tự đến điểm giao dịch nhà mạng để kiểm tra", explain: "💡 Đối tượng giả mạo nhà mạng để chiếm quyền kiểm soát sim nhằm lấy mã OTP." },
        { q: "7. Thấy ứng dụng vay tiền online lãi suất 0% yêu cầu truy cập danh bạ điện thoại. Nguy cơ là gì?", options: ["Bị khủng bố danh bạ người thân khi nợ ảo", "Được duyệt khoản vay miễn phí không trả", "Ứng dụng giúp tăng cường bảo mật máy", "Không có ảnh hưởng gì tới thông tin số"], correct: "Bị khủng bố danh bạ người thân khi nợ ảo", explain: "💡 App vay tín dụng đen sẽ dùng danh bạ để bôi nhọ, tống tiền bạn và người thân." },
        { q: "8. Nhận email thông báo tài khoản ngân hàng bị đăng nhập trái phép yêu cầu click link đổi pass. Bạn xử lý sao?", options: ["Mở app ngân hàng chính thức để kiểm tra lại", "Click ngay vào đường link đính kèm trong email", "Gửi mật khẩu cũ qua email để họ xác thực", "Chuyển tiếp email cho bạn bè cùng kiểm tra"], correct: "Mở app ngân hàng chính thức để kiểm tra lại", explain: "💡 Đây là email Phishing giả mạo nhằm đánh cắp thông tin tài khoản." },
        { q: "9. Khách mua hàng online gửi ảnh chụp màn hình đã chuyển khoản thành công và giục gửi hàng gấp. Bạn làm gì?", options: ["Kiểm tra số dư thực tế tăng trên app ngân hàng", "Tin tưởng ngay vì đã có ảnh chụp hóa đơn", "Nhấp vào đường link khách gửi để nhận tiền", "Cung cấp mã OTP ngân hàng để nhận tiền về"], correct: "Kiểm tra số dư thực tế tăng trên app ngân hàng", explain: "💡 Kẻ lừa đảo sử dụng các phần mềm tạo bill chuyển tiền giả rất tinh vi." },
        { q: "10. Người quen trên mạng nhắn tin hỏi mượn tiền gấp do gặp tai nạn bất ngờ. Việc đầu tiên cần làm là?", options: ["Gọi điện trực tiếp bằng số di động xác nhận", "Chuyển tiền ngay vì số tài khoản đúng tên", "Nhắn tin hỏi lý do chi tiết qua khung chat", "Nạp thẻ điện thoại hộ ngay lập tức cho họ"], correct: "Gọi điện trực tiếp bằng số di động xác nhận", explain: "💡 Tài khoản mạng xã hội của người quen có thể đã bị chiếm đoạt để đi lừa đảo." },
        { q: "11. Phát hiện bài viết trên Facebook chia sẻ hoàn cảnh khó khăn kêu gọi từ thiện bằng số tài khoản lạ. Bạn nên:", options: ["Kiểm tra kỹ tính xác thực từ cơ quan báo chí uy tín", "Chuyển khoản ngay lập tức để kịp thời giúp đỡ", "Bình luận số tiền mình đã gửi để khoe khoang", "Chia sẻ bài viết rộng rãi lên trang cá nhân"], correct: "Kiểm tra kỹ tính xác thực từ cơ quan báo chí uy tín", explain: "💡 Nhiều đối tượng lợi dụng lòng trắc ẩn để lập tài khoản từ thiện ảo chiếm đoạt tiền." },
        { q: "12. Bạn nhận được mã OTP xác nhận giao dịch mặc dù bạn không hề thực hiện bất kỳ giao dịch nào. Việc cần làm là:", options: ["Khóa thẻ tạm thời và liên hệ ngay ngân hàng", "Bỏ qua vì nghĩ rằng hệ thống nhắn nhầm", "Gửi mã OTP đó cho người hỏi mua hàng trực tuyến", "Đăng tải toàn bộ thông tin thẻ lên mạng xã hội"], correct: "Khóa thẻ tạm thời và liên hệ ngay ngân hàng", explain: "💡 Tài khoản của bạn có thể đang bị kẻ gian tấn công dò quét thanh toán trái phép." },
        { q: "13. Khi kết nối vào mạng Wi-Fi miễn phí tại quán cà phê, bạn tuyệt đối nên tránh thực hiện hành động nào?", options: ["Đăng nhập tài khoản ngân hàng và chuyển tiền", "Đọc báo giải trí và xem tin tức thời sự hàng ngày", "Tìm kiếm thông tin học tập qua các trang web", "Xem video ngắn giải trí trên các nền tảng"], correct: "Đăng nhập tài khoản ngân hàng và chuyển tiền", explain: "💡 Wi-Fi công cộng không bảo mật dễ bị kẻ xấu đánh cắp thông tin đăng nhập." },
        { q: "14. Một người tự xưng là nhân viên sàn thương mại điện tử gọi điện thông báo hoàn tiền sản phẩm. Thao tác an toàn là:", options: ["Cúp máy và từ chối cung cấp bất kỳ thông tin gì", "Làm theo hướng dẫn bấm vào link trên điện thoại", "Cung cấp số thẻ tín dụng để nhận tiền hoàn trả", "Đọc mã OTP ngân hàng gửi về để hoàn tất thủ tục"], correct: "Cúp máy và từ chối cung cấp bất kỳ thông tin gì", explain: "💡 Sàn thương mại điện tử không bao giờ gọi điện hoàn tiền qua các đường link lạ." },
        { q: "15. Khi máy tính cá nhân xuất
