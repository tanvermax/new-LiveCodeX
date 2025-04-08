// pages/share.tsx
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import languageOptions from "../app/compiler/page"; // Ensure this import points to a valid LanguageOptions object

type LanguageOptions = {
    [key: string]: { name: string };
};

const languageOptionsTyped: LanguageOptions = languageOptions as unknown as LanguageOptions;

const SharePage = () => {
    const router = useRouter();
    const { code, lang } = router.query; // Retrieve 'code' and 'lang' from the query parameters
    const [decodedCode, setDecodedCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        if (code && lang) {
            setDecodedCode(decodeURIComponent(code as string)); // Decode the code from URL
            setLanguage(lang as string); // Set the language
        }
    }, [code, lang]);

    if (!decodedCode) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }
                <><strong>Language:</strong><span className="text-green-400">{languageOptionsTyped[language]?.name || "Unknown"}</span></>
    return (
        <div className="px-10 py-20">
            <h1 className="text-2xl font-bold text-center p-4">Shared Code</h1>

            <div className="bg-gray-900 text-white p-3 rounded-md min-h-[100px] mt-3">
                <strong>Language:</strong> <span className="text-green-400">{languageOptionsTyped[language]?.name || "Unknown"}</span>
                <pre>{decodedCode}</pre>
            </div>
        </div>
    );
};

export default SharePage;
