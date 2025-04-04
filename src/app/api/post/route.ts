import { createClient } from "@/util/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const session = await supabase.auth.getUser();
    const uploader = session.data?.user?.email;
    console.log('dd', session.data?.user);
    // session.data.session?.user?.user_metadata?.full_name;

    const { year, branch, content } = await request.json();
    if (!content) {
      throw new Error("content is required");
    }
    
    // const { data, error } = await supabase
    //   .from("review")
    //   .insert([{ year, branch, content, uploader }]);

    // if (error) {
    //   console.error("Supabase Error:", error);
    //   return NextResponse.json({ error: error.message }, { status: 500 });
    // }

    // return NextResponse.json({ message: "Post created successfully", data });
  } catch (error: any) {
    console.error("Server Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }
}
