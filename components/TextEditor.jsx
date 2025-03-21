"use client";
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import EditorExtensions from './EditorExtensions';
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function TextEditor({fileId}) {
    const notes=useQuery(api.notes.GetNotes, {fileId:fileId})
    // console.log(notes)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
              placeholder: 'Start Creating New Notes...',
            }), 
            Document, 
            Paragraph, 
            Text, 
            TextAlign.configure({
                types: ['heading', 'paragraph'],
              }),
            TextStyle, 
            Color, 
            Highlight,
            Underline
        ],
        content: "",
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-[83vh] max-h-[83vh] overflow-y-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm',
            },
        },
    });
    
    
    useEffect(() => {
        if(!editor) return;
        if (!notes) return;
        editor.commands.setContent(notes[0]?.notes)
        console.log(notes)
    }, [notes, editor]);
    
    
    if (!editor) {
        return null;
    }
    
    
    return (
        <div className="flex flex-col space-y-2">
            {/* More compact toolbar with better button styling */}
            <div className="bg-gray-100 py-1.5 px-2 rounded-md border border-gray-300 shadow-sm">
                <EditorExtensions editor={editor} fileId={fileId} />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
export default TextEditor