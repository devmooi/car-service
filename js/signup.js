// 계정 신청 — 정규표현식으로 입력 검사 → 전부 통과하면 버튼 활성화 → localStorage에 저장

// 칸마다 검사할 규칙 (/패턴/.test(값) → true·false)
const rules = {
  id: /^[a-zA-Z][a-zA-Z0-9]{3,11}$/, // 영문 시작 + 영문·숫자, 전체 4~12자
  pw: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, // 영문·숫자·특수문자 각각 1개 이상, 8~15자
  name: /^[가-힣]{2,}$/, // 한글 2자 이상
  phone: /^01[0-9]-\d{3,4}-\d{4}$/, // 010-1234-5678
};

const idInput = document.querySelector("#su-id");
const pwInput = document.querySelector("#su-pw");
const pw2Input = document.querySelector("#su-pw2");
const nameInput = document.querySelector("#su-name");
const phoneInput = document.querySelector("#su-phone");
const signupBtn = document.querySelector("#signup-btn");
const result = document.querySelector("#signup-result");

// 메시지 색 바꾸기 — 통과하면 ok, 아니면 error (빈 칸일 땐 기본 회색)
const showCheck = (input, messageId, ok) => {
  const message = document.querySelector(messageId);
  message.classList.remove("ok", "error");
  if (input.value !== "") {
    message.classList.add(ok ? "ok" : "error");
  }
  return ok;
};

const validate = () => {
  const idOk = showCheck(idInput, "#su-id-msg", rules.id.test(idInput.value));
  const pwOk = showCheck(pwInput, "#su-pw-msg", rules.pw.test(pwInput.value));
  // 비밀번호 확인은 정규식이 아니라 두 값 비교
  const pw2Ok = showCheck(pw2Input, "#su-pw2-msg", pw2Input.value !== "" && pw2Input.value === pwInput.value);
  const nameOk = showCheck(nameInput, "#su-name-msg", rules.name.test(nameInput.value));
  const phoneOk = showCheck(phoneInput, "#su-phone-msg", rules.phone.test(phoneInput.value));

  // 하나라도 false면 버튼 비활성화
  signupBtn.disabled = !(idOk && pwOk && pw2Ok && nameOk && phoneOk);
};

// 입력할 때마다 전체 검사
[idInput, pwInput, pw2Input, nameInput, phoneInput].forEach((input) => {
  input.addEventListener("input", validate);
});

// 제출 → 저장
document.querySelector("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault(); // 새로고침 막기

  // 저장된 계정 목록 꺼내기 — 처음이면 null이라 빈 배열로
  const users = JSON.parse(localStorage.getItem("users")) ?? [];

  // 같은 아이디가 이미 있는지 (find — 조건에 맞는 첫 번째 요소, 없으면 undefined)
  const exists = users.find((user) => user.id === idInput.value);
  if (exists) {
    result.textContent = "이미 사용 중인 아이디예요";
    result.className = "form-result error";
    return;
  }

  users.push({
    id: idInput.value,
    pw: pwInput.value, // ⚠️ 연습용 — 실제 서비스는 비밀번호를 서버에서 암호화해서 저장
    name: nameInput.value,
    phone: phoneInput.value,
  });
  // localStorage는 문자열만 저장 → 배열을 JSON 문자열로
  localStorage.setItem("users", JSON.stringify(users));

  result.textContent = `${nameInput.value}님 계정 신청 완료! 로그인 화면으로 이동합니다`;
  result.className = "form-result ok";
  setTimeout(() => {
    location.href = "./login.html";
  }, 1500);
});
