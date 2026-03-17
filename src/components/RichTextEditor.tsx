import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, Minus, Undo, Redo, Code, Link2, Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MediaPickerModal from "@/components/MediaPickerModal";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return "";
  if (/^(https?:|mailto:|tel:|\/)/i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
};

const MenuBar = ({ editor, onImageClick, onLinkClick, onHtmlClick }: {
  editor: any;
  onImageClick: () => void;
  onLinkClick: () => void;
  onHtmlClick: () => void;
}) => {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `h-8 w-8 p-0 ${active ? "bg-electric/20 text-electric" : "text-muted-foreground hover:text-primary"}`;

  return (
    <div className="flex flex-wrap gap-1 border-b border-border p-2 bg-muted/30 rounded-t-lg">
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} type="button"><Heading1 size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} type="button"><Heading2 size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} type="button"><Heading3 size={16} /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} type="button"><Bold size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} type="button"><Italic size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()} type="button"><Code size={16} /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={onLinkClick} type="button" title="Insert Link"><Link2 size={16} /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} type="button"><List size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} type="button"><ListOrdered size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} type="button"><Quote size={16} /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={onImageClick} type="button"><ImageIcon size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()} type="button"><Minus size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={onHtmlClick} type="button" title="Inject HTML"><Code2 size={16} /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} type="button"><Undo size={16} /></Button>
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} type="button"><Redo size={16} /></Button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [mediaPicker, setMediaPicker] = useState(false);
  const [linkDialog, setLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [htmlDialog, setHtmlDialog] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-2 [&_img]:rounded-lg [&_img]:max-w-full [&_blockquote]:border-l-4 [&_blockquote]:border-electric [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-electric [&_a]:underline",
      },
    },
  });

  const handleLinkOpen = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ").trim();

    setLinkText(selectedText);
    setLinkUrl("");
    setLinkDialog(true);
  };

  const handleLinkSave = () => {
    if (!editor) return;

    const safeUrl = normalizeUrl(linkUrl);
    const safeText = escapeHtml(linkText.trim() || safeUrl);

    if (!safeUrl) return;

    editor
      .chain()
      .focus()
      .insertContent(`<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${safeText}</a>`)
      .run();

    setLinkDialog(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleHtmlInject = () => {
    if (!editor || !htmlCode.trim()) return;
    editor.chain().focus().insertContent(htmlCode).run();
    setHtmlDialog(false);
    setHtmlCode("");
  };

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background">
      <MenuBar
        editor={editor}
        onImageClick={() => setMediaPicker(true)}
        onLinkClick={handleLinkOpen}
        onHtmlClick={() => setHtmlDialog(true)}
      />
      <EditorContent editor={editor} />

      <MediaPickerModal
        open={mediaPicker}
        onOpenChange={setMediaPicker}
        onSelect={(url) => {
          if (editor) editor.chain().focus().setImage({ src: url }).run();
        }}
      />

      <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader><DialogTitle>Sisipkan Link</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Teks Link</Label>
              <Input
                value={linkText}
                onChange={e => setLinkText(e.target.value)}
                placeholder="Teks yang akan diklik"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={e => e.key === "Enter" && handleLinkSave()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setLinkDialog(false)} type="button">Batal</Button>
              <Button onClick={handleLinkSave} className="bg-electric hover:bg-electric/90" type="button">Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={htmlDialog} onOpenChange={setHtmlDialog}>
        <DialogContent className="max-w-lg w-[95vw]">
          <DialogHeader><DialogTitle>Inject HTML</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>HTML Code</Label>
              <Textarea
                value={htmlCode}
                onChange={e => setHtmlCode(e.target.value)}
                rows={8}
                placeholder="<marquee>Promo berjalan</marquee>"
                className="font-mono text-xs"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setHtmlDialog(false)} type="button">Batal</Button>
              <Button onClick={handleHtmlInject} className="bg-electric hover:bg-electric/90" type="button">Inject</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
