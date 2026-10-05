// 로그인 — localStorage에 저장된 계정 목록에서 아이디·비밀번호가 같은 사람 찾기

const loginForm = document.querySelector(".login-card");
const loginResult = document.querySelector("#login-result");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.querySelector("#lg-id").value.trim();
  const pw = document.querySelector("#lg-pw").value;

  // 빈 칸 검사
  if (id === "" || pw === "") {
    loginResult.textContent = "아이디와 비밀번호를 입력하세요";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const user = users.find((user) => user.id === id && user.pw === pw);

  if (!user) {
    // 아이디·비밀번호 중 뭐가 틀렸는지는 안 알려주는 게 보안상 기본
    loginResult.textContent = "아이디 또는 비밀번호가 올바르지 않아요";
    return;
  }

  // 로그인 상태는 sessionStorage — 탭(브라우저)을 닫으면 자동 로그아웃
  sessionStorage.setItem("loginUser", JSON.stringify({ id: user.id, name: user.name }));
  location.href = "./index.html";
});
