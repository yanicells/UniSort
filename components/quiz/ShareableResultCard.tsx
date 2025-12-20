"use client";

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { Share2 } from "lucide-react";
import { universityFeedback } from "@/lib/quiz/result-data";

const uniColors = {
  admu: "#0033A0",
  dlsu: "#006747",
  up: "#8B0000",
  ust: "#FDB71A",
};

const uniFullNames = {
  admu: "Ateneo de Manila University",
  dlsu: "De La Salle University",
  up: "University of the Philippines",
  ust: "University of Santo Tomas",
};

const uniImages = {
  admu: "/ADMU.png",
  dlsu: "/DLSU.png",
  up: "/UP.png",
  ust: "/UST.PNG",
};

interface ShareableResultCardProps {
  topUniversity: "admu" | "dlsu" | "up" | "ust";
  percentages: {
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  };
  verdict: string;
  name?: string;
}

// Donut chart component for the card
function DonutChart({
  percentages,
  topUniversity,
}: {
  percentages: ShareableResultCardProps["percentages"];
  topUniversity: ShareableResultCardProps["topUniversity"];
}) {
  const sortedData = [
    { uni: "up", value: percentages.up, color: uniColors.up },
    { uni: "ust", value: percentages.ust, color: uniColors.ust },
    { uni: "admu", value: percentages.admu, color: uniColors.admu },
    { uni: "dlsu", value: percentages.dlsu, color: uniColors.dlsu },
  ];

  let cumulativePercent = 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="90" fill="none" />
        {sortedData.map((item, index) => {
          const startPercent = cumulativePercent;
          cumulativePercent += item.value;
          const startAngle = (startPercent / 100) * 360 - 90;
          const endAngle = (cumulativePercent / 100) * 360 - 90;

          const x1 = 100 + 90 * Math.cos((Math.PI * startAngle) / 180);
          const y1 = 100 + 90 * Math.sin((Math.PI * startAngle) / 180);
          const x2 = 100 + 90 * Math.cos((Math.PI * endAngle) / 180);
          const y2 = 100 + 90 * Math.sin((Math.PI * endAngle) / 180);

          const largeArcFlag = item.value > 50 ? 1 : 0;

          return (
            <path
              key={index}
              d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        {/* Center white circle for donut effect */}
        <circle cx="100" cy="100" r="50" fill="white" />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-5xl font-black"
          style={{ color: uniColors[topUniversity] }}
        >
          {percentages[topUniversity]}
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          MATCH
        </div>
      </div>
    </div>
  );
}

// Helper function to get feedback text based on percentage
const getFeedbackText = (uni: string, percentage: number) => {
  const data = universityFeedback[uni];
  if (!data) return "";

  const range = data.ranges.find(
    (r) => percentage >= r.min && percentage < r.max
  );

  // Fallback for edge cases
  if (!range) {
    if (percentage >= 65) return data.ranges[data.ranges.length - 1].text;
    return data.ranges[0].text;
  }

  return range.text;
};

export function ShareableResultCard({
  topUniversity,
  percentages,
  verdict,
  name,
}: ShareableResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const topPercentage = percentages[topUniversity];
  const universityName = uniFullNames[topUniversity];
  const isAnonymous = !name || name === "Anonymous";
  const greeting = isAnonymous
    ? `Welcome to ${universityName}!`
    : `${name}, welcome to ${universityName}!`;

  const sortedScores = [
    { uni: "up", percentage: percentages.up },
    { uni: "ust", percentage: percentages.ust },
    { uni: "admu", percentage: percentages.admu },
    { uni: "dlsu", percentage: percentages.dlsu },
  ].sort((a, b) => b.percentage - a.percentage);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = uniImages[topUniversity];
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load image");
      setImageLoaded(true); // Still enable button
    };
  }, [topUniversity]);

  const handleShare = async () => {
    if (!cardRef.current) {
      alert("Card not ready. Please try again.");
      return;
    }

    setIsGenerating(true);

    try {
      // Wait a bit for any rendering to settle
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        width: 1200,
        height: 2200,
        foreignObjectRendering: false,
        removeContainer: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Remove all external stylesheets from cloned document to avoid parsing errors
          const styles = clonedDoc.querySelectorAll(
            'link[rel="stylesheet"], style'
          );
          styles.forEach((style) => {
            if (style.parentNode) {
              style.parentNode.removeChild(style);
            }
          });
        },
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to create image");
        }

        const url = URL.createObjectURL(blob);

        // Detect mobile/tablet devices
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
          // For mobile: Open image in new tab so user can long-press to save to photos
          const newWindow = window.open(url, "_blank");
          if (!newWindow) {
            alert("Please allow popups to view and save the image");
          }
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } else {
          // For desktop: Download directly
          const a = document.createElement("a");
          a.href = url;
          a.download = `unisort-result-${topUniversity}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }

        setIsGenerating(false);
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Failed to generate image: ${error}`);
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Share Button - Visible to users */}
      <button
        onClick={handleShare}
        disabled={isGenerating || !imageLoaded}
        className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 md:px-6 py-3 md:py-4 font-black uppercase tracking-widest text-xs md:text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md border-2 border-black"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            <span>Download Result Card</span>
          </>
        )}
      </button>

      {/* Hidden Card for Capture - Portrait layout for mobile */}
      <div
        ref={cardRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "0",
          width: "1080px",
          height: "2400px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Congratulations */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1
              style={{
                fontSize: "90px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "-0.05em",
                lineHeight: "0.9",
                marginBottom: "20px",
                color: uniColors[topUniversity],
              }}
            >
              CONGRATULATIONS!
            </h1>
          </div>

          {/* Welcome to */}
          <h2
            style={{
              fontSize: "38px",
              fontStyle: "italic",
              color: "#334155",
              textAlign: "center",
              marginBottom: "40px",
              lineHeight: "1.3",
            }}
          >
            {greeting}
          </h2>

          {/* University Picture */}
          <div
            style={{
              width: "100%",
              height: "500px",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={uniImages[topUniversity]}
              alt={universityName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* The Verdict */}
          <div style={{ marginBottom: "0px" }}>
            <h3
              style={{
                fontWeight: "900",
                fontSize: "42px",
                textTransform: "uppercase",
                borderBottom: "4px solid #000000",
                paddingBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span>The Verdict:</span>
              <span
                style={{
                  color: uniColors[topUniversity],
                }}
              >
                Match {topPercentage}%
              </span>
            </h3>
            <p
              style={{
                color: "#1e293b",
                lineHeight: "1.5",
                fontSize: "28px",
              }}
            >
              {verdict}
            </p>
          </div>

          {/* Other Universities (3 non-winners) */}
          <div style={{ marginBottom: "40px" }}>
            <h3
              style={{
                fontWeight: "900",
                fontSize: "42px",
                textTransform: "uppercase",
                marginBottom: "20px",
                borderBottom: "4px solid #000000",
                paddingBottom: "12px",
              }}
            >
              In Other News
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              {sortedScores.slice(1).map((item) => (
                <div
                  key={item.uni}
                  style={{
                    borderLeft: "4px solid #e2e8f0",
                    paddingLeft: "24px",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        fontSize: "60px",
                        fontWeight: "900",
                        display: "block",
                        marginBottom: "8px",
                        color: uniColors[item.uni as keyof typeof uniColors],
                      }}
                    >
                      {item.percentage}%
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        letterSpacing: "0.1em",
                        color: "#64748b",
                        display: "block",
                        marginBottom: "12px",
                      }}
                    >
                      {uniFullNames[item.uni as keyof typeof uniFullNames]}
                    </span>
                    <p
                      style={{
                        fontSize: "22px",
                        color: "#334155",
                        lineHeight: "1.4",
                      }}
                    >
                      {getFeedbackText(item.uni, item.percentage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "30px",
              borderTop: "2px solid #cbd5e1",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#475569",
                marginBottom: "12px",
              }}
            >
              unisort.vercel.app
            </div>
            <div
              style={{
                fontSize: "18px",
                fontFamily: "monospace",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              UniSort Intelligence • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Utility function for programmatic sharing
export async function handleShareResult(
  cardRef: React.RefObject<HTMLDivElement>,
  topUniversity: string,
  universityName: string
): Promise<boolean> {
  if (!cardRef.current) return false;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });

    const file = new File([blob], "unisort-result.png", {
      type: "image/png",
    });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "My UniSort Result",
        text: `I got matched with ${universityName}!`,
      });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `unisort-result-${topUniversity}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return true;
  } catch (error) {
    console.error("Error generating image:", error);
    return false;
  }
}
