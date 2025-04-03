import axios from "axios";

export async function postApi(year: string, branch: string, text: string) {
  const res = await axios.post(`/api/post`, {
    year: year,
    branch: branch,
    content: text,
  });

  if (res.status === 200) {
    // return res.data.data;
  }
}