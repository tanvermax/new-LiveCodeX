'use client'
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import CodeEditor from '@/component/shared/CodeEditor';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import CodeEditor from '@/component/shared/CodeEditor'; // assuming you already have this component

const CodeViewer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(true);
//   const router = useRouter();

const params = useParams();
const codeId = params?.codeId as string;

  useEffect(() => {
    if (!codeId) return;

    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/get-code/${codeId}`);
        const data = await response.json();

        if (data.code) {
          setCode(data.code);
          setLanguage(data.language || 'javascript');
        } else {
          setCode('Code not found.');
        }
        setLoading(false);
      } catch (error) {
        setCode('Error fetching code.');
        setLoading(false);
      }
    };

    fetchCode();
  }, [codeId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center p-2">Shared Code</h1>
      {/* <CodeEditor language={language} value={code} onChange={(value) => setCode(value ?? "")} /> */}
      <CodeEditor 
       language={language}  
      value={code} 
      onChange={(newCode) => setCode(newCode)} />
    </div>
  );
};

export default CodeViewer;
