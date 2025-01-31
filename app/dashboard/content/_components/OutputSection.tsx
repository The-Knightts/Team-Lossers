import React, { useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

// Type definition for the Toast UI editor instance
interface props{
   aiOutput:String
}

function OutputSection({aiOutput}:props) {
  // Typing the ref to be the editor instance
  const editorRef = React.useRef<Editor | null>(null);

  useEffect(()=>{
    const editorInstance=editorRef.current?.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])

  // Function to handle the copy button click
  const handleCopy = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard.writeText(markdown)
        .then(() => {
          alert('Content copied to clipboard!');
        })
        .catch((error) => {
          console.error('Error copying content:', error);
        });
    }
  };

  return (
    <div className="bg-white p-5 shadow-lg border">
      <div className="flex justify-between items-center p-5">
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button onClick={handleCopy}>
          <Copy className='w-4 h-4' /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here."
        initialEditType="wysiwyg"
        height="500px"
        useCommandShortcut={true}
        onChange={() => {
          // Log the markdown whenever it changes
          if (editorRef.current) {
            console.log(editorRef.current.getInstance().getMarkdown());
          }
        }}
      />
    </div>
  );
}

export default OutputSection;