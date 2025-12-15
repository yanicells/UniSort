"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImageLightboxProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={[{ src, alt: alt || "Post image" }]}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.92)" },
        slide: {
          padding: "20px",
        },
      }}
      carousel={{
        imageFit: "contain",
      }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
