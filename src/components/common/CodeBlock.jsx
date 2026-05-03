import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from "./CopyButton";

export function CodeBlock({ code, language = "jsx", filename }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e] shadow-lg">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-slate-700">
        <div className="flex items-center gap-2">
          {/* Mac-style window controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          {filename && (
            <span className="ml-2 text-xs font-mono text-slate-300 select-none">
              {filename}
            </span>
          )}
        </div>
        <CopyButton text={code} className="hover:bg-slate-600/50" />
      </div>

      {/* Code Area */}
      <div className="text-[13px] sm:text-sm leading-relaxed max-h-[500px] overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            textAlign: 'right',
            userSelect: 'none'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
