// 날짜 반환
export function getFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const day = String(now.getDate()).padStart(2, '0');

  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2,'0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export async function makeImageUrl(file_input) {
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