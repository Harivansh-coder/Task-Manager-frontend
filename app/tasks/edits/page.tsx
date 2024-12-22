// tasks/edits/page.tsx
"use client";

import { Suspense } from "react";
import EditTask from "@/components/EditTask";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <EditTask />
    </Suspense>
  );
}
