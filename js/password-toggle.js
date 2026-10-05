// 비밀번호 보기 / 숨기기 — input의 type을 password ↔ text로 바꾸기
// 버튼마다 data-target에 어떤 input을 바꿀지 적어둠 → 버튼이 여러 개여도 코드 하나로
document.querySelectorAll(".pw-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector(`#${button.dataset.target}`); // data-target="su-pw" → dataset.target
    if (input.type === "password") {
      input.type = "text";
      button.textContent = "숨기기";
    } else {
      input.type = "password";
      button.textContent = "보기";
    }
  });
});
