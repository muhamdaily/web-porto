"use client";

import clsx from "clsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

interface ImageProps extends NextImageProps {
  rounded?: string;
}

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, ...rest } = props;
  const [isLoading, setLoading] = useState(true);

  const isExternal = typeof src === "string" && /^https?:\/\//.test(src);

  // For external images we render a plain <img> so the browser loads it
  // directly (avoids Next.js image proxy issues with some hosts).
  if (isExternal) {
    return (
      <div
        className={clsx(
          "overflow-hidden",
          isLoading ? "animate-pulse" : "",
          rounded,
        )}
      >
        <img
          src={src as string}
          alt={alt}
          className={clsx(
            "duration-700 ease-in-out",
            isLoading
              ? "scale-[1.02] blur-xl grayscale"
              : "scale-100 blur-0 grayscale-0",
            rounded,
            className,
          )}
          loading="lazy"
          onLoad={() => setLoading(false)}
          {...(rest as any)}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "overflow-hidden",
        isLoading ? "animate-pulse" : "",
        rounded,
      )}
    >
      <NextImage
        className={clsx(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          rounded,
          className,
        )}
        src={src}
        alt={alt}
        loading="lazy"
        quality={100}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
};

export default Image;
