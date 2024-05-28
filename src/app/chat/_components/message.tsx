"use client";

import React, { useCallback, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { Clipboard, Languages, Loader, RotateCcw, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/client/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { getEmailInitials } from "@/client/utils";
import { markdownComponents } from "./markdown-components";
// import TextToSpeechPlayer from "./text-to-speech-player";

interface Props {
  chat: any;
  topicId: number;
  userDetails: any;
  isLastMessage: boolean;
  isAsking: boolean;
}

type LanguageTab = {
  translatedText: string;
  language: string;
  audioSrc: string;
};

const supportedLanguages = [
  { language: "English", value: "English" },
  { language: "Chinese", value: "Chinese" },
  { language: "Spanish", value: "Spanish" },
  { language: "Standard Japanese", value: "Japanese" },
  { language: "Honorific Japanese", value: "Honorific Japanese" },
];

const Message = ({
  chat,
  topicId,
  userDetails,
  isLastMessage,
  isAsking,
}: Props) => {
  const defaultActiveLanguageTab = {
    translatedText: chat.answer,
    language: "English",
    audioSrc: "",
  };
  const [isTranslating, setIsTranslating] = useState(false);
  const [languageTabs, setLanguageTabs] = useState<LanguageTab[]>([
    defaultActiveLanguageTab,
  ]);
  const [activeLanguageTab, setActiveLanguageTab] = useState<LanguageTab>(
    defaultActiveLanguageTab
  );

  const translateText = useCallback(
    async (language: string, text: string) => {
      const existingLanguage = languageTabs.find(
        (tab) => tab.language === language
      );

      if (existingLanguage) {
        setActiveLanguageTab(existingLanguage);
      } else {
        setIsTranslating(true);
        // const response = await fetch(`/api/translate`, {
        //   method: "POST",
        //   headers: { Authorization: `Bearer ${token}` },
        //   body: JSON.stringify({
        //     language,
        //     text,
        //   }),
        // });
        setIsTranslating(false);
        // if (response.ok) {
        //   const results = await response.json();
        //   const newLanguageTab = {
        //     translatedText: results,
        //     language,
        //     audioSrc: "",
        //   };

        //   setLanguageTabs((prev) => [...prev, newLanguageTab]);
        //   setActiveLanguageTab(newLanguageTab);
        // }
      }
    },
    [languageTabs, activeLanguageTab, isTranslating]
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      activeLanguageTab ? activeLanguageTab.translatedText : chat.answer
    );
    toast("Copied!", {
      description: "Text has been copied to clipboard.",
    });
  };

  return (
    <div key={chat.id}>
      <div className="py-4 px-4 xl:px-40 lg:px-32 md:px-16">
        <div className="flex flex-row-reverse gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary dark:text-secondary font-semibold">
              {getEmailInitials(userDetails.email)}
            </AvatarFallback>
          </Avatar>
          <div className="bg-background dark:bg-muted shadow rounded-2xl px-4 ml-14">
            <p className="my-2">{chat.question}</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-4 xl:px-40 lg:px-32 md:px-16">
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-tr to-blue-200 from-30% from-violet-200 dark:text-secondary font-semibold">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="bg-gradient-to-bl to-blue-200/20 from-20% from-violet-200/40 shadow rounded-2xl px-4 mr-14">
            {/* <div className="font-semibold my-2">AI Chatbot</div> */}
            {chat.answer ? (
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
                className="break-words markdown"
              >
                {activeLanguageTab
                  ? activeLanguageTab.translatedText
                  : chat.answer}
              </Markdown>
            ) : (
              <div className="flex relative mt-3.5 gap-1">
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-blink duration-1000" />
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-blink duration-1000 delay-300" />
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-blink duration-1000 delay-600" />
              </div>
            )}
            {!isAsking && (
              <div className="flex gap-3 my-2 items-center">
                {/* {activeLanguageTab && (
                  <TextToSpeechPlayer
                    text={activeLanguageTab!.translatedText}
                    disabled={isTranslating}
                    languageTabs={languageTabs}
                    setLanguageTabs={setLanguageTabs}
                    activeLanguageTab={activeLanguageTab}
                    setActiveLanguageTab={setActiveLanguageTab}
                  />
                )} */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={isTranslating}>
                    {isTranslating ? (
                      <Loader className="w-4 h-4 opacity-30 animate-spin" />
                    ) : (
                      <Languages className="w-4 h-4 cursor-pointer opacity-30 hover:opacity-100 transition-opacity" />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {supportedLanguages.map((lang, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => translateText(lang.value, chat.answer)}
                      >
                        {lang.language}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Clipboard
                        className="w-4 h-4 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                        onClick={copyToClipboard}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Copy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isLastMessage && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <RotateCcw className="w-4 h-4 cursor-pointer opacity-30 hover:opacity-100 transition-opacity" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Regenerate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger onClick={() => console.log("toggle")}>
                      <Star className="w-4 h-4 cursor-pointer opacity-30 hover:opacity-100 transition-opacity" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Rate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
