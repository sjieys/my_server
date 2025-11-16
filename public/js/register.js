const register_btn = document.getElementById("register-btn");
const id_input = document.getElementById("id-input");
const pw_input = document.getElementById("pw-input");

register_btn.addEventListener("click", async() => {
    const id = id_input.value;
    const pw = pw_input.value;
    
    const res = await fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({register_id: id, register_pw: pw})
    });
    const register_res = await res.json();
    alert(register_res.message);
    // 신규(기존) 회원이라면 로그인창으로
    window.location.href = "http://localhost:3000/login.html";
    
});
// alert("시발")
// register_btn.addEventListener("click", e => {
//     e.preventDefault();
//     alert("버튼이 눌렸음");
// });