
import { api } from '@/convex/_generated/api';
import { useAction, useMutation } from 'convex/react';
import { toast } from 'sonner';
import { 
  BoldIcon, Undo2, Redo2, ItalicIcon, UnderlineIcon, ListIcon, 
  Code2Icon, Heading3Icon, Heading1Icon, Heading2Icon, ListOrderedIcon,
  HighlighterIcon, AlignJustifyIcon, AlignRightIcon, AlignCenterIcon, 
  AlignLeftIcon, HelpingHandIcon, SaveAllIcon, Loader2
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import LoadingOverlay from './LoadingOverlay';
import axios from 'axios';

function EditorExtensions({editor, fileId}) {
  if (!editor) {
    return null;
  }
  const AddNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Combined loading state for the overlay
  const isLoading = isLoadingAI || isSaving;

  const onModelCall = async () => {
    // Get selected text before setting loading state
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );

    // Validate selection
    if (!selectedText || selectedText.trim() === '') {
      toast.error("Please select text to analyze");
      return;
    }

    setIsLoadingAI(true);
    setLoadingMessage('Generating AI response...');
    
    try {
      const response = await axios.get('/api/process-pdf', {
        params: {
          query: selectedText, 
          fileId: fileId
        }
      });
      const cleanHTML = response.data.body.results;      
      
      editor.commands.setContent(
        editor.getHTML() + `<p><strong>Answer:</strong> ${cleanHTML}</p>`
      );
      
      toast.success("AI response generated successfully");

    } catch (error) {
      console.error("AI Model Call Error:", error);
      toast.error("AI response generation failed. Please try again.");
    } finally {
      setIsLoadingAI(false);
      setLoadingMessage('');
    }
  };

  const onSaveData = async () => {
    setIsSaving(true);
    setLoadingMessage('Saving your notes...');
    
    try {
      await AddNotes({
        fileId: fileId,
        notes: editor.getHTML(),
        userId: user?.primaryEmailAddress?.emailAddress
      });
      
      toast.success("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save notes. Please try again.");
    } finally {
      setIsSaving(false);
      setLoadingMessage('');
    }
  };
  
  // Button classes
  const buttonClass = "flex items-center justify-center w-8 h-8 rounded hover:bg-blue-50 transition-colors border border-transparent hover:border-gray-200";
  const activeClass = "text-blue-600 bg-blue-50 border-gray-200";
  const disabledClass = "opacity-50 cursor-not-allowed";
  
  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
      
      <div className="flex flex-wrap gap-1.5">
        {/* History controls */}
        <div className="flex bg-white rounded p-0.5 shadow-sm">
          <button 
            onClick={() => editor.chain().focus().undo().run()} 
            disabled={!editor.can().undo() || isLoading}
            className={`${buttonClass} ${!editor.can().undo() || isLoading ? disabledClass : ""}`}>
            <Undo2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => editor.chain().focus().redo().run()} 
            disabled={!editor.can().redo() || isLoading}
            className={`${buttonClass} ${!editor.can().redo() || isLoading ? disabledClass : ""}`}>
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <Heading1Icon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <Heading2Icon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('heading', { level: 3 }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <Heading3Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Lists and code */}
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('bulletList') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <ListIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('orderedList') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <ListOrderedIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('codeBlock') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <Code2Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Text formatting */}
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('bold') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <BoldIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('italic') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <ItalicIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('underline') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <UnderlineIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive('highlight') ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <HighlighterIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <AlignLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <AlignCenterIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <AlignRightIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            disabled={isLoading}
            className={`${buttonClass} ${editor.isActive({ textAlign: 'justify' }) ? activeClass : ''} ${isLoading ? disabledClass : ''}`}>
            <AlignJustifyIcon className="w-5 h-5" />
          </button>
        </div>

        {/* AI Call and Save */}
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={onModelCall}
            disabled={isLoading}
            className={`${buttonClass} hover:text-blue-500 relative ${isLoading ? disabledClass : ''}`}>
            {isLoadingAI ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <HelpingHandIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onSaveData}
            disabled={isLoading}
            className={`${buttonClass} hover:text-blue-500 relative ${isLoading ? disabledClass : ''}`}>
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <SaveAllIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default EditorExtensions;