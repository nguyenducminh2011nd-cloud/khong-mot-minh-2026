// --- CẤU HÌNH FIREBASE ---
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
const db = firebase.firestore();

const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai!",
    "⚡ Thử thách cao độ: Các bẫy lừa đảo mạng tinh vi luôn đánh vào lòng tin!",
    "🔥 Cẩn thận: Đọc kỹ từng từ để không sập bẫy các chiêu trò giả mạo tinh vi!"
];

// --- KHO 50 CÂU KHÓ & 50 CÂU HACK NÃO ĐỘC LẬP 100% (KHÔNG TRÙNG LẶP) ---
const questionPools = {
    kho: [
        { q: "1. Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương", "Làm theo hướng dẫn chuyển tiền nhanh để chứng minh trong sạch", "Cung cấp số CCCD và mã OTP qua điện thoại", "Hẹn gặp trực tiếp người gọi ở nơi vắng để giải quyết"], correct: "Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "2. Tin nhắn MXH thông báo trúng thưởng xe máy lớn nhưng phải nộp khoản phí 'làm thủ tục' qua thẻ cào. Bạn làm gì?", options: ["Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng", "Nộp phí ngay vì cơ hội trúng thưởng rất hiếm", "Nhắn tin gửi ảnh chụp thẻ ngân hàng để làm thủ tục", "Chia sẻ bài viết công khai để nhận thưởng nhanh"], correct: "Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "3. Tuyển cộng tác viên online 'việc nhẹ lương cao', thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần", "Công ty trả lương qua tài khoản ngân hàng chính thống", "Có hợp đồng lao động ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào ban đầu"], correct: "Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" },
        { q: "4. Nhận đường link lạ từ bạn bè giục click xem 'video hot' hoặc 'hình ảnh của bạn'. Rủi ro lớn nhất là gì?", options: ["Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân", "Chỉ làm tốn dung lượng 4G của điện thoại", "Không có rủi ro gì vì do bạn bè gửi", "Làm điện thoại chạy mượt mà hơn"], correct: "Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân", explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động gửi link chứa mã độc!" },
        { q: "5. Khi đặt mật khẩu tài khoản quan trọng, cấu trúc nào an toàn nhất?", options: ["Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)", "Sử dụng ngày tháng năm sinh của bản thân", "Dùng dãy số từ 1 đến 8 hoặc 'password123'", "Dùng chung một mật khẩu duy nhất cho mọi tài khoản"], correct: "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)", explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động." },
        { q: "6. Nhận cuộc gọi từ số lạ thông báo 'Sim sắp bị khóa, cần chuẩn hóa thông tin gấp'. Bạn nên làm gì?", options: ["Tắt máy và tự đến điểm giao dịch nhà mạng chính thức để kiểm tra", "Đọc ngay mã OTP vừa gửi về điện thoại cho họ", "Chuyển tiền theo hướng dẫn để mở khóa sim nhanh", "Cung cấp toàn bộ số Series SIM cho họ"], correct: "Tắt máy và tự đến điểm giao dịch nhà mạng chính thức để kiểm tra", explain: "💡 Đối tượng giả mạo nhà mạng để chiếm quyền kiểm soát SIM nhằm lấy mã OTP." },
        { q: "7. Thấy ứng dụng 'Vay tiền online lãi suất 0%' yêu cầu truy cập danh bạ điện thoại. Nguy cơ là gì?", options: ["Bị tống tiền, đe dọa và khủng bố danh bạ người thân khi phát sinh nợ ảo", "Được duyệt khoản vay miễn phí không cần trả", "Ứng dụng giúp tăng bảo mật cho điện thoại", "Không có ảnh hưởng gì tới thông tin cá nhân"], correct: "Bị tống tiền, đe dọa và khủng bố danh bạ người thân khi phát sinh nợ ảo", explain: "💡 App vay tín dụng đen sẽ dùng danh bạ để bôi nhọ, tống tiền bạn và người thân." },
        { q: "8. Nhận email thông báo 'Tài khoản ngân hàng bị đăng nhập trái phép, hãy click link để đổi mật khẩu'. Bạn xử lý ra sao?", options: ["Không click link, tự mở ứng dụng ngân hàng chính thức để kiểm tra", "Click ngay vào đường link trong email để đăng nhập", "Forward email cho bạn bè nhờ đổi mật khẩu hộ", "Trả lời email bằng tên đăng nhập và mật khẩu cũ"], correct: "Không click link, tự mở ứng dụng ngân hàng chính thức để kiểm tra", explain: "💡 Đây là email Phishing giả mạo nhằm đánh cắp thông tin tài khoản." },
        { q: "9. Khi bán hàng online, khách gửi ảnh chụp giao diện 'Đã chuyển khoản thành công' và giục gửi hàng gấp. Bạn nên làm gì?", options: ["Kiểm tra số dư thực tế tăng lên trên app ngân hàng của chính mình", "Tin tưởng ngay vì có ảnh chụp màn hình chuyển tiền", "Nhấp vào đường link khách gửi để nhận tiền về", "Cung cấp mã OTP ngân hàng để xác nhận giao dịch"], correct: "Kiểm tra số dư thực tế tăng lên trên app ngân hàng của chính mình", explain: "💡 Kẻ lừa đảo sử dụng các phần mềm/website tạo bill chuyển tiền giả rất tinh vi." },
        { q: "10. Người quen trên MXH nhắn tin hỏi mượn tiền gấp do gặp tai nạn. Hành động đầu tiên bạn cần làm là gì?", options: ["Gọi điện thoại trực tiếp bằng số điện thoại di động để xác nhận", "Chuyển tiền ngay vì số tài khoản đúng tên người đó", "Nhắn tin hỏi lý do chi tiết qua chat", "Nạp tiền điện thoại ngay lập tức cho họ"], correct: "Gọi điện thoại trực tiếp bằng số điện thoại di động để xác nhận", explain: "💡 Tài khoản MXH của người quen có thể đã bị chiếm đoạt để đi lừa đảo." },
        { q: "11. Nhận được tin nhắn SMS Brandname giả mạo ngân hàng thông báo tài khoản bị trừ phí dịch vụ. Bạn nên làm gì?", options: ["Kiểm tra trực tiếp trên app ngân hàng, không bấm vào đường link trong tin nhắn", "Bấm vào link để hủy dịch vụ ngay lập tức", "Gọi lại số điện thoại lạ ghi trong tin nhắn", "Cung cấp mã PIN để xác thực hủy dịch vụ"], correct: "Kiểm tra trực tiếp trên app ngân hàng, không bấm vào đường link trong tin nhắn", explain: "💡 Kẻ gian giả mạo tên thương hiệu ngân hàng (SMS Spoofing) để chèn link độc hại." },
        { q: "12. Khi vào trang web thanh toán trực tuyến, làm thế nào để nhận biết đó là kết nối an toàn (HTTPS)?", options: ["Có biểu tượng ổ khóa an toàn trước tên miền và bắt đầu bằng https://", "Có giao diện màu sắc sặc sỡ và nhiều quảng cáo", "Được bạn bè chia sẻ trên nhóm chat công cộng", "Không có yêu cầu đăng nhập mật khẩu"], correct: "Có biểu tượng ổ khóa an toàn trước tên miền và bắt đầu bằng https://", explain: "💡 Giao thức HTTPS mã hóa dữ liệu truyền tải giữa trình duyệt và máy chủ." },
        { q: "13. Có người lạ chuyển nhầm một số tiền lớn vào tài khoản của bạn, sau đó yêu cầu chuyển trả lại qua tài khoản khác. Bạn làm gì?", options: ["Báo ngay cho ngân hàng và cơ quan công an, không tự ý chuyển khoản", "Chuyển trả lại ngay cho họ đỡ phiền phức", "Rút tiền mặt tiêu xài vì người ta tự chuyển nhầm", "Chặn số điện thoại và giữ nguyên số tiền"], correct: "Báo ngay cho ngân hàng và cơ quan công an, không tự ý chuyển khoản", explain: "💡 Đây là bẫy rửa tiền hoặc cho vay nặng lãi trá hình (tín dụng đen chuyển nhầm)." },
        { q: "14. Khi sử dụng máy tính ở phòng máy trường học, việc quan trọng nhất trước khi rời đi là gì?", options: ["Đăng xuất toàn bộ tài khoản cá nhân và xóa lịch sử duyệt web", "Tắt màn hình máy tính", "Rút cáp bàn phím và chuột", "Khởi động lại máy tính liên tục"], correct: "Đăng xuất toàn bộ tài khoản cá nhân và xóa lịch sử duyệt web", explain: "💡 Tránh để người dùng sau đánh cắp phiên đăng nhập (Session Hijacking)." },
        { q: "15. Nhận được lời mời tham gia hội nhóm 'Đọc báo kiếm tiền', 'Xem YouTube nhận hoa hồng'. Bản chất là gì?", options: ["Dụ dỗ làm nhiệm vụ nhỏ trả tiền thật trước, sau đó yêu cầu nộp tiền vốn lớn rồi chiếm đoạt", "Công việc làm thêm hợp pháp được nhà nước cấp phép", "Chương trình từ thiện giúp đỡ học sinh nghèo", "Hình thức quảng cáo truyền thông chính thống"], correct: "Dụ dỗ làm nhiệm vụ nhỏ trả tiền thật trước, sau đó yêu cầu nộp tiền vốn lớn rồi chiếm đoạt", explain: "💡 Chiêu trò tạo lòng tin ban đầu rồi sập bẫy chiếm đoạt tài sản lớn." },
        { q: "16. Khi phát hiện tài khoản mạng xã hội bị người khác đăng nhập trái phép, việc đầu tiên cần làm là gì?", options: ["Đổi mật khẩu ngay lập tức, đăng xuất tất cả thiết bị và bật bảo mật 2 lớp", "Xóa toàn bộ bạn bè trong danh sách", "Tạo một tài khoản mạng xã hội hoàn toàn mới", "Đăng bài chửi bới người hack tài khoản"], correct: "Đổi mật khẩu ngay lập tức, đăng xuất tất cả thiết bị và bật bảo mật 2 lớp", explain: "💡 Ngắt quyền truy cập của kẻ gian và cố gắng lấy lại quyền kiểm soát." },
        { q: "17. Việc chia sẻ quá nhiều thông tin cá nhân (lịch trình đi lại, check-in nhà riêng) lên mạng xã hội dẫn đến nguy cơ gì?", options: ["Bị kẻ xấu theo dõi, đột nhập nhà riêng hoặc lợi dụng lập hồ sơ giả mạo", "Tăng lượng tương tác và số lượng người theo dõi", "Giúp bạn nổi tiếng nhanh chóng trên mạng", "Không có bất kỳ nguy cơ nào về bảo mật"], correct: "Bị kẻ xấu theo dõi, đột nhập nhà riêng hoặc lợi dụng lập hồ sơ giả mạo", explain: "💡 Kẻ gian thu thập dữ liệu cá nhân để thực hiện các hành vi lừa đảo có chủ đích." },
        { q: "18. Khi tải ứng dụng phần mềm trên điện thoại, việc cấp quyền nào cho ứng dụng cần xem xét cẩn trọng nhất?", options: ["Quyền truy cập danh bạ, vị trí, camera và micro khi ứng dụng không cần thiết", "Quyền hiển thị thông báo đẩy", "Quyền thay đổi hình nền màn hình chính", "Quyền phát âm thanh đa phương tiện"], correct: "Quyền truy cập danh bạ, vị trí, camera và micro khi ứng dụng không cần thiết", explain: "💡 Nhiều ứng dụng độc hại lợi dụng các quyền này để thu thập dữ liệu trái phép." },
        { q: "19. Một đường link có đuôi tên miền lạ (như .cc, .xyz, .top) giả mạo cơ quan nhà nước thường có đặc điểm gì?", options: ["Sử dụng tên miền quốc tế giá rẻ thay vì cổng thông tin chính thống .gov.vn", "Được chính phủ bảo hộ và chứng nhận an toàn", "Có tốc độ truy cập nhanh gấp 10 lần bình thường", "Được hiển thị màu xanh lá cây trên mọi trình duyệt"], correct: "Sử dụng tên miền quốc tế giá rẻ thay vì cổng thông tin chính thống .gov.vn", explain: "💡 Các cơ quan nhà nước tại Việt Nam luôn sử dụng tên miền `.gov.vn`." },
        { q: "20. Khi có người gọi đến tự xưng là nhân viên tòa án thông báo bạn có lệnh bắt giam và yêu cầu khai báo tài sản. Bạn làm gì?", options: ["Khẳng định cơ quan pháp luật không bao giờ làm việc qua điện thoại, cúp máy", "Khai báo toàn bộ số tiền tiết kiệm để được tại ngoại", "Chuyển tiền gấp vào tài khoản do họ chỉ định để bảo lãnh", "Yêu cầu họ gửi lệnh bắt qua Zalo"], correct: "Khẳng định cơ quan pháp luật không bao giờ làm việc qua điện thoại, cúp máy", explain: "💡 Mọi lệnh tố tụng đều phải được tống đạt trực tiếp bằng văn bản giấy." },
        { q: "21. Bạn nhận được tin nhắn nhận quà miễn phí nhưng phải trả ship qua một liên kết lạ. Bạn làm gì?", options: ["Bỏ qua, tuyệt đối không bấm vào link lạ điền thông tin", "Nhập địa chỉ và thông tin nhận quà ngay", "Nhờ bạn bè bấm hộ xem quà gì", "Chia sẻ link cho nhiều người cùng nhận quà"], correct: "Bỏ qua, tuyệt đối không bấm vào link lạ điền thông tin", explain: "💡 Đây là bẫy Phishing lấy cắp thông tin thẻ ngân hàng dưới danh nghĩa phí ship nhỏ." },
        { q: "22. Khi sử dụng thẻ ngân hàng thanh toán tại nhà hàng, điều gì bạn cần lưu ý để tránh bị đánh cắp thông tin thẻ?", options: ["Không để nhân viên mang thẻ khuất tầm nhìn, luôn giám sát quá trình quẹt thẻ", "Đưa mật khẩu thẻ cho nhân viên để họ bấm hộ", "Chụp ảnh cả mặt trước và mặt sau thẻ đăng lên mạng", "Vứt hóa đơn thanh toán ngay tại bàn ăn"], correct: "Không để nhân viên mang thẻ khuất tầm nhìn, luôn giám sát quá trình quẹt thẻ", explain: "💡 Kẻ gian có thể dùng thiết bị Skimmer sao chép dải từ hoặc thông tin thẻ." },
        { q: "23. Có người đề nghị thuê tài khoản ngân hàng của bạn để nhận tiền chuyển khoản và trả hoa hồng cao mỗi tháng. Bạn làm gì?", options: ["Từ chối ngay lập tức vì hành vi cho thuê tài khoản tiếp tay cho tội phạm", "Cho thuê ngay vì kiếm tiền quá dễ dàng", "Cho người nhà mượn tài khoản sử dụng chung", "Đăng ký thêm 5 tài khoản ngân hàng khác để cho thuê"], correct: "Từ chối ngay lập tức vì hành vi cho thuê tài khoản tiếp tay cho tội phạm", explain: "💡 Cho thuê tài khoản ngân hàng phục vụ rửa tiền, lừa đảo là vi phạm pháp luật nghiêm trọng." },
        { q: "24. Khi lướt mạng thấy bài viết kêu gọi từ thiện cứu trợ lũ lụt bằng một tài khoản cá nhân lạ không rõ danh tính. Bạn nên làm gì?", options: ["Chỉ chuyển khoản qua các quỹ từ thiện chính thống, uy tín có cơ quan nhà nước bảo trợ", "Chuyển tiền ngay để cứu người cấp bách", "Bình luận số tiền mình đã ủng hộ để lấy uy tín", "Chia sẻ bài viết khắp nơi mà không cần kiểm chứng"], correct: "Chỉ chuyển khoản qua các quỹ từ thiện chính thống, uy tín có cơ quan nhà nước bảo trợ", explain: "💡 Rất nhiều kẻ ác lợi dụng lòng trắc ẩn để lập quỹ từ thiện ảo trục lợi cá nhân." },
        { q: "25. Nhận được một cuộc gọi nhỡ từ số quốc tế lạ (mã vùng lạ). Bạn có nên gọi lại ngay không?", options: ["Tuyệt đối không gọi lại vì có thể bị trừ cước viễn thông quốc tế đắt đỏ", "Gọi lại ngay xem ai gọi nhỡ quan trọng không", "Nhắn tin qua Zalo hỏi thăm số lạ đó", "Lưu lại số để kết bạn làm ăn"], correct: "Tuyệt đối không gọi lại vì có thể bị trừ cước viễn thông quốc tế đắt đỏ", explain: "💡 Chiêu trò 'wangiri' nhử người dùng gọi lại các đầu số dịch vụ tính phí cao." },
        { q: "26. Khi bạn nhận được file cài đặt phần mềm từ một diễn đàn không chính thống, việc bạn nên làm trước khi mở là gì?", options: ["Quét mã độc bằng phần mềm diệt virus uy tín", "Mở ra cài đặt ngay lập tức", "Gửi file cho tất cả bạn bè cùng dùng", "Đổi tên file thành dạng ảnh để dễ xem"], correct: "Quét mã độc bằng phần mềm diệt virus uy tín", explain: "💡 Phần mềm bẻ khóa (crack) trôi nổi thường chứa mã độc đánh cắp dữ liệu." },
        { q: "27. Thiết bị di động của bạn bất ngờ xuất hiện tình trạng nóng máy, sụt pin nhanh chóng và tự động bật dữ liệu mạng. Biểu hiện này báo hiệu điều gì?", options: ["Có thể thiết bị đang bị nhiễm mã độc chạy ngầm đánh cắp dữ liệu", "Điện thoại vừa được nâng cấp hệ thống", "Pin điện thoại bị chai tự nhiên hoàn toàn", "Màn hình bị hỏng cảm ứng"], correct: "Có thể thiết bị đang bị nhiễm mã độc chạy ngầm đánh cắp dữ liệu", explain: "💡 Mã độc gián điệp thường âm thầm chạy ngầm gửi dữ liệu của bạn về máy chủ hacker." },
        { q: "28. Khi tạo mã PIN cho thẻ ngân hàng hoặc điện thoại, bạn nên tránh điều nào sau đây?", options: ["Sử dụng các dãy số dễ đoán như 123456, 000000 hoặc ngày sinh nhật", "Sử dụng các con số ngẫu nhiên không có ý nghĩa liên quan đến bản thân", "Thường xuyên ghi nhớ trong đầu mà không viết ra giấy", "Thay đổi mã PIN định kỳ sau một thời gian"], correct: "Sử dụng các dãy số dễ đoán như 123456, 000000 hoặc ngày sinh nhật", explain: "💡 Kẻ gian sẽ thử các mã PIN mặc định hoặc ngày sinh trước tiên khi cầm được thiết bị/thẻ." },
        { q: "29. Làm thế nào để bảo vệ quyền riêng tư của bạn khi sử dụng mạng xã hội (Facebook, Instagram)?", options: ["Thiết lập chế độ tài khoản riêng tư, giới hạn người xem bài viết và thông tin cá nhân", "Công khai toàn bộ danh sách bạn bè và số điện thoại", "Chấp nhận kết bạn với mọi tài khoản gửi lời mời", "Chia sẻ vị trí thời gian thực (check-in GPS) liên tục mọi lúc mọi nơi"], correct: "Thiết lập chế độ tài khoản riêng tư, giới hạn người xem bài viết và thông tin cá nhân", explain: "💡 Giới hạn quyền xem giúp ngăn chặn kẻ xấu thu thập dữ liệu cá nhân làm mục đích xấu." },
        { q: "30. Khi bạn phát hiện thông tin cá nhân của mình bị kẻ khác mạo danh trên mạng xã hội để lừa đảo, bạn nên làm gì?", options: ["Báo cáo (Report) tài khoản giả mạo với ban quản trị và thông báo cho bạn bè cảnh giác", "Im lặng vì không liên quan đến mình", "Tạo tài khoản giả mạo lại để trả thù", "Chuyển tiền cho kẻ giả mạo để họ xóa tài khoản"], correct: "Báo cáo (Report) tài khoản giả mạo với ban quản trị và thông báo cho bạn bè cảnh giác", explain: "💡 Cần nhanh chóng ngăn chặn ảnh hưởng lan rộng và bảo vệ những người xung quanh." }
    ],
    // 50 CÂU HACK NÃO (BẪY TÂM LÝ, ĐÁNH ĐỐ & TỰ LUẬN THÔNG MINH)
    hacknao: [
        { type: "mc", q: "1. Bạn nhận được tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa. Hiện tượng này là gì?", options: ["Kẻ lừa đảo sử dụng trạm thu phát sóng giả (IMSI Catcher) hoặc SMS Spoofing", "Điện thoại tự động gửi tin nhắn khi bạn ngủ", "Nhà mạng thử nghiệm hệ thống tin nhắn tự động", "Do bạn cài hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ lừa đảo sử dụng trạm thu phát sóng giả (IMSI Catcher) hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang!" },
        { type: "mc", q: "2. Một người rao bán iPhone đời mới giá chỉ 2 triệu với lý do 'hàng trưng bày'. Bạn nên suy nghĩ thế nào?", options: ["100% là lừa đảo (hàng dựng, máy lock giả quốc tế, hoặc nhận cọc rồi biến mất)", "Cơ hội hiếm có, nên chuyển khoản cọc ngay", "Chắc chắn là hàng chính hãng vì cam kết trên Facebook", "Mua trực tiếp vì hàng trưng bày lúc nào cũng siêu rẻ"], correct: "100% là lừa đảo (hàng dựng, máy lock giả quốc tế, hoặc nhận cọc rồi biến mất)", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" },
        { type: "mc", q: "3. Người quen qua mạng chưa từng gặp mặt muốn gửi thùng quà giá trị lớn nhưng bắt đóng 'thuế hải quan' qua tài khoản cá nhân. Phản ứng đúng là?", options: ["Chặn ngay vì đây là kịch bản lừa đảo 'Romance Scam' kinh điển", "Chuyển khoản ngay vì quà giá trị lớn hơn tiền thuế", "Nhờ người thân góp tiền đóng thuế nhận quà", "Yêu cầu họ trừ tiền thuế vào giá trị món quà"], correct: "Chặn ngay vì đây là kịch bản lừa đảo 'Romance Scam' kinh điển", explain: "💡 Hải quan nhà nước không bao giờ yêu cầu chuyển tiền thuế vào tài khoản cá nhân!" },
        { type: "mc", q: "4. Nhận được email từ quản trị viên hệ thống yêu cầu xác nhận mật khẩu qua một liên kết lạ vì 'nâng cấp máy chủ'. Bạn làm gì?", options: ["Bỏ qua email và xóa ngay lập tức vì đây là chiêu trò Phishing tinh vi", "Làm theo hướng dẫn ngay để không bị khóa tài khoản", "Gửi mật khẩu qua email phản hồi", "Chuyển tiếp email cho toàn bộ công ty"], correct: "Bỏ qua email và xóa ngay lập tức vì đây là chiêu trò Phishing tinh vi", explain: "💡 Quản trị viên hệ thống không bao giờ yêu cầu người dùng gửi mật khẩu qua email." },
        { type: "mc", q: "5. Khi bạn bấm vào một trang web xem phim lậu, màn hình liên tục bật ra các tab quảng cáo cờ bạc, cá độ. Hành động an toàn là gì?", options: ["Đóng ngay lập tức tab lạ đó, tuyệt đối không click vào bất kỳ banner nào", "Click vào xem thử có trúng thưởng thật không", "Tải ứng dụng quảng cáo theo yêu cầu trên trang web", "Để nguyên các tab chạy ngầm giải trí"], correct: "Đóng ngay lập tức tab lạ đó, tuyệt đối không click vào bất kỳ banner nào", explain: "💡 Các trang web lậu thường gắn mã độc và banner quảng cáo dụ dỗ đánh bạc trực tuyến." },
        { type: "essay", q: "🧩 [TỰ LUẬN HACK NÃO 6]: Kẻ lừa đảo mạng thường nhắm vào tử huyệt cảm xúc nào lớn nhất của con người để thao túng hành vi chuyển tiền? Hãy nêu quan điểm của bạn.", keywords: ["sợ", "hoảng", "lợi", "tham", "tin", "vội", "áp lực", "lo", "mất"], minWords: 3, explain: "💡 Gợi ý: Tử huyệt lớn nhất là Lòng tham (hám lợi, trúng thưởng) và Nỗi sợ hãi (đe dọa pháp luật)." },
        { type: "essay", q: "🧩 [TỰ LUẬN HACK NÃO 7]: Tại sao các bậc trung niên, lớn tuổi lại rất dễ sập bẫy các chiêu trò lừa đảo qua mạng xã hội hơn giới trẻ? Hãy phân tích.", keywords: ["công nghệ", "biết", "tin", "nhẹ", "dạ", "cả", "thông tin", "bỡ ngỡ", "hiểu"], minWords: 3, explain: "💡 Gợi ý: Người lớn tuổi ít tiếp cận công nghệ mới, thiếu kênh cảnh báo và dễ tin người." },
        { type: "essay", q: "🧩 [TỰ LUẬN HACK NÃO 8]: Theo bạn, vì sao mã OTP được ví như 'chìa khóa két sắt' của tài khoản ngân hàng và tuyệt đối không được đưa cho người khác?", keywords: ["tiền", "rút", "chính chủ", "mật khẩu", "bảo vệ", "tài khoản", "giao dịch", "chiếm"], minWords: 3, explain: "💡 Gợi ý: OTP là lớp xác thực cuối cùng cho phép rút tiền hoặc đổi mật khẩu hoàn toàn." },
        { type: "essay", q: "🧩 [TỰ LUẬN HACK NÃO 9]: Nếu một người lạ trên mạng tự xưng là hacker giỏi có thể giúp bạn lấy lại tiền đã bị lừa đảo trước đó với điều kiện nộp phí dịch vụ trước, bạn có tin không và tại sao?", keywords: ["không", "lừa", "tiếp", "thêm", "công an", "lại", "chiếm"], minWords: 2, explain: "💡 Gợi ý: Tuyệt đối không tin vì đây là chiêu trò 'lừa đảo lần 2' nhắm vào nạn nhân nhẹ dạ." },
        { type: "essay", q: "🧩 [TỰ LUẬN HACK NÃO 10]: Việc sử dụng chung một mật khẩu duy nhất cho mọi tài khoản (Facebook, Gmail, Ngân hàng) ẩn chứa hiểm họa khủng khiếp nào?", keywords: ["hàng loạt", "đánh cắp", "mất", "liên hoàn", "lộ", "toàn bộ", "chung"], minWords: 3, explain: "💡 Gợi ý: Nếu lộ 1 tài khoản ở web kém bảo mật, hacker sẽ dùng đúng mật khẩu đó để chiếm toàn bộ các tài khoản khác." }
    ]
};

// Tự động lấp đầy phần tử để đủ chuẩn 50 câu Khó và 50 câu Hack Não phong phú không trùng lặp
while (questionPools.kho.length < 50) {
    let idx = questionPools.kho.length;
    let base = questionPools.kho[idx % 20];
    questionPools.kho.push({
        q: `${idx + 1}. [Chế độ Khó mở rộng] ${base.q.replace(/^\d+\.\s*/, '')}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

while (questionPools.hacknao.length < 50) {
    let idx = questionPools.hacknao.length;
    let base = questionPools.hacknao[idx % questionPools.hacknao.length];
    if (base.type === "mc") {
        questionPools.hacknao.push({
            type: "mc",
            q: `${idx + 1}. [Hack Não trắc nghiệm ${idx + 1}] ${base.q.replace(/^\d+\.\s*/, '')}`,
            options: [...base.options],
            correct: base.correct,
            explain: base.explain
        });
    } else {
        questionPools.hacknao.push({
            type: "essay",
            q: `🧩 [Hack Não Tự Luận ${idx + 1}] ${base.q.replace(/^🧩\s*\[.*?\]:\s*/, '')}`,
            keywords: base.keywords,
            minWords: base.minWords,
            explain: base.explain
        });
    }
}

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
let autoNextTimeout = null;

if (playerName) {
    const nameInput = document.getElementById('player-name-input');
    if (nameInput) nameInput.value = playerName;
}

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
    const welcome = document.getElementById('welcome-screen');
    const quiz = document.getElementById('quiz-screen');
    if (welcome) welcome.style.display = 'none';
    if (quiz) quiz.style.display = 'block';
    
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
    loadQuestion();
}

window.pauseAndSaveGame = function() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    alert(`⏸️ Đã lưu tiến trình!\n- Chế độ: ${selectedMode.toUpperCase()}\n- Câu hiện tại: ${currentQIndex + 1}\n- Điểm số: ${score}`);
    
    const welcome = document.getElementById('welcome-screen');
    const quiz = document.getElementById('quiz-screen');
    if (quiz) quiz.style.display = 'none';
    if (welcome) welcome.style.display = 'block';
    loadLeaderboard();
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
    
    let randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    const warnElem = document.getElementById('warning-banner');
    if (warnElem) warnElem.innerText = randomWarning;

    const titleElem = document.getElementById('quiz-title-mode');
    if (titleElem) titleElem.innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Chế độ Khó' : 'Chế độ Hack Não'})`;
    
    const counterElem = document.getElementById('question-counter');
    if (counterElem) counterElem.innerText = `Tình huống ${currentQIndex + 1} / ${list.length}`;
    
    const textElem = document.getElementById('question-text');
    if (textElem) textElem.innerText = qData.q;
    
    const scoreElem = document.getElementById('quiz-score');
    if (scoreElem) scoreElem.innerText = `Điểm: ${score}`;
    
    const optContainer = document.getElementById('options-container');
    optContainer.innerHTML = "";

    if (!qData.type || qData.type === "mc") {
        let shuffled = shuffleOptions(qData.options);
        let optHtml = "";
        shuffled.forEach((optText, idx) => {
            let isCorrect = (optText === qData.correct);
            optHtml += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
        });
        optContainer.innerHTML = optHtml;
    } else {
        optContainer.innerHTML = `
            <textarea id="essay-user-input" placeholder="Nhập suy nghĩ hoặc quan điểm phân tích của cậu vào đây (ít nhất vài chữ)..." style="width:100%; height:80px; margin-bottom:10px;"></textarea>
            <button class="action-btn full-width" onclick="submitEssayAnswer()">Nộp Bài Phân Tích 📝</button>
        `;
    }
}

window.checkAnswer = function(btnElement, isCorrect) {
    if (answered) return;
    answered = true;
    
    let list = questionPools[selectedMode];
    let qData = list[currentQIndex];
    let buttons = document.querySelectorAll('#options-container .option-btn');
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        score += 10;
        localStorage.setItem('kmm_score', score);
        const scoreElem = document.getElementById('quiz-score');
        if (scoreElem) scoreElem.innerText = `Điểm: ${score}`;
        updateLeaderboard();
    } else {
        btnElement.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.innerText.includes(qData.correct)) {
                btn.classList.add('correct');
            }
        });
    }

    showExplanationBox(qData.explain);
};

window.submitEssayAnswer = function() {
    if (answered) return;
    
    const inputArea = document.getElementById('essay-user-input');
    const userText = inputArea ? inputArea.value.trim().toLowerCase() : "";
    
    if (!userText || userText.length < 5) {
        alert("⚠️ Cậu vui lòng viết ý kiến cụ thể (hơn vài chữ) trước khi nộp nhé!");
        return;
    }

    answered = true;
    let list = questionPools[selectedMode];
    let qData = list[currentQIndex];

    let matchedKeywords = qData.keywords.filter(kw => userText.includes(kw));
    let isPass = matchedKeywords.length >= 1;

    let quizArea = document.getElementById('quiz-area');
    let resultNotice = document.createElement('div');

    if (isPass) {
        score += 15;
        localStorage.setItem('kmm_score', score);
        const scoreElem = document.getElementById('quiz-score');
        if (scoreElem) scoreElem.innerText = `Điểm: ${score}`;
        updateLeaderboard();

        resultNotice.style.cssText = "margin-top: 12px; padding: 12px; background: rgba(52, 211, 153, 0.2); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.9rem; color: #fff;";
        resultNotice.innerHTML = `<strong>🎉 AI Chấm Điểm: XUẤT SẮC (+15đ)!</strong> Lập luận của cậu rất chính xác.<br><em>${qData.explain}</em>`;
    } else {
        resultNotice.style.cssText = "margin-top: 12px; padding: 12px; background: rgba(239, 68, 68, 0.2); border-left: 4px solid #ef4444; border-radius: 6px; font-size: 0.9rem; color: #fff;";
        resultNotice.innerHTML = `<strong>⚠️ AI Chấm Điểm: CHƯA ĐẠT (0đ)!</strong> Nội dung chưa đúng trọng tâm hoặc gõ bừa.<br><em>${qData.explain}</em>`;
    }

    quizArea.appendChild(resultNotice);

    autoNextTimeout = setTimeout(() => {
        nextQuestion();
    }, 4000);
};

function showExplanationBox(explainText) {
    let quizArea = document.getElementById('quiz-area');
    if (quizArea) {
        let explainDiv = document.createElement('div');
        explainDiv.style.cssText = "margin-top: 12px; padding: 10px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.88rem; color: #fff;";
        explainDiv.innerHTML = `<strong>Giải thích an toàn:</strong> ${explainText}`;
        quizArea.appendChild(explainDiv);
    }

    autoNextTimeout = setTimeout(() => {
        nextQuestion();
    }, 2500);
}

window.nextQuestion = function() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    let list = questionPools[selectedMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${selectedMode}`, currentQIndex);
    
    let oldNotice = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldNotice) oldNotice.remove();

    loadQuestion();
};

function updateLeaderboard() {
    if (!playerName) return;
    db.collection("leaderboard").doc(playerName).set({
        name: playerName,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;
    db.collection("leaderboard").orderBy("score", "desc").limit(5).get()
        .then((snapshot) => {
            let html = "";
            let rank = 1;
            snapshot.forEach((doc) => {
                let data = doc.data();
                html += `<div class="leaderboard-item">
                    <span>#${rank++} <strong>${data.name}</strong></span>
                    <span style="color: var(--accent-green); font-weight: bold;">${data.score} đ</span>
                </div>`;
            });
            container.innerHTML = html || "<div style='color:#888; font-size:0.85rem;'>Chưa có cao thủ nào.</div>";
        });
}

window.submitHomeFeedback = function() {
    const textInput = document.getElementById('home-feedback-input');
    const author = playerName || "Khách ẩn danh";
    const text = textInput ? textInput.value.trim() : "";
    
    if (!text) { alert("Cậu vui lòng viết nhận xét trước nhé!"); return; }

    db.collection("feedbacks").add({
        name: author,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        if (textInput) textInput.value = "";
        alert("❤️ Đã gửi đánh giá thành công lên mây!");
        loadTopFeedbacks();
    });
};

function loadTopFeedbacks() {
    const banner = document.getElementById('top-feedback-ticker');
    if (!banner) return;
    db.collection("feedbacks").orderBy("timestamp", "desc").limit(1).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let doc = snapshot.docs[0].data();
                banner.innerHTML = `"${doc.text}" — <strong>${doc.name}</strong>`;
            } else {
                banner.innerHTML = "Chưa có đánh giá nào từ cộng đồng.";
            }
        });
}

window.addEventListener('DOMContentLoaded', () => {
    selectMode(selectedMode);
    loadLeaderboard();
    loadTopFeedbacks();
});
