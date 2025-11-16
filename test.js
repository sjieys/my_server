// comments test
// const storage = require('../../js/storage/storage');
import * as storage from './storage.js';
const test1 = {
    post_id: 1,
    comment_id: 1,
    nickname: "test1",
    comment_content: "sdsd",
    date: "20040603_110713"
};

const test2 = {
    post_id: 1,
    comment_id: 2,
    nickname: "test2",
    comment_content: "sdsd",
    date: "20040603_110714"
};

const test3 = {
    post_id: 2,
    comment_id: 1,
    nickname: "test3",
    comment_content: "sdsd",
    date: "20040603_110713"
};

// storage.writeJson("./storage/comments.json", test1);
// storage.addComment(test1);
// storage.addComment(test2);
// storage.addComment(test3);
// const target1 = storage.getCommentsByPostId(1);
// target1.forEach(c => {
//     console.log("====");
//     console.log(c);
// });

// post test
const test4 = {
    post_id: 1,
    nickname: "ㅇㅅㅇ",
    title: "test4",
    content: "여기는 ㅇㅅㅇ 하는 사람 없어서 좋네요",
    imageUrl: "없음",
    date: "20050504_123152"
};

const test5 = {
    post_id: 1,
    nickname: "ㅇㅅㅇ",
    title: "test5",
    content: "꺼억",
    imageUrl: "없음",
    date: "20050504_123154"
};

// storage.addPost(test4);
// storage.addPost(test5);

const comments = storage.getCommentsByPostId(1);
// console.log(comments.length);

// const comments_res = await fetch(`http://localhost:3000/comments?post_id=0`);
// const comments = await comments_res.json();
// const commentsCount = comments.length;