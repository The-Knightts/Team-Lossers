import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { TextArea } from "@radix-ui/themes";

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const [content, setContent] = useState(aiOutput);

  useEffect(() => {
    setContent(aiOutput);
  }, [aiOutput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
      .then(() => alert('Content copied to clipboard!'))
      .catch((error) => console.error('Error copying content:', error));
  };

  return (
    <div className="bg-white p-5 shadow-lg border">
      <div className="flex justify-between items-center p-5">
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button onClick={handleCopy}>
          <Copy className='w-4 h-4' /> Copy
        </Button>
      </div>
      <TextArea
        className="w-full h-64 border p-3 rounded-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

export default OutputSection;
