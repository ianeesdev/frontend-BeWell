"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { googleAuth } from "../../../redux/features/auth/authSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("user");

    if (token) {
      dispatch(googleAuth(token));
      router.push("/");
    }
  }, [router]);

  router;
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
