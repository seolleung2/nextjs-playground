import React from "react";
import { useRouter } from "next/router";

function ClientDetailPage() {
  const router = useRouter();

  const loadProjectPageHandler = () => {
    router.push({
      pathname: "/clients/[id]/[projectid]",
      query: { id: "teddy", projectid: "projecta" },
    });
  };

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectPageHandler}>Load Project A</button>
    </div>
  );
}

export default ClientDetailPage;
