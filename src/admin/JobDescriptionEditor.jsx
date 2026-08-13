import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const JobDescriptionEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] px-5 py-4 focus:outline-none text-[#0F172A] leading-relaxed",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">

        {/* Bold */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`rounded-lg px-3 py-2 font-bold ${
            editor.isActive("bold")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`rounded-lg px-3 py-2 italic ${
            editor.isActive("italic")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          I
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className={`rounded-lg px-3 py-2 line-through ${
            editor.isActive("strike")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          S
        </button>

        <div className="mx-1 h-6 w-px bg-slate-300" />

        {/* H1 */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
          className={`rounded-lg px-3 py-2 font-bold ${
            editor.isActive("heading", { level: 1 })
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          H1
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={`rounded-lg px-3 py-2 font-bold ${
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          H2
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={`rounded-lg px-3 py-2 font-bold ${
            editor.isActive("heading", { level: 3 })
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          H3
        </button>

        <div className="mx-1 h-6 w-px bg-slate-300" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`rounded-lg px-3 py-2 ${
            editor.isActive("bulletList")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          • List
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`rounded-lg px-3 py-2 ${
            editor.isActive("orderedList")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          1. List
        </button>

        <div className="mx-1 h-6 w-px bg-slate-300" />

        {/* Blockquote */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={`rounded-lg px-3 py-2 ${
            editor.isActive("blockquote")
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
        >
          Quote
        </button>

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .clearNodes()
              .unsetAllMarks()
              .run()
          }
          className="rounded-lg px-3 py-2 hover:bg-slate-100"
        >
          Clear
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default JobDescriptionEditor;