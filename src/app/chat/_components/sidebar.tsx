"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Home,
  LockKeyhole,
  LogOut,
  Minus,
  Moon,
  SquarePen,
  Sun,
  SunMoon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { ScrollArea } from "@/client/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { Button } from "@/client/components/ui/button";
import { Avatar, AvatarFallback } from "@/client/components/ui/avatar";
import { getEmailInitials } from "@/client/utils";
import { useTheme } from "next-themes";

type Props = {};

const userProjects = [
  {
    id: 1,
    name: "Test Project",
    created_at: new Date(),
    topics: [
      {
        id: 1,
        project_id: 1,
        collection_name: "asd23-123sd-4bdfj-234jg",
        display_name: "Test Topic",
        created_at: new Date(),
      },
    ],
  },
];

const Sidebar = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, setTheme } = useTheme();
  const controls = useAnimation();

  const toggleExpand = () => {
    if (isExpanded) {
      controls.start({
        width: "auto",
      });
    } else {
      controls.start({
        width: 0,
      });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="relative border-r-[1px] max-w-[270px]"
      animate={controls}
    >
      <Minus
        className="absolute top-[50%] right-[-24px] rotate-90 w-8 h-8 scale-125 text-muted-foreground z-10 hover:text-foreground transition-colors cursor-pointer"
        onClick={toggleExpand}
      />
      <div className="flex flex-col max-h-screen overflow-hidden whitespace-nowrap">
        <h1 className="text-2xl font-semibold flex gap-1 mx-2 my-4">
          Conversational
          <span className="bg-gradient-to-tr to-blue-300 from-30% from-violet-300 bg-clip-text text-transparent animate-move-bg">
            AI
          </span>
        </h1>
        <p className="text-xs text-muted-foreground m-2">Explore</p>
        <div className="flex flex-col gap-2 mb-4">
          <Button className="justify-between px-3 mx-2" variant={"outline"}>
            Back to dashboard
            <Home className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Select value="default">
            <SelectTrigger
              className="hover:bg-muted transition-colors mx-2 max-w-[calc(100%-1rem)]"
              icon={<SquarePen className="h-4 w-4 text-muted-foreground" />}
            >
              <SelectValue placeholder="Create new chat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default" className="hidden">
                Create new chat
              </SelectItem>
              {userProjects.map((project: any) => (
                <React.Fragment key={project.id}>
                  <SelectGroup>
                    <SelectLabel className="px-4">{project.name}</SelectLabel>
                    {project.topics.map((topic: any) => (
                      <SelectItem
                        value={`${project.id}-${topic.id}`}
                        key={topic.id}
                      >
                        {topic.display_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator className="last:hidden" />
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground m-2">History</p>
        <ScrollArea className="h-screen"></ScrollArea>
        <div className="flex p-2 justify-center border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex gap-2 relative py-11">
                <Avatar>
                  <AvatarFallback className="bg-primary dark:text-secondary font-semibold">
                    {getEmailInitials("kenneth.kho@gmail.com")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-start">
                  <p className="text-xs">Logged in as</p>
                  <p className="text-sm font-semibold">
                    {"kenneth.kho@gmail.com"}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Appearance: {theme}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="text-muted-foreground mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="text-muted-foreground mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <SunMoon className="text-muted-foreground mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="flex flex-row-reverse justify-end gap-2">
                Change password
                <DropdownMenuShortcut className="m-0">
                  <LockKeyhole size={"16px"} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-row-reverse justify-end gap-2 text-red-500 data-[highlighted]:text-red-700">
                Log out
                <DropdownMenuShortcut className="m-0">
                  <LogOut size={"16px"} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
