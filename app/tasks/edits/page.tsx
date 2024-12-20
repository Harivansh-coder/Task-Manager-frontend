// tasks/edits/page.tsx
"use client";

import { Suspense } from "react";
import EditTask from "@/components/EditTask";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditTask />
    </Suspense>
  );
}
