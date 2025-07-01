import { getTypingLevel } from "@/helpers/getTypingLevel";
import { levelStyles } from "@/levelStyles";
import React, { useState } from "react";
import toast from "react-hot-toast";

type TypingTestCertificateProps = {
  userName: string;
  completionDate: string;
  courseTitle?: string;
  wpm: number;
  accuracy: number;
  certificateId?: string;
  blurred?: boolean;
  isPaid?: boolean;
};

const TypingTestCertificate: React.FC<TypingTestCertificateProps> = ({
  userName,
  completionDate,
  courseTitle = "Advanced Touch Typing Mastery",
  wpm,
  accuracy,
  certificateId = "KS-" + Math.random().toString(36).substr(2, 8).toUpperCase(),
  blurred,
  isPaid,
}) => {
  const certificateRef = React.useRef(null);
  const [pdfMode, setPdfMode] = useState(false);

  console.log("wpm: ", wpm);
  console.log("accuracy: ", accuracy);

  const skillLevel = getTypingLevel(wpm, accuracy);

  console.log("skillLevel: ", skillLevel);

  if (skillLevel === null) {
    return (
      <div className="origin-top mx-auto w-fit">
        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gray-400 rounded-full mb-4">
              <span className="text-2xl font-bold text-white">KS</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Keep Practicing!
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              You&apos;re on the right track, but need a bit more practice to
              earn your certificate.
            </p>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                Your Current Stats:
              </h3>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600">{wpm}</div>
                  <div className="text-sm text-gray-500">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600">
                    {accuracy}%
                  </div>
                  <div className="text-sm text-gray-500">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                Minimum Requirements:
              </h3>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">35+</div>
                  <div className="text-sm text-blue-500">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">85%+</div>
                  <div className="text-sm text-blue-500">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <p className="font-semibold text-gray-800">Tips to improve:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Focus on accuracy first, then speed will follow</li>
                <li>• Practice proper finger positioning</li>
                <li>• Take regular breaks to avoid fatigue</li>
                <li>• Use online typing games and exercises</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentStyle = skillLevel
    ? levelStyles[skillLevel]
    : levelStyles.BEGINNER;

  const handleDownload = async () => {
    if (!certificateRef.current) {
      console.error(
        "Error: Certificate element not found for PDF conversion. Ref is null."
      );
      toast.error("Certificate not ready for download. Please try again.");
      return;
    }

    const loadingToastId = toast.loading("Generating PDF...");
    setPdfMode(true);

    await new Promise((r) => setTimeout(r, 100));

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      html2pdf()
        .from(certificateRef.current)
        .set({
          margin: 0,
          filename: `${userName}_certificate.pdf`,
          html2canvas: {
            scale: 2,
            useCORS: true,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .save();

      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error generating PDF:", error);
      } else {
        toast.error("Unexpected error during PDF generation.");
      }
    } finally {
      setPdfMode(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <div className="origin-top mx-auto w-fit">
        <div
          className={blurred ? "blur-sm pointer-events-none select-none" : ""}
        >
          <div
            ref={certificateRef}
            className={`relative ${currentStyle.background} p-6 rounded-none shadow-none w-[210mm] h-[297mm] mx-auto overflow-hidden`}
          >
            {/* Decorative Borders */}
            <div
              className={`absolute inset-4 border-4 border-double rounded-lg ${currentStyle.border}`}
            />
            <div
              className={`absolute inset-6 border ${currentStyle.borderSecondary} rounded-lg`}
            />

            {/* Corner Decorations with Enhanced Styling */}
            <div
              className={`absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 ${currentStyle.cornerAccent} rounded-tl-lg`}
            >
              <div
                className={`absolute -top-1 -left-1 w-4 h-4 ${currentStyle.badgeColor} rounded-full opacity-60`}
              ></div>
            </div>
            <div
              className={`absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 ${currentStyle.cornerAccent} rounded-tr-lg`}
            >
              <div
                className={`absolute -top-1 -right-1 w-4 h-4 ${currentStyle.badgeColor} rounded-full opacity-60`}
              ></div>
            </div>
            <div
              className={`absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 ${currentStyle.cornerAccent} rounded-bl-lg`}
            >
              <div
                className={`absolute -bottom-1 -left-1 w-4 h-4 ${currentStyle.badgeColor} rounded-full opacity-60`}
              ></div>
            </div>
            <div
              className={`absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 ${currentStyle.cornerAccent} rounded-br-lg`}
            >
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 ${currentStyle.badgeColor} rounded-full opacity-60`}
              ></div>
            </div>

            {/* Level Ribbon */}
            <div
              className={`absolute top-12 right-12 ${currentStyle.ribbonGradient} text-white px-4 py-2 text-sm font-bold transform rotate-12 shadow-lg`}
            >
              {skillLevel || "BEGINNER"} LEVEL
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center py-8 px-6">
              {/* Header */}
              <div className="mb-6">
                <div
                  className={`mx-auto flex items-center justify-center w-20 h-20 rounded-full mb-4 ${currentStyle.badgeColor} shadow-lg ring-4 ring-white ring-opacity-50`}
                >
                  <span
                    className={`text-2xl font-bold text-white ${
                      pdfMode ? "pdf-mode" : ""
                    }`}
                  >
                    KS
                  </span>
                </div>
                <h1
                  className={`text-2xl font-bold tracking-wider ${currentStyle.textColor}`}
                >
                  KEYSTREAM ACADEMY
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Professional Typing Certification Program
                </p>
              </div>

              {/* Certificate Title */}
              <div className="mb-6">
                <h2
                  className={`text-4xl font-serif font-bold ${currentStyle.titleColor} mb-2`}
                >
                  CERTIFICATE
                </h2>
                <h3 className="text-2xl font-serif text-gray-700">
                  OF ACHIEVEMENT
                </h3>
              </div>

              {/* Award Section */}
              <div className="mb-6 space-y-4">
                <p className="text-lg text-gray-700">This is to certify that</p>
                <div className="flex flex-col items-center mb-6">
                  <h4
                    className={`text-3xl font-serif font-bold ${
                      currentStyle.nameColor
                    } tracking-wide ${pdfMode ? "pdf-name" : ""}`}
                  >
                    {userName}
                  </h4>
                  <div
                    className={`h-[2px] w-full ${currentStyle.nameUnderline} mt-2`}
                  ></div>
                </div>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  has successfully completed the requirements for the
                </p>
                <h5
                  className={`text-xl font-semibold ${currentStyle.textColor} my-4`}
                >
                  {courseTitle}
                </h5>
                <p className="text-lg text-gray-700">
                  and has demonstrated proficiency in touch typing skills
                </p>
              </div>

              {/* Metrics with Enhanced Styling */}
              {(wpm || accuracy) && (
                <div className="flex justify-center gap-8 mb-6">
                  {wpm !== undefined && (
                    <div
                      className={`flex flex-col items-center justify-center w-36 h-24 ${currentStyle.metricsBackground} rounded-lg p-4 shadow-md border-2 ${currentStyle.metricsBorder} relative overflow-hidden`}
                    >
                      <div
                        className={`absolute top-0 left-0 w-full h-1 ${currentStyle.ribbonGradient}`}
                      ></div>
                      <div
                        className={`text-2xl font-bold ${currentStyle.textColor}`}
                      >
                        {wpm}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Words Per Minute
                      </div>
                    </div>
                  )}
                  {accuracy !== undefined && (
                    <div
                      className={`flex flex-col items-center justify-center w-36 h-24 ${currentStyle.metricsBackground} rounded-lg p-4 shadow-md border-2 ${currentStyle.metricsBorder} relative overflow-hidden`}
                    >
                      <div
                        className={`absolute top-0 left-0 w-full h-1 ${currentStyle.ribbonGradient}`}
                      ></div>
                      <div
                        className={`text-2xl font-bold ${currentStyle.textColor}`}
                      >
                        {accuracy}%
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Accuracy</div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-start px-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  This certificate is presented in recognition of outstanding
                  dedication and consistent effort in mastering the art of touch
                  typing. The recipient has demonstrated remarkable precision,
                  speed, and attention to detail — key qualities essential for
                  efficient and professional digital communication.
                </p>
              </div>

              <div className="flex flex-row justify-around">
                {/* Signature Section */}
                <div className="flex justify-between items-start px-8 gap-4 mt-6 pt-4">
                  <div className="w-1/3 text-left">
                    <div className="border-b border-gray-400 w-40 mb-2"></div>
                    <p className="text-sm text-gray-600">Date of Completion</p>
                    <p className="font-semibold text-gray-800">
                      {completionDate}
                    </p>
                  </div>

                  <div className="w-1/3 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-2 ${currentStyle.sealColor} rounded-full flex items-center justify-center shadow-md`}
                    >
                      <div className="text-[10px] font-bold transform -rotate-12">
                        OFFICIAL
                      </div>
                    </div>
                    <div className="border-b border-gray-400 w-40 mb-2 mx-auto"></div>
                    <p className="text-sm text-gray-600">Director</p>
                    <p className="font-semibold text-gray-800">
                      KeyStream Academy
                    </p>
                  </div>

                  <div className="w-1/3 text-right">
                    <div className="border-b border-gray-400 w-40 mb-2 ml-auto"></div>
                    <p className="text-sm text-gray-600">Certificate ID</p>
                    <p className="font-mono text-sm text-gray-800 break-words">
                      {certificateId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-2 border-t border-gray-300 text-xs text-gray-500">
                <p>
                  This certificate verifies the successful completion of touch
                  typing proficiency requirements.
                </p>
                <p className="mt-1">
                  Verify authenticity at keystream.com/verify/{certificateId}
                </p>
              </div>
            </div>

            {/* Enhanced Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <div
                className={`text-9xl font-bold ${currentStyle.watermarkColor} transform rotate-45`}
              >
                KEYSTREAM
              </div>
            </div>
          </div>

          {/* PDF Download Button */}
          {isPaid && (
            <div className="text-center mt-4">
              <button
                onClick={handleDownload}
                className={`mt-8 text-white px-4 py-2 rounded hover:opacity-90 transition cursor-pointer ${currentStyle.ribbonGradient}`}
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TypingTestCertificate;
