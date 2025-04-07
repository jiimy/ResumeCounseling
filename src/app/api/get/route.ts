import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("size") || 10);

    const startIndex = page == 0 ? 0 : (page - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    console.log('api ', startIndex, endIndex);

    const session = await supabase.auth.getUser();
    const user_name = session?.data?.user?.email;

    const { data, error } = await supabase
      .from("review")
      .select("*", { count: "exact" })
      .range(startIndex, endIndex);
    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    // res.status(500).json({ error: error });
    return NextResponse.json({ error }, { status: 500 });
  }
}
