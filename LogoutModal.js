// ===== XỬ LÝ ĐĂNG NHẬP/ĐĂNG XUẤT =====
document.addEventListener("DOMContentLoaded", function () {
  const userLoggedIn = document.getElementById("userLoggedIn");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");
  const showLoginBtn = document.getElementById("showLoginBtn");

  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "Người dùng";

  // Cập nhật giao diện
  if (isLoggedIn) {
    showLoginBtn.style.display = "none";
    userLoggedIn.style.display = "block";
    usernameDisplay.textContent = username;
  }

  // Xử lý đăng xuất
  logoutBtn?.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.reload(); // Tải lại trang
  });

  // Xử lý mở modal đăng nhập (nếu dùng chung SigninModal.js)
  showLoginBtn?.addEventListener("click", function () {
    document.getElementById("loginModal").classList.add("active");
  });
});

// Hàm xử lý sau khi đăng nhập thành công (dùng chung với modal)
function handleLoginSuccess(username) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);
  window.location.reload();
}
