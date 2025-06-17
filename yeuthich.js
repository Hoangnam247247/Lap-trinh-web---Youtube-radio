// Xử lý trạng thái đăng nhập
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Cập nhật giao diện
  document.getElementById("showLoginModal").style.display = isLoggedIn
    ? "none"
    : "block";
  document.getElementById("userLoggedIn").style.display = isLoggedIn
    ? "block"
    : "none";
  document.getElementById("notLoggedIn").style.display = isLoggedIn
    ? "none"
    : "flex";
  document.getElementById("favoritesList").style.display = isLoggedIn
    ? "block"
    : "none";

  // Nếu đã đăng nhập thì load danh sách yêu thích
  if (isLoggedIn) {
    loadFavorites();
  }
}

// Tải danh sách yêu thích
function loadFavorites() {
  const favoritesGrid = document.getElementById("favoritesGrid");

  // Lấy danh sách từ localStorage hoặc API
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = "<p>Bạn chưa có mục yêu thích nào</p>";
    return;
  }

  // Hiển thị danh sách
  favoritesGrid.innerHTML = favorites
    .map(
      (item) => `
    <div class="program-item">
      <img src="${item.image}" alt="${item.title}" class="program-img">
      <div class="program-info">
        <p>${item.title}</p>
        <p>${item.author}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// Xử lý sự kiện khi trang load
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra đăng nhập
  checkLoginStatus();

  // Xử lý nút đăng nhập trong phần "chưa đăng nhập"
  document
    .getElementById("showLoginBtn")
    .addEventListener("click", function () {
      document.getElementById("loginModal").classList.add("active");
    });

  // Xử lý đăng xuất
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    checkLoginStatus();
  });
});
// Hiển thị modal đăng nhập
document
  .getElementById("showLoginModal")
  .addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "block";
  });

// Đóng modal đăng nhập
document
  .getElementById("closeLoginModal")
  .addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "none";
  });

// Chuyển sang modal đăng ký
document.getElementById("showRegister").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("registerModal").style.display = "block";
});

// Đóng modal đăng ký
document
  .getElementById("closeRegisterModal")
  .addEventListener("click", function () {
    document.getElementById("registerModal").style.display = "none";
  });

// Chuyển từ đăng ký sang đăng nhập
document
  .getElementById("showLoginFromRegister")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("registerModal").style.display = "none";
    document.getElementById("loginModal").style.display = "block";
  });

// Đóng modal khi click ra ngoài
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("loginModal")) {
    document.getElementById("loginModal").style.display = "none";
  }
  if (event.target === document.getElementById("registerModal")) {
    document.getElementById("registerModal").style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const favoritesList = document.getElementById("favoritesGrid");
  const notLoggedIn = document.getElementById("notLoggedIn");
  const loggedInSection = document.getElementById("favoritesList");

  if (isLoggedIn) {
    notLoggedIn.style.display = "none";
    loggedInSection.style.display = "block";
    loadFavorites();
  } else {
    notLoggedIn.style.display = "block";
    loggedInSection.style.display = "none";
  }

  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
      favoritesList.innerHTML = "<p>Danh sách yêu thích trống.</p>";
      return;
    }

    favorites.forEach((item) => {
      const favoriteItem = document.createElement("div");
      favoriteItem.className = "program-item";
     favoriteItem.innerHTML = `
  <img class="program-img" src="${item.imageSrc}" alt="${item.title}">
  <div class="program-title">${item.title}</div>
  <button class="favorite-btn active" onclick="removeFavorite('${item.title}')">
    <i class="fas fa-heart"></i>
  </button>
`;
      favoritesList.appendChild(favoriteItem);
    });
  }

  window.removeFavorite = function (title) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((item) => item.title !== title);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    loadFavorites(); // Tải lại danh sách sau khi xóa
  };
});
