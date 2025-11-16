import * as fs from 'fs';
import * as path from 'path';
// const fs = require('fs');
// const path = require('path');
// console.log("tlqkf 여기요 여기", import.meta.url);
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const POSTS_PATH = path.join(__dirname, 'posts.json');
// const COMMENTS_PATH = path.join(__dirname, 'comments.json');
const POSTS_PATH = "./storage/posts.json";
const COMMENTS_PATH = "./storage/comments.json"; // 임시
const USERS_PATH = "./storage/users.json";

// utils
export function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath));
}

export function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
// POSTS
export function getPosts() {
    return readJson(POSTS_PATH);
}

export function getPostById(post_id) {
    const posts = getPosts();
    // console.log("=============");
    // posts.forEach(element => {
    //     console.log(`${element.post_id},${typeof(element.post_id)},  ${post_id}, ${typeof(post_id)}   ${post_id===element.post_id}`);
    // });
    // console.log("=============");
    return posts.find(p => p.post_id === post_id);
}

export function savePosts(posts) {
    writeJson(POSTS_PATH, posts);
}

export function addPost(post) {
    const posts = getPosts();
    posts.push(post);
    savePosts(posts);
}

export function deletePost(post_id) {
    const posts = getPosts();
    const new_posts = posts.filter(p => p.post_id !== post_id);
    savePosts(new_posts);
}

export function editPost(post) {
    const posts = getPosts();
    const new_posts = posts.map(p => p.post_id === post.post_id ? post : p);
    savePosts(new_posts);
}

// COMMENTS
export function getComments() {
    return readJson(COMMENTS_PATH);
}

export function getCommentsByPostId(post_id) {
    const comments = readJson(COMMENTS_PATH);
    const target_comments = comments.filter(c => c.post_id === post_id);
    // console.log(target_comments);
    return target_comments;
}

export function saveComments(comments) {
    writeJson(COMMENTS_PATH, comments);
}

export function addComment(comment) {
    const comments = getComments();
    comments.push(comment);
    saveComments(comments);
}

// USERS
export function getUsers() {
    return readJson(USERS_PATH);
}

export function getUsersById(user_id) {
    const users = getUsers();
    const user = users.find(u => u.user_id === user_id);
    return user;
}

export function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

export function saveUsers(users) {
    writeJson(USERS_PATH, users);
}