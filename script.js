// --- CẤU HÌNH FIREBASE AN TOÀN ---
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
    console.warn("Firebase không khả dụng:", e);
}

const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai!",
    "⚡ Thử thách đỉnh cao: Khó (50đ/câu) & Hack Não (100đ/câu), cày điểm bứt phá rank!",
    "🔥 Cẩn thận: Các đáp án đều được cân bằng độ dài, hãy tư duy logic để vượt ải!"
];

function getPlayerRank(score) {
    if (score >= 3000) return { name: "🏆 Thách Đấu", color: "#f43f5e" };
    if (score >= 1500) return { name: "💎 Kim Cương", color: "#38bdf8" };
    if (score >= 700)  return { name: "🥇 Vàng", color: "#fbbf24" };
    if (score >= 300)  return { name: "🥈 Bạc", color: "#94a3b8" };
    return { name: "🥉 Đồng", color: "#cd7f32" };
}

// --- KHO 20 CÂU HỎI MỖI CHẾ ĐỘ ---
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
        { q: "15. Khi máy tính cá nhân xuất hiện phần mềm lạ tự động cài đặt và trình duyệt liên tục bật trang quảng cáo, bạn nên:", options: ["Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", "Tắt máy đi ngủ và hy vọng ngày mai sẽ hết", "Mua thêm một chiếc máy tính xách tay mới", "Đổi mật khẩu tài khoản mạng xã hội ngay lập tức"], correct: "Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", explain: "💡 Máy tính đã bị nhiễm Adware hoặc phần mềm độc hại cần được xử lý dứt điểm." },
        { q: "16. Bạn nhận được một đường link chia sẻ video nhạy cảm từ bạn thân trên Messenger kèm theo câu nói 'Xem đi, bất ngờ lắm'. Bạn nên làm gì?", options: ["Cảnh báo bạn thân tài khoản đã bị hack, tuyệt đối không click", "Click vào xem ngay vì người quen gửi chắc chắn an toàn", "Tải video về máy để xem offline cho mượt", "Chia sẻ tiếp cho nhóm lớp cùng xem"], correct: "Cảnh báo bạn thân tài khoản đã bị hack, tuyệt đối không click", explain: "💡 Đây là dạng link mã độc tự động phát tán qua tài khoản đã bị chiếm đoạt." },
        { q: "17. Khi tạo mật khẩu cho các tài khoản mạng xã hội, thói quen nào dễ khiến bạn bị hacker chiếm đoạt tài sản số nhất?", options: ["Dùng chung một mật khẩu đơn giản cho mọi tài khoản", "Đổi mật khẩu định kỳ 3 tháng một lần", "Sử dụng trình quản lý mật khẩu an toàn", "Bật tính năng xác thực 2 bước (2FA)"], correct: "Dùng chung một mật khẩu đơn giản cho mọi tài khoản", explain: "💡 Lộ một nơi là mất toàn bộ hệ thống tài khoản liên kết!" },
        { q: "18. Hành vi nào sau đây vi phạm Luật An ninh mạng khi sử dụng mạng xã hội tại Việt Nam?", options: ["Đăng tải, phát tán thông tin sai sự thật xúc phạm danh dự người khác", "Đăng ảnh đi chơi cùng gia đình và bạn bè lên Facebook", "Nhắn tin trò chuyện vui vẻ với bạn bè qua Zalo", "Cập nhật tiểu sử cá nhân và sở thích âm nhạc"], correct: "Đăng tải, phát tán thông tin sai sự thật xúc phạm danh dự người khác", explain: "💡 Phát tán tin giả, bôi nhọ người khác trên không gian mạng là hành vi vi phạm pháp luật." },
        { q: "19. Khi mua hàng trên mạng, cách thanh toán nào giảm thiểu tối đa rủi ro bị lừa đảo mất trắng tiền?", options: ["Kiểm tra hàng trước rồi mới thanh toán (COD)", "Chuyển khoản toàn bộ 100% trước khi nhận hàng", "Đặt cọc trước 50% qua tài khoản cá nhân người bán lạ", "Chuyển tiền qua thẻ cào điện thoại theo yêu cầu"], correct: "Kiểm tra hàng trước rồi mới thanh toán (COD)", explain: "💡 Hình thức thanh toán khi nhận hàng (COD) sau khi kiểm tra giúp bảo vệ người mua tốt nhất." },
        { q: "20. Nếu phát hiện thông tin cá nhân của mình bị kẻ gian lợi dụng đi lừa đảo người khác, bạn cần làm gì?", options: ["Trình báo ngay cơ quan công an gần nhất và thông báo cho người thân", "Giữ im lặng và âm thầm khóa tài khoản cá nhân", "Lập một tài khoản mới và không quan tâm nữa", "Nhờ bạn bè lên mạng tranh cãi với kẻ gian"], correct: "Trình báo ngay cơ quan công an gần nhất và thông báo cho người thân", explain: "💡 Cần nhanh chóng thông báo cơ quan chức năng để tránh vướng vào vòng lao lý." }
    ],
    hacknao: [
        { q: "1. Nhận tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa tống tiền. Hiện tượng này do đâu?", options: ["Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", "Điện thoại tự động phát tán tin nhắn lúc nửa đêm", "Nhà mạng đang thử nghiệm hệ thống tin nhắn mới", "Do cài đặt lịch hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang tột độ!" },
        { q: "2. Rau bán iPhone đời mới giá rẻ bất ngờ với lý do hàng trưng bày không dùng đến. Bạn đánh giá sao?", options: ["Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", "Cơ hội hiếm có nên cần chuyển khoản cọc liền", "Hàng chính hãng uy tín nên mới có giá rẻ như vậy", "Mua trực tiếp vì hàng trưng bày luôn siêu rẻ"], correct: "Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" },
        { q: "3. Người quen qua mạng chưa gặp mặt muốn gửi quà lớn nhưng bắt đóng thuế hải quan qua tài khoản cá nhân. Xử lý thế nào?", options: ["Chặn liên lạc ngay vì đây là bẫy Romance Scam", "Chuyển khoản ngay vì quà giá trị lớn hơn thuế", "Nhờ người thân góp tiền đóng thuế nhận quà", "Yêu cầu họ trừ tiền thuế vào giá trị món quà"], correct: "Chặn liên lạc ngay vì đây là bẫy Romance Scam", explain: "💡 Hải quan nhà nước không bao giờ yêu cầu chuyển tiền thuế vào tài khoản cá nhân!" },
        { q: "4. Nhận email từ quản trị viên yêu cầu xác nhận mật khẩu qua liên kết lạ vì nâng cấp hệ thống. Bạn làm gì?", options: ["Bỏ qua và xóa email vì đây là chiêu trò Phishing", "Làm theo hướng dẫn ngay để không bị khóa máy", "Gửi mật khẩu qua email phản hồi để xác thực", "Chuyển tiếp email cho toàn bộ thành viên khác"], correct: "Bỏ qua và xóa email vì đây là chiêu trò Phishing", explain: "💡 Quản trị viên hệ thống không bao giờ yêu cầu người dùng gửi mật khẩu qua email." },
        { q: "5. Xem web phim lậu xuất hiện liên tục các tab quảng cáo cờ bạc cá độ chớp nháy. Hành động an toàn là?", options: ["Đóng ngay lập tức tab lạ, tuyệt đối không click", "Click vào xem thử có trúng thưởng thật không", "Tải ứng dụng quảng cáo theo yêu cầu trên trang", "Để nguyên các tab chạy ngầm để giải trí thêm"], correct: "Đóng ngay lập tức tab lạ, tuyệt đối không click", explain: "💡 Các trang web lậu thường gắn mã độc và banner quảng cáo dụ dỗ đánh bạc trực tuyến." },
        { q: "6. Kẻ lừa đảo mạng thường nhắm vào tử huyệt cảm xúc nào lớn nhất của con người để thao túng chuyển tiền?", options: ["Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", "Sự vui vẻ thích khám phá công nghệ số hiện đại", "Lòng yêu thương động vật và thiên nhiên hoang dã", "Sự kiên nhẫn và ham học hỏi kiến thức đời sống"], correct: "Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", explain: "💡 Kẻ gian luôn đánh vào nỗi sợ hãi hoặc lòng tham để làm sập nguồn lý trí người chơi!" },
        { q: "7. Tại sao người lớn tuổi lại rất dễ sập bẫy các chiêu trò lừa đảo qua mạng xã hội hơn giới trẻ hiện nay?", options: ["Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", "Vì người lớn tuổi có nhiều tiền trong tài khoản hơn", "Vì điện thoại của họ cấu hình yếu dễ bị nhiễm virus", "Vì các nền tảng ưu tiên hiển thị lừa đảo cho người già"], correct: "Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", explain: "💡 Người lớn tuổi thường thiếu kinh nghiệm nhận diện bẫy công nghệ thời đại số." },
        { q: "8. Vì sao mã OTP được ví như chìa khóa két sắt của tài khoản ngân hàng và không được đưa cho người khác?", options: ["Vì đây là bước xác thực cuối cùng cho phép rút tiền", "Vì mã OTP giúp nạp tiền điện thoại miễn phí nhanh", "Vì lộ mã OTP sẽ khiến thẻ bị khóa vĩnh viễn ngay", "Vì mã OTP chỉ có hiệu lực sử dụng trong vòng 10 năm"], correct: "Vì đây là bước xác thực cuối cùng cho phép rút tiền", explain: "💡 Mã OTP là chốt chặn cuối cùng bảo vệ tài sản của bạn. Mất OTP là mất tiền!" },
        { q: "9. Người lạ tự xưng hacker giỏi giúp lấy lại tiền bị lừa với điều kiện nộp phí dịch vụ trước. Bản chất là gì?", options: ["Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", "Dịch vụ hỗ trợ an ninh mạng chính thống nhà nước", "Cơ hội duy nhất để thu hồi trọn vẹn số tiền đã mất", "Chương trình đền bù rủi ro tài chính của ngân hàng"], correct: "Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", explain: "💡 Kẻ gian lợi dụng sự tuyệt vọng của nạn nhân để tiếp tục chiếm đoạt khoản phí mới!" },
        { q: "10. Sử dụng chung một mật khẩu duy nhất cho mọi tài khoản mạng xã hội và ngân hàng ẩn chứa hiểm họa gì?", options: ["Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", "Tốc độ kết nối mạng internet sẽ bị chậm rõ rệt", "Thiết bị di động tự động xóa bớt các ứng dụng", "Mật khẩu sẽ bị hết hiệu lực sử dụng sau 30 ngày"], correct: "Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", explain: "💡 Kẻ gian sẽ dùng mật khẩu lộ diện để thử đăng nhập chéo vào tất cả các hệ thống khác!" },
        { q: "11. Nhận được thông báo từ ứng dụng ngân hàng về giao dịch trừ tiền lạ lúc 2 giờ đêm. Hướng giải quyết khôn ngoan nhất là:", options: ["Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", "Chờ đến sáng hôm sau ra phòng giao dịch hỏi chuyện", "Đăng status than thở lên mạng xã hội để xin ý kiến", "Xóa ứng dụng ngân hàng đi rồi tải lại từ đầu"], correct: "Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", explain: "💡 Hành động nhanh chóng giúp ngăn chặn kịp thời việc kẻ gian tiếp tục rút sạch tiền." },
        { q: "12. Khi bạn vô tình quét mã QR tại các điểm dán đè ở bãi xe hoặc quán nước công cộng, hiểm họa tiềm ẩn là gì?", options: ["Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", "Điện thoại sẽ tự động sập nguồn vĩnh viễn không mở lại", "Tài khoản mạng xã hội tự động kết bạn với hàng nghìn người", "Dung lượng bộ nhớ điện thoại bị đầy lên tức thì"], correct: "Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", explain: "💡 Kẻ gian thường dán đè mã QR giả mạo mã độc để lừa người dùng truy cập." },
        { q: "13. Một tài khoản game uy tín rao bán với giá rẻ bằng 1/10 giá trị thực kèm cam kết 'bảo hành vĩnh viễn'. Bản chất là gì?", options: ["Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", "Cơ hội săn sale có một không hai trong năm cho game thủ", "Người bán thực sự tốt bụng muốn thanh lý nhanh nghỉ game", "Chính sách ưu đãi tri ân khách hàng của nhà phát hành"], correct: "Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", explain: "💡 Kẻ lừa đảo thường dùng chính thông tin đăng ký gốc để lấy lại tài khoản sau khi bán." },
        { q: "14. Tại sao các vụ lừa đảo qua mạng thường sử dụng các tài khoản ngân hàng 'ảo' hoặc mua lại danh tính người khác?", options: ["Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", "Vì ngân hàng tặng nhiều ưu đãi cho người mở nhiều tài khoản", "Giúp người chuyển tiền nhận được nhiều điểm thưởng hơn", "Để giảm bớt thuế thu nhập cá nhân phải đóng hàng năm"], correct: "Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", explain: "💡 Việc sử dụng tài khoản trung gian giúp kẻ gian che giấu danh tính thực sự của mình." },
        { q: "15. Khi nhận được lời mời tham gia hội nhóm đầu tư tài chính sinh lời 200% mỗi ngày chỉ bằng chiếc điện thoại, bạn nên:", options: ["Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", "Bỏ ra số vốn nhỏ để thử vận may đổi đời", "Vay mượn bạn bè người thân để đầu tư thu lời lớn", "Hỏi thêm kinh nghiệm của họ trước khi tham gia"], correct: "Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", explain: "💡 Lợi nhuận siêu cao luôn đi kèm rủi ro siêu lớn hoặc 100% là mô hình lừa đảo Ponzi." },
        { q: "16. Kẻ xấu sử dụng công nghệ Deepfake để giả mạo hình ảnh và giọng nói của người thân gọi điện nhờ chuyển tiền. Cách nhận diện tốt nhất là gì?", options: ["Yêu cầu người gọi thực hiện động tác vẫy tay hoặc hỏi câu hỏi riêng tư chỉ hai người biết", "Tin tưởng ngay vì đúng hình ảnh và giọng nói thật của người thân", "Chuyển tiền nhanh chóng vì sợ người thân gặp chuyện gấp", "Tắt máy và không bao giờ nghe điện thoại nữa"], correct: "Yêu cầu người gọi thực hiện động tác vẫy tay hoặc hỏi câu hỏi riêng tư chỉ hai người biết", explain: "💡 Công nghệ Deepfake đôi khi có độ trễ hoặc lỗi hình ảnh khi chuyển động, đặt câu hỏi kiểm chứng là cách khắc phục." },
        { q: "17. Khi điện thoại tự động cài đặt các tệp tin APK lạ từ nguồn không rõ ràng, mối nguy hiểm lớn nhất là gì?", options: ["Cấp quyền độc hại cho hacker chiếm quyền kiểm soát thiết bị và đánh cắp dữ liệu", "Làm cho điện thoại sạc pin nhanh hơn bình thường", "Giúp tăng tốc độ kết nối mạng 5G của máy", "Tự động dọn dẹp các tệp tin rác trong bộ nhớ"], correct: "Cấp quyền độc hại cho hacker chiếm quyền kiểm soát thiết bị và đánh cắp dữ liệu", explain: "💡 File APK ngoài cửa hàng ứng dụng chính thức tiềm ẩn mã độc kiểm soát toàn diện thiết bị." },
        { q: "18. Việc mua bán tài khoản ngân hàng hoặc cho người khác thuê mượn tài khoản cá nhân của mình có hậu quả pháp lý gì?", options: ["Có thể bị truy cứu trách nhiệm hình sự với tội danh tiếp tay cho rửa tiền và lừa đảo", "Chỉ bị nhắc nhở nhẹ nhàng từ phía ngân hàng", "Được nhận hoa hồng thụ động hàng tháng hợp pháp", "Không ảnh hưởng gì đến pháp luật nếu không trực tiếp đi lừa"], correct: "Có thể bị truy cứu trách nhiệm hình sự với tội danh tiếp tay cho rửa tiền và lừa đảo", explain: "💡 Cho thuê/mượn tài khoản ngân hàng là tiếp tay cho tội phạm công nghệ cao và vi phạm pháp luật nghiêm trọng." },
        { q: "19. Khi nhận được thông báo trúng thưởng lớn từ một tổ chức quốc tế yêu cầu đóng trước một khoản phí nhỏ bằng tiền điện tử (Crypto), bạn nên làm gì?", options: ["Xóa và chặn ngay lập tức vì đây là mô hình lừa đảo xuyên quốc gia", "Nộp tiền điện tử ngay để kịp nhận giải thưởng lớn", "Đăng ký thông tin cá nhân chi tiết để nhận quà", "Chia sẻ cơ hội trúng thưởng cho bạn bè cùng tham gia"], correct: "Xóa và chặn ngay lập tức vì đây là mô hình lừa đảo xuyên quốc gia", explain: "💡 Không có phần thưởng quốc tế nào yêu cầu người trúng tự nộp phí bằng tiền điện tử trước cả." },
        { q: "20. Điều gì là quan trọng nhất để bảo vệ bản thân và cộng đồng trước sự bùng nổ của các hình thức lừa đảo trực tuyến hiện nay?", options: ["Luôn nâng cao cảnh giác, tư duy phản biện và không ngừng cập nhật kiến thức an toàn mạng", "Tuyệt đối không sử dụng điện thoại thông minh và mạng xã hội", "Chỉ kết bạn và giao lưu với những người quen biết ngoài đời thực", "Thay đổi mật khẩu thiết bị liên tục mỗi phút mỗi giây"], correct: "Luôn nâng cao cảnh giác, tư duy phản biện và không ngừng cập nhật kiến thức an toàn mạng", explain: "💡 Kiến thức và sự tỉnh táo chính là chiếc khiên bảo vệ vững chắc nhất trong kỷ nguyên số!" }
    ]
};

function shuffleOptions(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let selectedMode = localStorage.getItem('kmm_mode') || 'kho';
let currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
let score = parseInt(localStorage.getItem('kmm_score')) || 0;
let playerName = localStorage.getItem('kmm_player_name') || "";
let answered = false;

document.addEventListener("DOMContentLoaded", function() {
    if (playerName) {
        const nameInput = document.getElementById('player-name-input');
        if (nameInput) nameInput.value = playerName;
    }
    selectMode(selectedMode);
    loadLeaderboard();
    loadAllFeedbacks();
    setupOnlineCounter();
});

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('kmm_theme', newTheme);
}
document.documentElement.setAttribute('data-theme', localStorage.getItem('kmm_theme') || 'dark');

window.selectMode = function(mode) {
    selectedMode = mode;
    localStorage.setItem('kmm_mode', mode);
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const btnElem = document.getElementById(`btn-mode-${mode}`);
    if (btnElem) btnElem.classList.add('active');
}

window.startGame = function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('minigame-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
    loadQuestion();
}

window.pauseAndSaveGame = function() {
    alert(`⏸️ Đã lưu tiến trình!\n- Chế độ: ${selectedMode.toUpperCase()}\n- Câu hiện tại: ${currentQIndex + 1}\n- Điểm số: ${score}`);
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('minigame-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    loadLeaderboard();
    loadAllFeedbacks();
}

window.savePlayerName = function(val) {
    playerName = val.trim();
    localStorage.setItem('kmm_player_name', playerName);
    updateLeaderboard();
}

function loadQuestion() {
    answered = false;
    let list = questionPools[selectedMode];
    if (currentQIndex >= list.length) currentQIndex = 0;
    
    let qData = list[currentQIndex];
    document.getElementById('warning-banner').innerText = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('quiz-title-mode').innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Chế độ Khó - 50đ' : 'Chế độ Hack Não - 100đ'})`;
    document.getElementById('question-counter').innerText = `Tình huống ${currentQIndex + 1} / ${list.length}`;
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
    
    const optContainer = document.getElementById('options-container');
    optContainer.innerHTML = "";

    let shuffled = shuffleOptions(qData.options);
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === qData.correct);
        optContainer.innerHTML += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
}

window.checkAnswer = function(btnElement, isCorrect) {
    if (answered) return;
    answered = true;
    
    let list = questionPools[selectedMode];
    let qData = list[currentQIndex];
    let buttons = document.querySelectorAll('#options-container .option-btn');
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        let pointsToAdd = (selectedMode === 'hacknao') ? 100 : 50;
        score += pointsToAdd;
        localStorage.setItem('kmm_score', score);
        document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
        updateLeaderboard();
    } else {
        btnElement.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.innerText.includes(qData.correct)) btn.classList.add('correct');
        });
    }
    showExplanationBox(qData.explain);
};

function showExplanationBox(explainText) {
    let quizArea = document.getElementById('quiz-area');
    let explainDiv = document.createElement('div');
    explainDiv.style.cssText = "margin-top: 12px; padding: 10px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 8px; font-size: 0.88rem; color: #fff;";
    explainDiv.innerHTML = `<strong>Giải thích an toàn:</strong> ${explainText}`;
    quizArea.appendChild(explainDiv);
}

window.nextQuestion = function() {
    let list = questionPools[selectedMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${selectedMode}`, currentQIndex);
    let oldNotice = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldNotice) oldNotice.remove();
    loadQuestion();
};

// --- HỆ THỐNG ĐẾM SỐ NGƯỜI ONLINE REAL-TIME ---
function setupOnlineCounter() {
    const onlineNumElem = document.getElementById('online-count-num');
    if (!onlineNumElem) return;

    if (!db) {
        onlineNumElem.innerText = Math.floor(Math.random() * 5) + 3;
        return;
    }

    const clientId = 'user_' + Math.random().toString(36).substring(2, 9);
    const onlineRef = db.collection("online_users").doc(clientId);

    // Ghi nhận đang online
    onlineRef.set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.log("Lỗi online count:", err));

    // Cứ mỗi 20s cập nhật lại heartbeat
    setInterval(() => {
        onlineRef.set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => {});
    }, 20000);

    // Lắng nghe số lượng user online trong vòng 35 giây qua
    db.collection("online_users").onSnapshot((snapshot) => {
        let activeCount = 0;
        let now = new Date().getTime();
        snapshot.forEach(doc => {
            let data = doc.data();
            if (data.timestamp) {
                let timeDiff = now - data.timestamp.toDate().getTime();
                if (timeDiff < 35000) { // trong vòng 35s
                    activeCount++;
                }
            }
        });
        onlineNumElem.innerText = Math.max(1, activeCount);
    }, (error) => {
        onlineNumElem.innerText = "3";
    });
}

// --- LOGIC MINIGAME: CYBER CIPHER ---
let cipherTimer = 30;
let cipherInterval = null;
let secretPin = "";
let currentEnteredPin = "";

const cipherChallenges = [
    { clue: "💡 MANH MỐI: Số đầu = 2, số cuối = 8. Hai số giữa bằng nhau và bằng tổng (2+8)/2", target: "2558" },
    { clue: "💡 MANH MỐI: Mật mã chứa số 1990 + 35 (Năm sinh chuẩn của hacker)", target: "2025" },
    { clue: "💡 MANH MỐI: 4 chữ số tăng dần liên tiếp bắt đầu bằng số 3", target: "3456" },
    { clue: "💡 MANH MỐI: Mã OTP xác thực: Số đầu = 9, số thứ hai kém 3 đơn vị, 2 số cuối là 00", target: "9600" },
    { clue: "💡 MANH MỐI: Số đối xứng: Hai số đầu là 71, hai số cuối đảo ngược lại", target: "7117" },
    { clue: "💡 MANH MỐI: Tổng 4 chữ số bằng 10, số đầu = 1, số cuối = 4, hai số giữa giống nhau", target: "1224" }
];

window.openCipherMinigame = function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('minigame-screen').style.display = 'block';
    startCipherMinigame();
};

window.closeCipherMinigame = function() {
    if (cipherInterval) clearInterval(cipherInterval);
    document.getElementById('minigame-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('cipher-timer-box').classList.remove('shake-urgent');
    loadLeaderboard();
    loadAllFeedbacks();
};

function startCipherMinigame() {
    cipherTimer = 30;
    currentEnteredPin = "";
    updatePinDisplay();
    
    document.getElementById('cipher-timer-number').innerText = cipherTimer;
    document.getElementById('cipher-result-msg').style.display = 'none';
    document.getElementById('cipher-timer-box').classList.remove('shake-urgent');
    
    let randomTask = cipherChallenges[Math.floor(Math.random() * cipherChallenges.length)];
    secretPin = randomTask.target;
    document.getElementById('cipher-clue').innerText = randomTask.clue;

    if (cipherInterval) clearInterval(cipherInterval);
    cipherInterval = setInterval(() => {
        cipherTimer--;
        document.getElementById('cipher-timer-number').innerText = cipherTimer;
        
        if (cipherTimer <= 10) {
            document.getElementById('cipher-timer-box').classList.add('shake-urgent');
        }
        
        if (cipherTimer <= 0) {
            clearInterval(cipherInterval);
            endCipherGame(false, `💥 HẾT GIỜ! Mật mã đúng là: <strong>${secretPin}</strong>`);
        }
    }, 1000);
}

window.pressNum = function(val) {
    if (cipherTimer <= 0) return;
    if (val === 'del') {
        currentEnteredPin = currentEnteredPin.slice(0, -1);
    } else if (currentEnteredPin.length < 4) {
        currentEnteredPin += val;
    }
    updatePinDisplay();
};

function updatePinDisplay() {
    for (let i = 0; i < 4; i++) {
        let box = document.getElementById(`pin-digit-${i}`);
        if (box) box.innerText = currentEnteredPin[i] || "_";
    }
}

window.submitCipher = function() {
    if (cipherTimer <= 0) return;
    if (currentEnteredPin.length < 4) {
        alert("Cậu vui lòng nhập đủ 4 chữ số nhé!");
        return;
    }

    if (currentEnteredPin === secretPin) {
        clearInterval(cipherInterval);
        document.getElementById('cipher-timer-box').classList.remove('shake-urgent');
        score += 150;
        localStorage.setItem('kmm_score', score);
        updateLeaderboard();
        endCipherGame(true, "🎉 GIẢI MÃ THÀNH CÔNG! Bạn nhận được +150 ĐIỂM thưởng!");
    } else {
        cipherTimer = Math.max(0, cipherTimer - 5);
        document.getElementById('cipher-timer-number').innerText = cipherTimer;
        alert("❌ Sai mật mã! Bị phạt trừ 5 giây!");
        currentEnteredPin = "";
        updatePinDisplay();
    }
};

function endCipherGame(isWin, msg) {
    const resBox = document.getElementById('cipher-result-msg');
    resBox.style.display = 'block';
    resBox.style.background = isWin ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)";
    resBox.style.color = isWin ? "#34d399" : "#f87171";
    resBox.style.border = isWin ? "1px solid #34d399" : "1px solid #ef4444";
    resBox.innerHTML = `${msg} <br/><br/><button class="secondary-btn" style="margin-top:8px; border-color:currentColor; color:currentColor;" onclick="startCipherMinigame()">🔄 Thử Thách Mới</button>`;
}

// --- HÀM FIREBASE XẾP HẠNG & ĐÁNH GIÁ ---
function updateLeaderboard() {
    if (!playerName || !db) return;
    db.collection("leaderboard").doc(playerName).set({
        name: playerName,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => loadLeaderboard()).catch(err => console.log("Lỗi ghi điểm:", err));
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;

    if (!db) {
        container.innerHTML = `<div style="color:#888; font-size:0.85rem;">Chưa kết nối mây.</div>`;
        return;
    }

    db.collection("leaderboard").orderBy("score", "desc").limit(10).get()
        .then((snapshot) => {
            let html = "";
            let rank = 1;
            snapshot.forEach((doc) => {
                let data = doc.data();
                let playerRank = getPlayerRank(data.score || 0);
                html += `<div class="leaderboard-item">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: bold; color: #9ca3af;">#${rank++}</span>
                        <div>
                            <strong>${data.name || "Ẩn danh"}</strong>
                            <div style="font-size: 0.75rem; color: ${playerRank.color}; font-weight: bold;">${playerRank.name}</div>
                        </div>
                    </div>
                    <span style="color: var(--accent-green); font-weight: bold;">${data.score || 0} đ</span>
                </div>`;
            });
            container.innerHTML = html || "<div style='color:#888; font-size:0.85rem;'>Chưa có cao thủ nào.</div>";
        })
        .catch((error) => {
            console.error("Lỗi tải bảng xếp hạng:", error);
            container.innerHTML = "<div style='color:#f87171; font-size:0.85rem;'>⚠️ Lỗi tải dữ liệu xếp hạng.</div>";
        });
}

window.submitHomeFeedback = function() {
    const textInput = document.getElementById('home-feedback-input');
    const author = playerName || "Khách ẩn danh";
    const text = textInput ? textInput.value.trim() : "";
    if (!text) { alert("Cậu vui lòng viết nhận xét trước nhé!"); return; }

    if (!db) {
        alert("⚠️ Mất kết nối cơ sở dữ liệu!");
        return;
    }

    db.collection("feedbacks").add({
        name: author,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        if (textInput) textInput.value = "";
        alert("❤️ Đã gửi đánh giá thành công lên mây!");
        loadAllFeedbacks();
    }).catch(err => {
        alert("Lỗi gửi đánh giá, vui lòng thử lại!");
        console.error(err);
    });
};

function loadAllFeedbacks() {
    const banner = document.getElementById('top-feedback-ticker');
    const cardsContainer = document.getElementById('feedback-cards-container');

    if (!db) {
        if (banner) banner.innerHTML = "Chưa kết nối cơ sở dữ liệu.";
        if (cardsContainer) cardsContainer.innerHTML = "<div style='color:#888; font-size:0.85rem;'>Chưa có đánh giá nào.</div>";
        return;
    }

    db.collection("feedbacks").orderBy("timestamp", "desc").limit(10).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let topDoc = snapshot.docs[0].data();
                if (banner) banner.innerHTML = `"${topDoc.text}" — <strong>${topDoc.name}</strong>`;
                
                let cardsHtml = "";
                snapshot.forEach((doc) => {
                    let d = doc.data();
                    cardsHtml += `<div class="feedback-card-item">
                        <div class="feedback-card-author">👤 ${d.name || "Ẩn danh"}</div>
                        <div class="feedback-card-text">"${d.text || ""}"</div>
                    </div>`;
                });
                if (cardsContainer) cardsContainer.innerHTML = cardsHtml;
            } else {
                if (banner) banner.innerHTML = "Chưa có đánh giá nào từ cộng đồng.";
                if (cardsContainer) cardsContainer.innerHTML = "<div style='color:#888; font-size:0.85rem;'>Chưa có đánh giá nào.</div>";
            }
        })
        .catch((error) => {
            console.error("Lỗi tải đánh giá:", error);
            if (banner) banner.innerHTML = "Không thể tải lời nhắn.";
            if (cardsContainer) cardsContainer.innerHTML = "<div style='color:#f87171; font-size:0.85rem;'>⚠️ Lỗi tải ý kiến cộng đồng.</div>";
        });
}
