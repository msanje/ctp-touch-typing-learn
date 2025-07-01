"use client";

// import Certificate from "@/components/Certificate";
import Certificate from "@/components/TestComponent";
import { CompletePage } from "@/components/Complete";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CertificateData } from "@/types/GlobalTypes";

export default function Page() {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCompletion = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/progress/completion", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setIsCompleted(false);
          setIsLoading(false);
          toast.error("Failed to check completion status.");
          return;
        }

        const data = await res.json();
        setIsCompleted(data.isCompleted);

        // Creating certificate if completed
        if (data.isCompleted) {
          const certRes = await fetch("/api/certificate/create", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.userId,
              title: "Advanced Touch Typing Mastery",
              isCompleted: true,
            }),
          });

          if (certRes.ok || certRes.status == 409) {
            const certData = await certRes.json();
            setCertificateData(certData.certificate);

            if (certRes.status === 409) {
              toast("Certificate alread exists and was retrieved.");
            } else {
              toast.success("Certificate created successfully!");
            }
          } else {
            const errorData = await certRes.json();
            toast.error(errorData.message || "Failed to create certificate.");
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error checking completion or creating certificate.");
        }
        setIsCompleted(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkCompletion();
  }, []);

  if (isLoading) {
    return <div className="mt-12">Checking Progress...</div>;
  }

  if (isCompleted === false) {
    return (
      <div className="mt-12">
        <CompletePage isCompleted={false} />
      </div>
    );
  }

  if (isCompleted && !certificateData) {
    return (
      <div className="mt-12">
        Certificate data not available. Please try refreshing.
      </div>
    );
  }

  // if (isCompleted == null) {
  //   return <div className="mt-12">Checking Progress....</div>;
  // }

  return (
    <div className="mt-12">
      {/* <CompletePage isCompleted={false} /> */}
      {/* TODO: Fetch attributes from backend */}
      {isCompleted && certificateData && (
        <Certificate
          // TODO: use it - pass the right thing
          type="COURSE"
          userName={certificateData!.userName}
          completionDate={new Date(
            certificateData!.issuedDate
          ).toLocaleDateString()}
          courseTitle={certificateData!.title}
          wpm={certificateData!.wpm ?? undefined}
          accuracy={certificateData!.accuracy ?? undefined}
          certificateId={certificateData!.certificateId}
          isPaid={certificateData!.isPaid}
          blurred={!certificateData!.isPaid}
        />
      )}
      {!certificateData?.isPaid && <CompletePage isCompleted={isCompleted!} />}
    </div>
  );
}
