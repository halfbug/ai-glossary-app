import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

declare global {
  interface Window {
    mermaid: unknown;
  }
}

type MermaidDiagramProps = {
  diagram: string;
  title: string;
};

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram, title }) => {
  const [copied, setCopied] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const diagramId = `mermaid-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric char with dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    }-${Math.random().toString(36).substring(2, 8)}`; // Shorter random suffix

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(diagram);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    if (window.mermaid && !isRendered) {
      const element = document.getElementById(diagramId);
      if (element) {
        try {
          window.mermaid.render(diagramId, diagram) // Remove 'diagram-' prefix from ID
            .then(({ svg }) => {
              element.innerHTML = svg;
              setIsRendered(true);
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error('Mermaid rendering error:', error);
              element.innerHTML = `<div class="text-red-500 text-sm p-2">Diagram rendering failed</div>`;
            });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Mermaid error:', error);
        }
      }
    }
  }, [diagram, diagramId, isRendered]);

  return (
    <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-nexi-2 hover:border-nexi-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700 ">{title}</h4>
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1 text-xs rounded-md transition-all duration-300 flex items-center space-x-1 font-medium
            ${copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-100 text-blue-700 hover:bg-nexi-4 hover:text-white hover:-translate-y-0.5'
            }`}
        >
          <FileText className="h-3 w-3" />
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <div className="bg-white  rounded-lg border border-gray-200  min-h-[200px] p-4">
        <div id={diagramId} className="w-full text-center">
          <div className="text-gray-500 animate-pulse">Loading diagram...</div>
        </div>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
          View Mermaid Code
        </summary>
        <div className="mt-2 relative">
          <div className="text-sm font-mono text-gray-600 whitespace-pre-line bg-white p-3 rounded border overflow-x-auto max-h-32 overflow-y-auto">
            {diagram}
          </div>
        </div>
      </details>
      <p className="text-xs text-gray-500 mt-2">
        📋 Click "Copy Code" to copy Mermaid syntax • 🎨 Diagram renders automatically above
      </p>
    </div>
  );
};
