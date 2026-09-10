"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  iconClassName?: string;
  label?: string;
}

export default function CopyButton({ text, className = "", iconClassName = "", label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers or if clipboard API fails
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy text: ', fallbackErr);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group relative flex items-center justify-center transition-all duration-300 ${className}`}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
    >
      <div className={`relative flex items-center justify-center transition-transform duration-300 ${copied ? 'scale-110' : 'hover:scale-110'} ${iconClassName}`}>
        {copied ? (
          <Check className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-300" />
        ) : (
          <Copy className="w-full h-full text-gray-400 group-hover:text-white transition-colors duration-300" />
        )}
      </div>
      {label && (
        <span className={`ml-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors duration-300 ${copied ? 'text-emerald-400' : 'text-gray-400 group-hover:text-white'}`}>
          {copied ? 'COPIED' : label}
        </span>
      )}
    </button>
  );
}
