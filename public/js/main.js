const res = await fetch('http://localhost:3000/posts');
const posts = await res.json();
const post_section = document.getElementById("post-list");
// alert(`post_id:`);
// alert(`지금 post_id: ${post_id}임`)
// note: async 어케 한담
for(const post of posts) {
    const post_div = document.createElement("div");
    const post_id = post.post_id;
    // alert(`typeof(commentsCount): ${typeof(commentsCount)}`);
    const post_comments_cnt =await commentsCount(post_id);
    post_div.innerHTML = `<div class="post">
      <div class="post-left">
        <div class="post-user">
          <a href="post.html?post_id=${post_id}">${post.nickname}</a>
          <span>| ${post.date}</span>
        </div>
        <div class="post-title"><a href="post.html?post_id=${post_id}">${post.title}</a></div>
        <div class="post-summary"><a href="post.html?post_id=${post_id}">${trimUnder3Lines(post.content)}</a></div>
        <div class="post-comments"><a href="comments.html#comments?post_id=${post_id}">💬 댓글 ${post_comments_cnt}개</a></div>
      </div>
      <div class="post-right">
        <a href="post.html"><img src="${post.imageUrl}" alt="대표 이미지"></a>
      </div>
    </div>`
    post_section.appendChild(post_div);
    // alert(`post_id: ", ${post.post_id},\npost_id type: ${typeof(post.post_id)}`);
};



function trimUnder3Lines(text) {
    const maxChars = 100;
    return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
}

// async function commentsCount(post_id) {
//     const res = await fetch(`http://localhost:3000/comments?post_id=${post_id}`);
//     const comments = await res.json();
//     return Number(comments.length);
// }

async function commentsCount(post_id) {
  const comments_res = await fetch(`http://localhost:3000/comments?post_id=${post_id}`);
  const comments = await comments_res.json();
  // alert(`comments: ${comments}\ncomments.length: ${comments.length}`);
  return comments.length;
}


