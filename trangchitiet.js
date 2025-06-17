// Hàm phát tập
function playEpisode(title, src, imgSrc) {
  document.getElementById("playerBox").style.display = "flex";
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("audioPlayer").src = src;
  document.getElementById("audioPlayer").play();
  document.getElementById("playerImg").src = imgSrc;
}

// Hàm đóng player
function closePlayer() {
  const audio = document.getElementById("audioPlayer");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("playerBox").style.display = "none";
}

// Hàm thay đổi kích thước player
function toggleSize() {
  document.getElementById("playerBox").classList.toggle("expanded");
}

// Hàm thêm/xóa yêu thích
function toggleFavorite(button) {
  // Lấy thông tin từ data attributes
  const title = button.getAttribute("data-title");
  const audioSrc = button.getAttribute("data-audio");
  const imageSrc = button.getAttribute("data-image");

  // Kiểm tra đăng nhập
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    alert("Vui lòng đăng nhập để sử dụng tính năng này!");
    return;
  }

  // Lấy danh sách yêu thích từ localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Kiểm tra xem đã có trong danh sách chưa
  const existingIndex = favorites.findIndex((item) => item.title === title);

  if (existingIndex >= 0) {
    // Nếu đã có thì xóa khỏi danh sách
    favorites.splice(existingIndex, 1);
    button.classList.remove("active");
  } else {
    // Nếu chưa có thì thêm vào danh sách
    favorites.push({ title, audioSrc, imageSrc });
    button.classList.add("active");
  }

  // Lưu lại vào localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
// Hàm kiểm tra trạng thái yêu thích khi tải trang
function checkFavoriteStatus() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoriteButtons.forEach((button) => {
    const title = button.getAttribute("data-title");
    const isFavorite = favorites.some((item) => item.title === title);

    if (isFavorite) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra trạng thái yêu thích
  checkFavoriteStatus();

  // Gán sự kiện click cho các nút tim
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn không cho sự kiện lan ra ngoài
      toggleFavorite(this);
    });
  });
});
