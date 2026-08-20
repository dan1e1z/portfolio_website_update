// import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { fileSystem } from "@/data/filesystem";
// import { Directory, FileSystemItem } from "@/type";
// import { Telescope } from "@/components/Telescope";
// import { Badge } from "@/components/ui/badge";
// import {
//   FolderOpen,
//   Search,
//   SquareSplitHorizontal,
//   Navigation,
//   HelpCircle,
//   ArrowRightToLine,
// } from "lucide-react";
//
// interface TerminalWindowProps {
//   setIsTerminalVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
//   setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
// }
//
// const TerminalWindow: React.FC<TerminalWindowProps> = ({
//   setIsTerminalVisible,
//   setIsSplit,
//   setSplitDirectory,
// }) => {
//   const [cmd, setCmd] = useState<string>("");
//   const [currentDirectory, setCurrentDirectory] =
//     useState<Directory>(fileSystem);
//   const [directoryStack, setDirectoryStack] = useState<Directory[]>([]);
//   const [message, setMessage] = useState<string | null>(null);
//   const [messageType, setMessageType] = useState<string | null>(null);
//   const [isTelescope, setIsTelescope] = useState(false);
//   const [autocompleteSuggestion, setAutocompleteSuggestion] = useState<{
//     suggestion: string;
//     fullText: string;
//   }>({ suggestion: "", fullText: "" });
//   const inputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
//
//   const predefinedCommands = ["cd", "fzf", "split", "go", "help"];
//
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);
//
//   useEffect(() => {
//     updateAutocompleteSuggestion();
//   }, [cmd]);
//
//   const updateAutocompleteSuggestion = () => {
//     const [currentCmd, ...args] = cmd.split(" ");
//     let suggestion = "";
//     let fullText = "";
//
//     if (args.length === 0) {
//       const matchingCommand = predefinedCommands.find((command) =>
//         command.toLowerCase().startsWith(currentCmd.toLowerCase()),
//       );
//       if (matchingCommand) {
//         suggestion = matchingCommand.slice(currentCmd.length);
//         fullText = matchingCommand;
//       }
//     } else if (args.length === 2) {
//       setAutocompleteSuggestion({ suggestion: "", fullText: "" });
//     } else if (["cd", "split", "go"].includes(currentCmd.toLowerCase())) {
//       const lastArg = args[args.length - 1];
//       const matchingItems = currentDirectory.contents.filter(
//         (item) =>
//           item.name.toLowerCase().startsWith(lastArg.toLowerCase()) &&
//           (currentCmd.toLowerCase() === "go" || item.type === "directory"),
//       );
//
//       if (matchingItems.length > 0) {
//         const matchedItem = matchingItems[0];
//         suggestion = matchedItem.name.slice(lastArg.length);
//         fullText = matchedItem.name;
//       }
//     }
//
//     setAutocompleteSuggestion({ suggestion, fullText });
//   };
//
//   const handleAutocomplete = () => {
//     if (autocompleteSuggestion.suggestion) {
//       const [currentCmd, ...args] = cmd.split(" ");
//       if (args.length === 0) {
//         setCmd(autocompleteSuggestion.fullText);
//       } else {
//         const newArgs = [...args.slice(0, -1), autocompleteSuggestion.fullText];
//         setCmd(`${currentCmd} ${newArgs.join(" ")}`);
//       }
//       setAutocompleteSuggestion({ suggestion: "", fullText: "" });
//     }
//   };
//
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (
//       e.key === "Tab" ||
//       (e.key === "ArrowRight" && autocompleteSuggestion.suggestion)
//     ) {
//       e.preventDefault();
//       handleAutocomplete();
//     }
//   };
//
//   const handleSplitCommand = (dirName: string) => {
//     console.log(`split screen: ${dirName}`);
//     setIsSplit(true);
//     setSplitDirectory(dirName);
//     setIsTerminalVisible(false);
//   };
//
//   const submitCommand = (e: React.FormEvent) => {
//     e.preventDefault();
//     const input = cmd.trim();
//
//     if (input.startsWith("cd ")) {
//       const dirName = input.slice(3).trim();
//       handleCdCommand(dirName);
//     } else if (input === "fzf") {
//       setIsTelescope(true);
//     } else if (input.startsWith("split ")) {
//       handleSplitCommand(input.slice(6).trim());
//     } else if (input.startsWith("go ")) {
//       handleGoCommand(input.slice(3).trim());
//     } else if (input.startsWith("help")) {
//       handleHelpCommand(input.slice(4).trim());
//     } else if (input) {
//       displayMessage(`bash: command not found: ${input}`, "error");
//     }
//     setCmd("");
//   };
//
//   function findFileWithIndex(targetName: string) {
//     const index = currentDirectory.contents.findIndex(
//       (item: FileSystemItem) =>
//         item.name.toLowerCase() === targetName.toLowerCase(),
//     );
//     return index !== -1
//       ? { index: index + 1, file: currentDirectory.contents[index] }
//       : null;
//   }
//
//   const handleGoCommand = (dirName: string) => {
//     const fileFound = findFileWithIndex(dirName);
//
//     if (fileFound?.file.type === "file") {
//       navigate(`/projects/?project=project${fileFound.index}`);
//       setIsTerminalVisible(false);
//     } else if (fileFound?.file.type === "directory") {
//       navigate(`/${dirName}`);
//       setIsTerminalVisible(false);
//     } else {
//       displayMessage(`Error: ${dirName} not found`, "error");
//     }
//   };
//
//   const handleCdCommand = (dirName: string) => {
//     if (dirName === "..") {
//       if (directoryStack.length > 0) {
//         const parentDirectory = directoryStack[directoryStack.length - 1];
//         setDirectoryStack(directoryStack.slice(0, -1));
//         setCurrentDirectory(parentDirectory);
//       } else {
//         displayMessage(`bash: cd: ..: Already at root directory`, "error");
//       }
//     } else {
//       const targetDir = findDirectoryInCurrentDirectory(
//         currentDirectory,
//         dirName,
//       );
//       if (targetDir) {
//         setDirectoryStack([...directoryStack, currentDirectory]);
//         setCurrentDirectory(targetDir);
//       } else {
//         displayMessage(`bash: cd: ${dirName}: No such directory`, "error");
//       }
//     }
//   };
//
//   const handleHelpCommand = (command?: string) => {
//     const helpMessages: { [key: string]: string } = {
//       cd: `Use "cd" to navigate directories:
//      - Example: "cd about" to move into the "about" directory.
//      - Example: "cd .." to move back to the previous directory.`,
//       fzf: `Use "fzf" to open Telescope-like fuzzy finder:
//      - Searches across entire file system
//      - Use arrow keys to navigate
//      - Press Enter to select
//      - Press Escape to close`,
//       split: `Use "split" to open a directory in a split view:
//      - Example: "split about" to display the "about" section in a separate view.`,
//       go: `Use "go" to navigate directly to a specific section:
//      - Example: "go about" to jump to the "about" section.`,
//       "": `Available commands:
//      - cd: Change directory
//      - fzf: Fuzzy search (Telescope-style)
//      - split: Open split view
//      - go: Navigate to section
//      Type "help [command]" for more details.`,
//     };
//
//     const message =
//       helpMessages[command || ""] ||
//       `No help found for command: ${command}. Type "help" for available commands.`;
//     displayMessage(message, "success");
//   };
//
//   const displayMessage = (message: string, type: string) => {
//     setMessageType(type);
//     setMessage(message);
//     setTimeout(() => setMessage(null), 5000);
//   };
//
//   const findDirectoryInCurrentDirectory = (
//     dir: Directory,
//     name: string,
//   ): Directory | undefined => {
//     const foundDir = dir.contents.find(
//       (item) =>
//         item.type === "directory" &&
//         item.name.toLowerCase() === name.toLowerCase(),
//     ) as Directory | undefined;
//
//     return foundDir;
//   };
//
//   const renderDirectoryContents = (): JSX.Element[] => {
//     return currentDirectory.contents.map((item, index) => {
//       if (item.type === "directory") {
//         return (
//           <ul key={index} className="directory-item flex items-center gap-2">
//             {item.icon && <item.icon />} {item.name}
//           </ul>
//         );
//       } else {
//         return (
//           <ul key={index} className="file-item flex items-center gap-2">
//             {item.icon && <item.icon />} {item.name}
//           </ul>
//         );
//       }
//     });
//   };
//
//   return (
//     <div>
//       <Telescope
//         isOpen={isTelescope}
//         onClose={() => setIsTelescope(false)}
//         fileSystem={fileSystem}
//         setIsTerminalVisible={setIsTerminalVisible}
//       />
//       <Card className="w-[650px] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col">
//         <CardHeader className="flex flex-row items-center gap-4">
//           <CardTitle>Terminal</CardTitle>
//           <CardDescription className="flex-grow">
//             Navigate Through Portfolio
//           </CardDescription>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsTerminalVisible(false)}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>
//         <CardContent className="flex-grow overflow-y-auto">
//           <div className="output">
//             <div className="font-bold mb-2">Directory Contents:</div>
//             <ul className="flex gap-4">
//               {renderDirectoryContents().map((line, index) => (
//                 <li key={index}>{line}</li>
//               ))}
//             </ul>
//           </div>
//           <form
//             onSubmit={submitCommand}
//             className="relative mt-4 flex items-center"
//           >
//             <span>ask@daniel:~$</span>
//             <div className="relative flex-grow ml-2">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   value={cmd}
//                   onChange={(e) => setCmd(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-0 border-0 relative z-10"
//                   placeholder="Type a command"
//                   autoFocus
//                   ref={inputRef}
//                 />
//                 {/* Autocomplete preview */}
//                 <span className="absolute top-0 left-0 text-gray-400 pointer-events-none whitespace-pre overflow-hidden">
//                   {cmd}
//                   {cmd && (
//                     <span className="text-gray-500">
//                       {autocompleteSuggestion.suggestion}
//                     </span>
//                   )}
//                 </span>
//               </div>
//             </div>
//           </form>
//           {message && (
//             <div
//               className={`${
//                 messageType === "error" ? "text-red-500" : "text-green-500"
//               } mt-2 whitespace-pre-wrap`}
//             >
//               {message}
//             </div>
//           )}
//         </CardContent>
//         <ImprovedCardFooter />
//       </Card>
//     </div>
//   );
// };
//
// function ImprovedCardFooter() {
//   return (
//     <CardFooter className="flex-shrink-0 border-t pt-2">
//       <div className="w-full grid grid-cols-3 gap-2 text-xs">
//         <CommandItem
//           icon={<ArrowRightToLine className="h-3 w-3" />}
//           command="tab"
//           description="Autocomplete"
//         />
//         <CommandItem
//           icon={<FolderOpen className="h-3 w-3" />}
//           command="cd"
//           description="Change directory"
//         />
//         <CommandItem
//           icon={<Search className="h-3 w-3" />}
//           command="fzf"
//           description="Fuzzy search"
//         />
//         <CommandItem
//           icon={<SquareSplitHorizontal className="h-3 w-3" />}
//           command="split"
//           description="Split screen"
//         />
//         <CommandItem
//           icon={<Navigation className="h-3 w-3" />}
//           command="go"
//           description="Go to section"
//         />
//         <CommandItem
//           icon={<HelpCircle className="h-3 w-3" />}
//           command="help"
//           description="Help"
//         />
//       </div>
//     </CardFooter>
//   );
// }
//
// function CommandItem({
//   icon,
//   command,
//   description,
// }: {
//   icon: React.ReactNode;
//   command: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-center gap-1">
//       {icon}
//       <Badge variant="outline" className="font-mono text-[10px] px-1">
//         {command}
//       </Badge>
//       <span className="text-[10px] text-muted-foreground">{description}</span>
//     </div>
//   );
// }
//
// export default TerminalWindow;

// TEST1

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fileSystem } from "@/data/filesystem";
import { Directory, FileSystemItem } from "@/type";
import { Telescope } from "@/components/Telescope";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  Search,
  SquareSplitHorizontal,
  Navigation,
  HelpCircle,
  ArrowRightToLine,
} from "lucide-react";

interface TerminalWindowProps {
  setIsTerminalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
  setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  setIsTerminalVisible,
  setIsSplit,
  setSplitDirectory,
}) => {
  const [cmd, setCmd] = useState<string>("");
  const [currentDirectory, setCurrentDirectory] = useState<Directory>(
    () => fileSystem,
  );
  const [directoryStack, setDirectoryStack] = useState<Directory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [isTelescope, setIsTelescope] = useState(false);
  const [autocompleteSuggestion, setAutocompleteSuggestion] = useState<{
    suggestion: string;
    fullText: string;
  }>({ suggestion: "", fullText: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const predefinedCommands = ["cd", "fzf", "split", "go", "help"];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    updateAutocompleteSuggestion();
  }, [cmd, currentDirectory]);

  const updateAutocompleteSuggestion = () => {
    const [currentCmd, ...args] = cmd.split(" ");
    let suggestion = "";
    let fullText = "";

    if (args.length === 0) {
      const matchingCommand = predefinedCommands.find((command) =>
        command.toLowerCase().startsWith(currentCmd.toLowerCase()),
      );
      if (matchingCommand) {
        suggestion = matchingCommand.slice(currentCmd.length);
        fullText = matchingCommand;
      }
    } else if (args.length === 2) {
      setAutocompleteSuggestion({ suggestion: "", fullText: "" });
    } else if (["cd", "split", "go"].includes(currentCmd.toLowerCase())) {
      const lastArg = args[args.length - 1];
      const matchingItems =
        currentDirectory.contents?.filter(
          (item) =>
            item.name.toLowerCase().startsWith(lastArg.toLowerCase()) &&
            (currentCmd.toLowerCase() === "go" || item.type === "directory"),
        ) || [];

      if (matchingItems.length > 0) {
        const matchedItem = matchingItems[0];
        suggestion = matchedItem.name.slice(lastArg.length);
        fullText = matchedItem.name;
      }
    }

    setAutocompleteSuggestion({ suggestion, fullText });
  };

  const handleAutocomplete = () => {
    if (autocompleteSuggestion.suggestion) {
      const [currentCmd, ...args] = cmd.split(" ");
      if (args.length === 0) {
        setCmd(autocompleteSuggestion.fullText);
      } else {
        const newArgs = [...args.slice(0, -1), autocompleteSuggestion.fullText];
        setCmd(`${currentCmd} ${newArgs.join(" ")}`);
      }
      setAutocompleteSuggestion({ suggestion: "", fullText: "" });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Tab" ||
      (e.key === "ArrowRight" && autocompleteSuggestion.suggestion)
    ) {
      e.preventDefault();
      handleAutocomplete();
    }
  };

  const handleSplitCommand = (dirName: string) => {
    // console.log(`split screen: ${dirName}`);
    setIsSplit(true);
    setSplitDirectory(dirName);
    setIsTerminalVisible(false);
  };

  const submitCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const input = cmd.trim();

    if (input.startsWith("cd ")) {
      const dirName = input.slice(3).trim();
      handleCdCommand(dirName);
    } else if (input === "fzf") {
      setIsTelescope(true);
    } else if (input.startsWith("split ")) {
      handleSplitCommand(input.slice(6).trim());
    } else if (input.startsWith("go ")) {
      handleGoCommand(input.slice(3).trim());
    } else if (input.startsWith("help")) {
      handleHelpCommand(input.slice(4).trim());
    } else if (input) {
      displayMessage(`bash: command not found: ${input}`, "error");
    }
    setCmd("");
  };

  function findFileWithIndex(targetName: string) {
    const index = currentDirectory.contents?.findIndex(
      (item: FileSystemItem) =>
        item.name.toLowerCase() === targetName.toLowerCase(),
    );
    return index !== undefined && index !== -1
      ? { index: index + 1, file: currentDirectory.contents?.[index] }
      : null;
  }

  const handleGoCommand = (dirName: string) => {
    const fileFound = findFileWithIndex(dirName);
    console.log("currentDirectory", currentDirectory);

    if (fileFound?.file?.type === "file") {
      console.log();
      navigate(
        `/${currentDirectory.name}/?${currentDirectory.name}=${currentDirectory.name}${fileFound.index}&timestamp=${Date.now()}`,
      );
      setIsTerminalVisible(false);
    } else if (fileFound?.file?.type === "directory") {
      navigate(`/${dirName}`);
      setIsTerminalVisible(false);
    } else {
      displayMessage(`Error: ${dirName} not found`, "error");
    }
  };

  const handleCdCommand = (dirName: string) => {
    if (dirName === "..") {
      if (directoryStack.length > 0) {
        const parentDirectory = directoryStack[directoryStack.length - 1];
        setDirectoryStack(directoryStack.slice(0, -1));
        setCurrentDirectory(parentDirectory);
      } else {
        displayMessage(`bash: cd: ..: Already at root directory`, "error");
      }
    } else {
      const targetDir = findDirectoryInCurrentDirectory(
        currentDirectory,
        dirName,
      );
      if (targetDir) {
        setDirectoryStack([...directoryStack, currentDirectory]);
        setCurrentDirectory(targetDir);
      } else {
        displayMessage(`bash: cd: ${dirName}: No such directory`, "error");
      }
    }
  };

  const handleHelpCommand = (command?: string) => {
    const helpMessages: { [key: string]: string } = {
      cd: `Use "cd" to navigate directories:
     - Example: "cd about" to move into the "about" directory.
     - Example: "cd .." to move back to the previous directory.`,
      fzf: `Use "fzf" to open Telescope-like fuzzy finder:
     - Searches across entire file system
     - Use arrow keys to navigate
     - Press Enter to select
     - Press Escape to close`,
      split: `Use "split" to open a directory in a split view:
     - Example: "split about" to display the "about" section in a separate view.`,
      go: `Use "go" to navigate directly to a specific section:
     - Example: "go about" to jump to the "about" section.`,
      "": `Available commands:
     - cd: Change directory
     - fzf: Fuzzy search (Telescope-style)
     - split: Open split view
     - go: Navigate to section
     Type "help [command]" for more details.`,
    };

    const message =
      helpMessages[command || ""] ||
      `No help found for command: ${command}. Type "help" for available commands.`;
    displayMessage(message, "success");
  };

  const displayMessage = (message: string, type: string) => {
    setMessageType(type);
    setMessage(message);
    setTimeout(() => setMessage(null), 10000);
  };

  const findDirectoryInCurrentDirectory = (
    dir: Directory,
    name: string,
  ): Directory | undefined => {
    return dir.contents?.find(
      (item) =>
        item.type === "directory" &&
        item.name.toLowerCase() === name.toLowerCase(),
    ) as Directory | undefined;
  };

  const renderDirectoryContents = (): JSX.Element[] => {
    return (
      currentDirectory.contents?.map((item, index) => {
        if (item.type === "directory") {
          return (
            <ul key={index} className="directory-item flex items-center gap-2">
              {item.icon && <item.icon />} {item.name}
            </ul>
          );
        } else {
          return (
            <ul key={index} className="file-item flex items-center gap-2">
              {item.icon && <item.icon />} {item.name}
            </ul>
          );
        }
      }) || []
    );
  };

  return (
    <div>
      <Telescope
        isOpen={isTelescope}
        onClose={() => setIsTelescope(false)}
        fileSystem={fileSystem}
        setIsTerminalVisible={setIsTerminalVisible}
      />
      <Card className="w-[650px] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
          <CardTitle>Terminal</CardTitle>
          <CardDescription className="flex-grow">
            Navigate Through Portfolio
          </CardDescription>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTerminalVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="output">
            <div className="font-bold mb-2">Directory Contents:</div>
            <ul className="flex gap-4">
              {renderDirectoryContents().map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={submitCommand}
            className="relative mt-4 flex items-center"
          >
            <span>ask@daniel:~$</span>
            <div className="relative flex-grow ml-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={cmd}
                  onChange={(e) => setCmd(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-0 border-0 relative z-10"
                  placeholder="Type a command"
                  autoFocus
                  ref={inputRef}
                />
                <span className="absolute top-0 left-0 text-gray-400 pointer-events-none whitespace-pre overflow-hidden">
                  {cmd}
                  {cmd && (
                    <span className="text-gray-500">
                      {autocompleteSuggestion.suggestion}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </form>
          {message && (
            <div
              className={`${
                messageType === "error" ? "text-red-500" : "text-green-500"
              } mt-2 whitespace-pre-wrap`}
            >
              {message}
            </div>
          )}
        </CardContent>
        <ImprovedCardFooter />
      </Card>
    </div>
  );
};

function ImprovedCardFooter() {
  return (
    <CardFooter className="flex-shrink-0 border-t pt-2">
      <div className="w-full grid grid-cols-3 gap-2 text-xs">
        <CommandItem
          icon={<ArrowRightToLine className="h-3 w-3" />}
          command="tab"
          description="Autocomplete"
        />
        <CommandItem
          icon={<FolderOpen className="h-3 w-3" />}
          command="cd"
          description="Change directory"
        />
        <CommandItem
          icon={<Search className="h-3 w-3" />}
          command="fzf"
          description="Fuzzy search"
        />
        <CommandItem
          icon={<SquareSplitHorizontal className="h-3 w-3" />}
          command="split"
          description="Split screen"
        />
        <CommandItem
          icon={<Navigation className="h-3 w-3" />}
          command="go"
          description="Go to section"
        />
        <CommandItem
          icon={<HelpCircle className="h-3 w-3" />}
          command="help"
          description="Help"
        />
      </div>
    </CardFooter>
  );
}

function CommandItem({
  icon,
  command,
  description,
}: {
  icon: React.ReactNode;
  command: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <Badge variant="outline" className="font-mono text-[10px] px-1">
        {command}
      </Badge>
      <span className="text-[10px] text-muted-foreground">{description}</span>
    </div>
  );
}

export default TerminalWindow;
