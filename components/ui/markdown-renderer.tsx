import React from 'react';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
    const renderMarkdown = (text: string) => {
        // Split by lines and process each line
        const lines = text.split('\n');
        const elements: React.ReactElement[] = [];
        let currentList: string[] = [];
        let listKey = 0;

        const flushList = () => {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-1">
                        {currentList.map((item, index) => (
                            <li key={index} className="text-gray-700 leading-relaxed">
                                {renderInlineMarkdown(item)}
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
            }
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (!trimmedLine) {
                flushList();
                elements.push(<div key={`space-${index}`} className="mb-2" />);
                return;
            }

            // Handle headers
            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                flushList();
                const headerText = trimmedLine.slice(2, -2);
                elements.push(
                    <h3 key={index} className="text-xl font-bold text-gray-900 mb-3 mt-6 first:mt-0">
                        {headerText}
                    </h3>
                );
            }
            // Handle list items
            else if (trimmedLine.startsWith('- ')) {
                const listItem = trimmedLine.slice(2);
                currentList.push(listItem);
            }
            // Handle regular paragraphs
            else {
                flushList();
                elements.push(
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {renderInlineMarkdown(trimmedLine)}
                    </p>
                );
            }
        });

        // Flush any remaining list items
        flushList();

        return elements;
    };

    const renderInlineMarkdown = (text: string) => {
        // Handle bold text **text**
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={index} className="font-semibold text-gray-900">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    return (
        <div className={`prose prose-gray max-w-none ${className}`}>
            {renderMarkdown(content)}
        </div>
    );
}
