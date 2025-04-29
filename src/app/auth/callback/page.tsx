// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/util/supabase/client";
// import { UserStore } from "@/store/user";

// export default function AuthCallback() {
//   const supabase = createClient();
//   const router = useRouter();
//   const setUser = UserStore((state) => state.setName);

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       console.log('data', data);
//       setUser(data.session?.user?.user_metadata?.full_name);

//       if (error || !data.session) {
//         console.error("Authentication failed:", error);
//         router.push("/login");
//       } else {
//         router.push("/"); // 로그인 후 이동할 페이지
//       }
//     };

//     checkSession();
//   }, [router]);

//   return <p>로그인 중...</p>;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/util/supabase/client";

export default function AuthCallback() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('data', data);
      if (error || !data.session) {
        console.error("Authentication failed:", error);
        router.push("/login");
      } else {
        router.push("/"); // 로그인 후 이동할 페이지
      }
    };

    checkSession();
  }, [router]);

  return <p>로그인 중...</p>;
}
