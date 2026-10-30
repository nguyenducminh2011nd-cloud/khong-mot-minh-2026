const scenarioData = [
  {
    sender: "Tài khoản Clone",
    text: "Anh ơi, vote giúp em cuộc thi STEM với, nhấp vào link này đăng nhập nick rồi nhập mã OTP nhé!",
    options: [
      { text: "Bấm vào link đăng nhập giúp luôn", score: 0, reply: "Em gửi link đi anh bấm cho!" },
      { text: "Block ngay và báo cáo lừa đảo", score: 25, reply: "Lừa đảo lấy nick à? Báo cáo ngay!" }
    ]
  },
  {
    sender: "Acc Game Lạ",
    text: "Nick ông cùi thế, đưa mật khẩu đây tui nạp hộ cho 500k Quân Huy/Sò miễn phí nè!",
    options: [
      { text: "Cung cấp tài khoản + mật khẩu", score: 0, reply: "Thật hả ông? Mật khẩu tui là 123456..." },
      { text: "Từ chối, làm gì có bánh chưng miễn phí", score: 25, reply: "Thôi khỏi, không ai cho không ai cái gì đâu!" }
    ]
  },
  {
    sender: "Người dùng ẩn danh",
    text: "Tao có ảnh dìm và thông tin của mày, không chuyển 100k là tao đăng lên Confession trường!",
    options: [
      { text: "Hoảng sợ chuyển tiền luôn", score: 0, reply: "Đừng đăng mà, tui chuyển tiền ngay đây..." },
      { text: "Chụp màn hình lại, báo thầy cô/BGH và gia đình", score: 25, reply: "Tôi đã lưu bằng chứng và báo với Đoàn trường!" }
    ]
  },
  {
    sender: "Nhóm Chat Lớp",
    text: "Mấy bạn ơi, thấy bảo bạn X trong lớp bị bóc phốt kìa, vào chửi hùa đi cho xôm!",
    options: [
      { text: "Vào comment chửi hùa theo đám đông", score: 0, reply: "Đâu đâu gửi link đây tui vô chửi với!" },
      { text: "Không tham gia cyberbullying, khuyên các bạn dừng lại", score: 25, reply: "Chưa rõ thực hư thế nào, đừng bắt nạt mạng bạn ấy!" }
    ]
  }
];

let currentIndex = 0;
let totalScore = 0;

const chatBox = document.getElementById('chat-box');
const optionsBox = document.getElementById('options-box');
const resultScreen = document.getElementById('result-screen');

function loadQuestion() {
  if (currentIndex >= scenarioData.length) {
    showResult();
    return;
  }

  const q = scenarioData[currentIndex];
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message received';
  msgDiv.innerHTML = `<b>${q.sender}:</b> ${q.text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  optionsBox.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerText = opt.text;
    btn.onclick = () => handleSelect(opt, q);
    optionsBox.appendChild(btn);
  });
}

function handleSelect(option, question) {
  totalScore += option.score;

  const userDiv = document.createElement('div');
  userDiv.className = 'message sent';
  userDiv.innerText = option.reply;
  chatBox.appendChild(userDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  optionsBox.innerHTML = '';
  currentIndex++;

  setTimeout(loadQuestion, 800);
}

function showResult() {
  chatBox.classList.add('hidden');
  optionsBox.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const title = document.getElementById('result-title');
  const badge = document.getElementById('result-badge');
  const desc = document.getElementById('result-desc');

  badge.innerText = `🏆 Tổng điểm: ${totalScore}/100`;

  if (totalScore >= 75) {
    title.innerText = "Cáo Già Cyber 🦊";
    desc.innerText = "Tỉnh táo đỉnh cao! Kẻ xấu hoàn toàn không có cửa thao túng tâm lý bạn.";
  } else if (totalScore >= 50) {
    title.innerText = "Cư Dân Mạng Tinh Tế 🛡️";
    desc.innerText = "Có kỹ năng phòng thủ cơ bản, cần cảnh giác hơn trước các chiêu trò lừa đảo tinh vi.";
  } else {
    title.innerText = "Nạn Nhân Mẫu Mực ⚠️";
    desc.innerText = "Rất dễ bị lừa đảo và thao túng trên mạng. Cần tham gia ngay chiến dịch 'Không Một Mình 2026' để lấy lại bản lĩnh!";
  }
}

function restartGame() {
  currentIndex = 0;
  totalScore = 0;
  chatBox.innerHTML = '<div class="message system">Bắt đầu lượt chơi mới!</div>';
  chatBox.classList.remove('hidden');
  optionsBox.classList.remove('hidden');
  resultScreen.classList.add('hidden');
  loadQuestion();
}

// Hàm đổi giao diện màu sắc
function changeTheme(themeName) {
  const body = document.getElementById('page-body');
  body.className = body.className.replace(/theme-\S+/g, ''); // Xóa theme cũ
  if (themeName !== 'cyber') {
    body.classList.add(`theme-${themeName}`);
  }
}

// Hàm đổi kho hình nền
function changeWallpaper(bgName) {
  const body = document.getElementById('page-body');
  body.className = body.className.replace(/bg-\S+/g, ''); // Xóa bg cũ
  body.classList.add(bgName);
}

loadQuestion();
