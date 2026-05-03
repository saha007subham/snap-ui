import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/utils/cn";

export function CopyButton({ text, className }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-2 rounded-md transition-colors hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer",
        className,
      )}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
