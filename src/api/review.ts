import axios from "axios";

// 리뷰 등록
export async function reviewPostApi(
  year: string,
  branch: string,
  content: string
) {
  const res = await axios.post(`/api/post`, {
    year: year,
    branch: branch,
    content: content,
  });

  if (res.status === 200) {
    // return res.data.data;
  }
}

// 리뷰 가져오기
export async function reviewAlltApi(pageParam: number, size: number) {
  const res = await axios.get(`/api/get?pagee=${pageParam}&size=${size}`);

  if (res.status === 200) {
    return res.data.data;
  }
}

// 리뷰 상세보기는 없어도 됨. 그렇게 내용이 많은게 아니니
