"use client";

// import Certificate from "@/components/Certificate";
import Certificate from "@/components/TestComponent";
import { TypingTestCertificateResponse } from "@/types/GlobalTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TypingTestCertificatePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [certificate, setCertificate] =
    useState<TypingTestCertificateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("user frontend: ", user);

  console.log("certificate: ", certificate);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCertificate = async () => {
      try {
        const res = await fetch(
          `/api/typing-test/certificate?userId=${user?.id}`
        );
        console.log("res frontent: ", res);

        const data = await res.json();

        console.log("data frontend: ", data);

        if (!res.ok)
          throw new Error(data.error || "Failed to fetch certificate");

        setCertificate(data.typingTestCertificate);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [user?.id]);

  if (loading) return <p className="text-center mt-10">Loading Certificate</p>;
  if (!certificate) return <p className="text-center mt-10">No Certificate</p>;

  return (
    <Certificate
      userName={certificate.user.username}
      completionDate={new Date(certificate.issuedDate).toLocaleDateString()}
      wpm={certificate.wpm}
      accuracy={certificate.accuracy}
      isPaid={true}
    />
  );
}
