import axios from "axios";

export async function postApi(year: string, branch: string, content: string) {
  const res = await axios.post(`/api/post`, {
    year: year,
    branch: branch,
    content: content,
  });

  if (res.status === 200) {
    // return res.data.data;
  }
}