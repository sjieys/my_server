const login_btn = document.getElementById("login");
const id_input = document.getElementById("user-id");
const pw_input = document.getElementById("user-password");


login_btn.addEventListener("click", async () => {
    const id = id_input.value;
    const pw = pw_input.value;
    console.log("--login.js--","id:", id,"pw: ", pw);
    const res = await fetch("http://localhost:3000/login", {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
            pw: pw
        })
    });
    // console.log(`login.js ===== res: ${res.ok}`);
    const login_res = await res.json();
    if(res.status === 401) {
        alert(login_res.message);
    }
    else if(res.ok) {
        // 로그인 성공 시, 토큰 주고 메인 화면 보여주기
        alert("로그인 환영!");
        localStorage.setItem("token", login_res.token);
        window.location.href="main.html";
    }
    else {
        // NOTE: 그외의 에러는 어케 처리한담
        alert("login.js의 else 부분\n이걸 본다면 일단 새로운 error발견임");
    }
    
    
    
});