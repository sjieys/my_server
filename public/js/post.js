const params = new URLSearchParams(window.location.search);
const post_id = Number(params.get("post_id"));
// alert(`=======post_id: ${post_id}=======`);


const token = localStorage.getItem("token");
const require_post = await fetch(`http://localhost:3000/posts/${post_id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
});

const post = await require_post.json();
// post의 속성들
const nickname = post.nickname;
const title = post.title;
const content = post.content;
const imageUrl = post.imageUrl;
const date = post.date;


// alert(`지금 post_id: ${post_id}임`)
const comments_res = await fetch(`http://localhost:3000/comments?post_id=${post_id}`);
const comments = await comments_res.json();
const commentsCount = comments.length;
// alert(`comment_count = ${commentsCount}`);
// console.log(`post_title: ${title}`);
// alert(`post_content: ${,content}`);



// 요소들 내용 채우기
document.getElementById("post-title").textContent = title;
document.getElementById("post-nickname").textContent = nickname;
document.getElementById("post-date").textContent = date;
document.getElementById("post-content").textContent = content;
document.getElementById("post-image").src = imageUrl;
document.getElementById("comment-count").textContent = commentsCount;

// 공유 버튼 링크 주기
function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
    .then(() => alert("링크 복사 완료"))
    .catch(err => alert("링크 복사 실패"))
}

// 얘 게시글 작성자 맞음?
const auth_res = await fetch("http://localhost:3000/me", {
    method: "GET",
    headers: {"Authorization": `Bearer ${token}`}
});
const user = await auth_res.json();
alert(`지금 유저\nuser_id: ${user.user_id}, nickname: ${user.nickname}`);
alert(`해당 게시글 작성자\nwriter_id: ${post.user_id}, nicknmae: ${post.nickname}`);



document.getElementById("edit-btn").addEventListener("click", async(e) => {
    if(user.user_id === post.user_id) {
        alert(`post작성자: ${user.user_id}\nuser_id:${post.user_id}`);
        window.location.href = `http://localhost:3000/edit.html?post_id=${post_id}`;
    }
    else {
        alert("해당 게시글에 접근할 권한 없음");
    }
});

document.getElementById("delete-btn").addEventListener("click", async(e) => {
    if(user.user_id === post.user_id) {
        alert(`fetch보내기 전에 post_id: ${post_id}, typeof(post_id): ${typeof(post_id)}`);
        const delete_res = await fetch(`http://localhost:3000/posts/${post_id}`, {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
        });
        if(delete_res.ok) {alert("삭제 성공");}
        // alert(`delete_res.status: ${delete_res.status}`);
        window.location.href = "http://localhost:3000/main.html";
    }
    else {
        alert("해당 게시글에 접근할 권한 없음");
    }
});


document.querySelectorAll('.comment-btn').forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = `comments.html?post_id=${post_id}`;
        // console.log("시발 되는데");
    });
})