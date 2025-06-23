"use client";

import { CompletePage } from "@/components/Complete";
import { FC, useEffect, useState } from "react";

const Complete: FC = () => {
  // TODO: Get is completed from backend
  const [isCompleted, setIscompleted] = useState(true);

  // TODO: fix this
  useEffect(() => {
    setIscompleted(true);
  }, []);

  return (
    <div>
      <CompletePage isCompleted={isCompleted} />
    </div>
  );
};

export default Complete;
