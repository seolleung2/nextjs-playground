import React from "react";
import { useRouter } from "next/router";

function ClientProjectDetailPage() {
  const router = useRouter();
  console.log(router.query);
  return <div>ClientProjectDetailPage</div>;
}

export default ClientProjectDetailPage;
