"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import { codeToHtml } from "shiki";
import { useCopyToClipboard } from "usehooks-ts";
import {
  HiCheckCircle as CheckIcon,
  HiOutlineClipboardCopy as CopyIcon,
} from "react-icons/hi";

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock = ({
  className = "",
  children,
  inline,
  ...props
}: CodeProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [value, copy] = useCopyToClipboard();
  const match = /language-(\w+)/.exec(className || "");

  const contentStr = String(children ?? "").replace(/\n$/, "");
  const shouldRenderAsInlineFallback =
    !inline && !match && !/\n/.test(contentStr) && contentStr.length < 120;

  const language = useMemo(() => {
    if (match) return match[1];
    return "javascript";
  }, [match]);

  useEffect(() => {
    if (!inline && !shouldRenderAsInlineFallback) {
      const highlightCode = async () => {
        try {
          const html = await codeToHtml(contentStr, {
            lang: language as any,
            theme: "poimandres",
          });
          setHighlightedCode(html);
        } catch (error) {
          console.error("Syntax highlighting error:", error);
          // Fallback: render plain code
          setHighlightedCode(
            `<pre style="background: #222222; padding: 18px; border-radius: 10px; overflow-x: auto;"><code>${contentStr}</code></pre>`
          );
        }
      };

      highlightCode();
    }
  }, [contentStr, language, inline, shouldRenderAsInlineFallback]);

  const handleCopy = (code: string) => {
    copy(code);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <>
      {!inline && !shouldRenderAsInlineFallback ? (
        <div className="relative">
          <button
            className="absolute right-3 top-3 rounded-lg border border-neutral-700 p-2 hover:bg-neutral-800 z-10"
            type="button"
            aria-label="Copy to Clipboard"
            onClick={() => handleCopy(contentStr)}
            data-umami-event="Click Copy Code"
          >
            {!isCopied ? (
              <CopyIcon size={18} className="text-neutral-400" />
            ) : (
              <CheckIcon size={18} className="text-green-600" />
            )}
          </button>

          <div
            className="shiki-code-block w-full max-w-full overflow-x-auto [&_pre]:!bg-[#0b1220] [&_pre]:rounded-[10px] [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:p-3 sm:[&_pre]:p-[18px] [&_pre]:pr-14 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-500"
            dangerouslySetInnerHTML={{ __html: highlightedCode || "" }}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#525252 transparent",
            }}
          />
        </div>
      ) : (
        <code className="rounded-md bg-neutral-200 px-2 py-1 text-[14px] font-light text-sky-600 dark:bg-neutral-700 dark:text-sky-300">
          {children}
        </code>
      )}
    </>
  );
};

const LoadingPlaceholder = () => <div className="mb-12 mt-12 h-36 w-full" />;

export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
  loading: LoadingPlaceholder,
});
