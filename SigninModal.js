document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const showLoginModal = document.getElementById("showLoginModal");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const loginForm = document.querySelector(".login-form");
  const userLoggedIn = document.getElementById("userLoggedIn");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  const registerModal = document.getElementById("registerModal");
  const showRegister = document.getElementById("showRegister");
  const closeRegisterModal = document.getElementById("closeRegisterModal");
  const showLoginFromRegister = document.getElementById(
    "showLoginFromRegister"
  );
  const registerForm = document.querySelector(".register-form");

  const toggleModal = (show) => loginModal.classList.toggle("active", show);
  const toggleRegisterModal = (show) =>
    registerModal.classList.toggle("active", show);

  // Kiểm tra trạng thái đăng nhập khi tải trang
  checkLoginStatus();

  showLoginModal.addEventListener("click", () => toggleModal(true));
  closeLoginModal.addEventListener("click", () => toggleModal(false));
  loginModal.addEventListener(
    "click",
    (e) => e.target === loginModal && toggleModal(false)
  );

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal(false);
    toggleRegisterModal(true);
  });

  showLoginFromRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleRegisterModal(false);
    toggleModal(true);
  });

  closeRegisterModal.addEventListener("click", () =>
    toggleRegisterModal(false)
  );
  registerModal.addEventListener(
    "click",
    (e) => e.target === registerModal && toggleRegisterModal(false)
  );

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    const userData = {
      fullName: firstName + " " + lastName,
      email,
      password,
    };

    localStorage.setItem(email, JSON.stringify(userData));
    alert(`Đăng ký thành công cho ${userData.fullName}!`);
    toggleRegisterModal(false);
    toggleModal(true);

    document.getElementById("email").value = email;
    document.getElementById("password").focus();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("Email chưa được đăng ký!");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      alert("Đăng nhập thành công! Chào mừng, " + user.fullName);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.fullName);
      checkLoginStatus();
      toggleModal(false);
    } else {
      alert("Mật khẩu không đúng!");
    }
  });

  // Xử lý sự kiện đăng xuất (phiên bản duy nhất)
  logoutBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    checkLoginStatus();
    // Đóng modal nếu đang mở
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
  });

  // Hàm checkLoginStatus duy nhất
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    if (isLoggedIn && username) {
      document.getElementById("showLoginModal").style.display = "none";
      document.getElementById("userLoggedIn").style.display = "block";
      if (usernameDisplay) {
        usernameDisplay.textContent = username;
      }
      // Thêm dòng này để hiển thị nút đăng xuất trong header
      document.querySelector(".header-actions #userLoggedIn").style.display =
        "block";
      document.querySelector(".header-actions #showLoginModal").style.display =
        "none";
    } else {
      showLoginModal.style.display = "block";
      userLoggedIn.style.display = "none";

      // Thêm dòng này để ẩn nút đăng xuất trong header
      document.querySelector(".header-actions #userLoggedIn").style.display =
        "none";
      document.querySelector(".header-actions #showLoginModal").style.display =
        "block";
    }
  }

  // Load audio player
  fetch("components/buttons/buttons.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("audio-container").innerHTML = html;
    })
    .catch((err) => console.error("Error loading audio player:", err));
});
