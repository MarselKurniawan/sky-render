import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, Minus, Undo, Redo, Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Masukkan URL gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const btnClass = (active: boolean) =>
    `h-8 w-8 p-0 ${active ? "bg-electric/20 text-electric" : "text-muted-foreground hover:text-primary"}`;

  return (
    <div className="flex flex-wrap gap-1 border-b border-border p-2 bg-muted/30 rounded-t-lg">
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} type="button">
        <Heading1 size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} type="button">
        <Heading2 size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} type="button">
        <Heading3 size={16} />
      </Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} type="button">
        <Bold size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} type="button">
        <Italic size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()} type="button">
        <Code size={16} />
      </Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} type="button">
        <List size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} type="button">
        <ListOrdered size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} type="button">
        <Quote size={16} />
      </Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={addImage} type="button">
        <ImageIcon size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()} type="button">
        <Minus size={16} />
      </Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} type="button">
        <Undo size={16} />
      </Button>
      <Button variant="ghost" size="icon" className={btnClass(false)} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} type="button">
        <Redo size={16} />
      </Button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-2 [&_img]:rounded-lg [&_img]:max-w-full [&_blockquote]:border-l-4 [&_blockquote]:border-electric [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
      },
    },
  });

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
