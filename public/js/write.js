import * as utils from "./utils.js";
// post 객체의 속성 요소 불러오기
const write_title = document.getElementById("title");
const write_content = document.getElementById("content");
const write_form = document.getElementById("postForm");
const file_input = document.getElementById('imageInput');



// post 속성 부분들

    
// 토큰을 보내서 유저 정보 불러오기
const token = localStorage.getItem("token");
// console.log("-fetch하기 전-");
const auth_res = await fetch('http://localhost:3000/me', {
    method: "GET",
    headers: {"Authorization": `Bearer ${token}`}
});
const user_info = await auth_res.json();

alert(`user_id: ${user_info.user_id}`);
alert(`nickname: ${user_info.nickname}`);
// 로그인 안 했으면 쓸 권한 없다고 알려주기
if(auth_res.status === 401){
    alert("로그인이 필요한 기능입니다.");
    window.location.href = "login.html";
}
// 유저 정보를 기반으로 const post완성 후, body에 넣기
write_form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const post = await makePost();
    alert(`imageUrl: ${await makeImageUrl()}`);
    // post를 저장하는 요청
    const res = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
    });
    alert(`user_id: ${post.user_id}, nickname: ${post.nickname}`);
    window.location.href = 'main.html';
});

async function makePost() {
    return {
        post_id: Date.now(),
        user_id: user_info.user_id,
        nickname: user_info.nickname,
        title: write_title.value,
        content: write_content.value,
        imageUrl: await makeImageUrl(file_input),
        date: utils.getFormattedDate(document.getElementById('imageInput'))
    }
}

async function makeImageUrl(file_input) {
    // (이미지)파일
    // const fileInput = document.getElementById('imageInput');
    const formData = new FormData();
    formData.append('image', file_input.files[0]);
    // (이미지)파일 업로드 요청
    const upload_res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    });

    // 업로드 된 (이미지)파일의 링크를 변수에 저장
    const upload_data = await upload_res.json();
    // alert(`upload_data: ${upload_data}`);
    const imageUrl = upload_data.imageUrl;
    return imageUrl;
}