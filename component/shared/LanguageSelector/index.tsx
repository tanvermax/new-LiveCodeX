"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMonaco } from "@monaco-editor/react";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useMemo, useState } from "react";

type Props = {
  runCode: () => void;
};

const LanguageSelector = ({ runCode }: Props) => {
  const monaco = useMonaco();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const allLanguages = useMemo(() => {
    const language = monaco?.languages?.getLanguages();
    return language ?? [];
  }, [monaco]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-[300px] border-blue-600 border-2 font-bold m-3">
            {selectedLanguage
              ? allLanguages.find((language: any) => language.id === selectedLanguage)?.id
              : "Select language..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." className="h-9" />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {allLanguages.map((language: any) => (
                  <CommandItem
                    key={language.id}
                    value={language.id}
                    onSelect={(currentValue) => {
                      setSelectedLanguage(currentValue === selectedLanguage ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {language.id}
                    <Check className={cn("ml-auto", selectedLanguage === language.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Run Code Button */}
      {/* <Button variant="primary" onClick={runCode} className="mt-3">
        Run Code
      </Button> */}
    </>
  );
};

export default LanguageSelector;
