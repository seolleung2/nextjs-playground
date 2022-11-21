import React from "react";
import { useRouter } from "next/router";

function PortfolioDetailPage() {
  const router = useRouter();

  console.log("router", router); // router.query 에 접근이 가능. {id : 1}
  return <div>PortfolioDetailPage</div>;
}

export default PortfolioDetailPage;
