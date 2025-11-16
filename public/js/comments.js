import * as utils from './utils.js'
// 댓글 창
const params = new URLSearchParams(window.location.search);
const post_id = Number(params.get("post_id")); // "42" 문자열
const comment_section = document.getElementById("comment-list");
const comments_count = document.getElementById("comments-cnt");
// 댓글 입력
const submit_btn = document.getElementById("submit-btn");
const comment_input = document.getElementById("comment-input");
// 특정 post의 comments 불러오기
const res = await fetch(`http://localhost:3000/comments?post_id=${post_id}`, {
    method:'GET'
    }
);

const comments = await res.json();
comments_count.textContent = comments.length;

// 각 댓글 요소 create
comments.forEach(comment => {
   const comment_div = document.createElement("div");
   comment_div.innerHTML=`<div class="comment">
      <div class="comment-body">
        <div class="author">${comment.nickname}</div>
        <div class="date">${comment.date}</div>
        <div class="content">${comment.comment_content}</div>
      </div>
    </div>`;
    comment_section.appendChild(comment_div);
});

  // 토큰을 보내서 유저 정보 불러오기
  const token = localStorage.getItem("token");
  // console.log("-fetch하기 전-");
  const auth_res = await fetch('http://localhost:3000/me', {
      method: "GET",
      headers: {"Authorization": `Bearer ${token}`}
  });
  const user_info = await auth_res.json();
console.log("auth_res: ", auth_res);
if(auth_res.ok) {
  comment_input.disabled = false;
  comment_input.placeholder = "댓글을 입력하세요";
  submit_btn.style.display = "inline-block";
  submit_btn.addEventListener("click", async(e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/comments', {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(makeComment())
    });
    const comment_res = await res.json();
    alert("댓글 등록 성공!");
    comment_input.value = "";
    comment_input.placeholder = "댓글을 입력하세요";
    location.reload();
  });
  
}
function makeComment() {
  return ({
    post_id,
    comment_id: return_id(),
    nickname: user_info.nickname,
    comment_content: comment_input.value,
    // date: Date.now()
    date: utils.getFormattedDate()
  });
}

function return_id() {
  return `cmt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}