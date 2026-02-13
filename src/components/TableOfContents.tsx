import { useState, useEffect } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3");
    const tocItems: TocItem[] = [];

    headings.forEach((h, i) => {
      const id = `toc-${i}`;
      const text = h.textContent || "";
      const level = parseInt(h.tagName[1]);
      tocItems.push({ id, text, level });
    });

    setItems(tocItems);
  }, [content]);

  useEffect(() => {
    // Add IDs to actual headings in the DOM
    const article = document.querySelector("[data-article-content]");
    if (!article) return;
    const headings = article.querySelectorAll("h1, h2, h3");
    headings.forEach((h, i) => {
      h.id = `toc-${i}`;
    });
  }, [content, items]);

  if (items.length < 2) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left"
      >
        <List size={16} className="text-electric" />
        <span className="text-sm font-bold text-primary flex-1">Daftar Isi</span>
        {open ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      {open && (
        <nav className="mt-3 space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm text-muted-foreground hover:text-electric transition-colors ${
                item.level === 1 ? "font-semibold" : item.level === 2 ? "pl-4" : "pl-8 text-xs"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
