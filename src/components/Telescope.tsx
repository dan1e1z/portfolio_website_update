// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Directory, FileSystemItem } from "@/type";
// import { X, ChevronUp, ChevronDown } from "lucide-react";
// import Fuse from "fuse.js";
// import { useNavigate } from "react-router-dom";
//
// interface TelescopeProps {
//   isOpen: boolean;
//   onClose: () => void;
//   fileSystem: Directory;
//   setIsTerminalVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }
//
// export const Telescope: React.FC<TelescopeProps> = ({
//   isOpen,
//   onClose,
//   fileSystem,
//   setIsTerminalVisible,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState<FileSystemItem[]>([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const viewportRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   console.log("fileSystem", fileSystem);
//
//   const fuseOptions = useMemo(
//     () => ({
//       isCaseSensitive: false,
//       includeScore: true,
//       shouldSort: true,
//       findAllMatches: true,
//       minMatchCharLength: 1,
//       location: 0,
//       threshold: 0.4,
//       distance: 200,
//       useExtendedSearch: true,
//       keys: [
//         { name: "name", weight: 3 },
//         { name: "type", weight: 0.7 },
//         { name: "parent", weight: 1 },
//       ],
//     }),
//     [],
//   );
//
//   const flattenFileSystem = (system: Directory): FileSystemItem[] => {
//     const flatten = (
//       item: FileSystemItem,
//       parentName?: string,
//     ): FileSystemItem[] => {
//       if (item.type === "directory") {
//         return [
//           { ...item, parent: parentName },
//           ...(item.contents?.flatMap((child) => flatten(child, item.name)) ??
//             []),
//         ];
//       }
//       return [{ ...item, parent: parentName }];
//     };
//     return flatten(system);
//   };
//
//   const flattenedFileSystem = useMemo(
//     () => flattenFileSystem(fileSystem),
//     [fileSystem],
//   );
//
//   const fuse = useMemo(
//     () => new Fuse(flattenedFileSystem, fuseOptions),
//     [flattenedFileSystem, fuseOptions],
//   );
//
//   const getInitialItems = useCallback(() => {
//     const directories = flattenedFileSystem.filter(
//       (item) => item.type === "directory",
//     );
//     const files = flattenedFileSystem.filter((item) => item.type === "file");
//     return [...directories, ...files].slice(0, 10);
//   }, [flattenedFileSystem]);
//
//   useEffect(() => {
//     if (isOpen && !searchQuery) {
//       setResults(getInitialItems());
//     }
//   }, [isOpen, searchQuery, getInitialItems]);
//
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);
//
//   useEffect(() => {
//     if (searchQuery) {
//       const searchResults = fuse
//         .search(searchQuery)
//         .filter((result) => {
//           const itemName = result.item.name.toLowerCase();
//           const itemParent = String(result.item.parent || "").toLowerCase();
//           const searchChars = searchQuery.toLowerCase();
//
//           const checkSequence = (str: string) => {
//             let searchIdx = 0;
//             for (
//               let i = 0;
//               i < str.length && searchIdx < searchChars.length;
//               i++
//             ) {
//               if (str[i] === searchChars[searchIdx]) {
//                 searchIdx++;
//               }
//             }
//             return searchIdx === searchChars.length;
//           };
//
//           return checkSequence(itemName) || checkSequence(itemParent);
//         })
//         .sort((a, b) => {
//           const aExact = a.item.name
//             .toLowerCase()
//             .startsWith(searchQuery.toLowerCase());
//           const bExact = b.item.name
//             .toLowerCase()
//             .startsWith(searchQuery.toLowerCase());
//           if (aExact && !bExact) return -1;
//           if (!aExact && bExact) return 1;
//
//           if (a.item.type === "directory" && b.item.type !== "directory")
//             return -1;
//           if (a.item.type !== "directory" && b.item.type === "directory")
//             return 1;
//
//           return (a.score || 0) - (b.score || 0);
//         });
//
//       setResults(searchResults.map((result) => result.item).slice(0, 10));
//       setSelectedIndex(0);
//     } else {
//       setResults(getInitialItems());
//       setSelectedIndex(0);
//     }
//   }, [searchQuery, fuse, getInitialItems]);
//
//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent) => {
//       switch (e.key) {
//         case "ArrowUp":
//           e.preventDefault();
//           setSelectedIndex((prev) => Math.max(0, prev - 1));
//           break;
//         case "ArrowDown":
//           e.preventDefault();
//           setSelectedIndex((prev) => Math.min(results.length - 1, prev + 1));
//           break;
//         case "Escape":
//           onClose();
//           break;
//         case "Enter":
//           if (results[selectedIndex]) {
//             const found = results[selectedIndex];
//             if (found.type === "file" && "index" in found) {
//               console.log("found.parent", found.parent);
//               navigate(`/${found.parent}/?project=project${found.index}`);
//             } else if (found.type === "directory") {
//               navigate(`/${found.name}`);
//             }
//             setIsTerminalVisible(false);
//             onClose();
//           }
//           break;
//       }
//     },
//     [results, selectedIndex, onClose, navigate, setIsTerminalVisible],
//   );
//
//   if (!isOpen) return null;
//
//   return (
//     <div
//       className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
//       onClick={onClose}
//     >
//       <Card
//         className="w-[600px] max-h-[500px]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <CardHeader className="flex flex-row items-center">
//           <CardTitle className="flex-grow">Fuzzy Finder</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <Input
//               ref={inputRef}
//               type="text"
//               placeholder="Fuzzy find files and directories..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             <ScrollArea className="h-[300px]" viewportRef={viewportRef}>
//               {results.length > 0 ? (
//                 <ul className="space-y-2">
//                   {results.map((item, index) => (
//                     <li
//                       key={item.name}
//                       className={`p-2 cursor-pointer rounded-md flex justify-between items-center ${
//                         index === selectedIndex
//                           ? "bg-accent"
//                           : "hover:bg-accent/50"
//                       }`}
//                       onClick={() => {
//                         if (item.type === "file" && "index" in item) {
//                           navigate(
//                             `/${item.parent}/?project=project${item.index}`,
//                           );
//                         } else if (item.type === "directory") {
//                           navigate(`/${item.name}`);
//                         }
//                         setIsTerminalVisible(false);
//                         onClose();
//                       }}
//                     >
//                       <span>{item.name}</span>
//                       <span className="text-muted-foreground text-sm">
//                         {item.type}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="p-4 text-center text-muted-foreground">
//                   No results found
//                 </div>
//               )}
//             </ScrollArea>
//             <div className="text-sm text-muted-foreground flex justify-between">
//               <div>
//                 {results.length} result{results.length !== 1 && "s"}
//               </div>
//               <div className="flex items-center">
//                 <ChevronUp className="w-4 h-4 mr-2" />
//                 <ChevronDown className="w-4 h-4 mr-2" />
//                 <span>to navigate</span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// TEST1
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Directory, FileSystemItem } from "@/type";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import Fuse, { FuseResult } from "fuse.js";
import { useNavigate } from "react-router-dom";

const SEARCH_CONFIG = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  findAllMatches: true,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.4,
  distance: 200,
  useExtendedSearch: true,
  keys: [
    { name: "name", weight: 3 },
    { name: "type", weight: 0.7 },
    { name: "parent", weight: 1 },
  ],
};

const MAX_RESULTS = 10;

export const flattenFileSystem = (system: Directory): FileSystemItem[] => {
  const flatten = (
    item: FileSystemItem,
    parentName?: string,
  ): FileSystemItem[] => {
    if (item.type === "directory") {
      return [
        { ...item, parent: parentName },
        ...(item.contents?.flatMap((child) => flatten(child, item.name)) ?? []),
      ];
    }
    return [{ ...item, parent: parentName }];
  };
  return flatten(system);
};

export const checkSequentialMatch = (
  str: string,
  searchChars: string,
): boolean => {
  let searchIdx = 0;
  for (let i = 0; i < str.length && searchIdx < searchChars.length; i++) {
    if (str[i] === searchChars[searchIdx]) {
      searchIdx++;
    }
  }
  return searchIdx === searchChars.length;
};

export const sortSearchResults = (
  results: FuseResult<FileSystemItem>[],
  searchQuery: string,
) =>
  results
    .filter((result) => {
      const itemName = result.item.name.toLowerCase();
      const itemParent = String(result.item.parent || "").toLowerCase();
      const searchChars = searchQuery.toLowerCase();

      return (
        checkSequentialMatch(itemName, searchChars) ||
        checkSequentialMatch(itemParent, searchChars)
      );
    })
    .sort((a, b) => {
      const aExact = a.item.name
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase());
      const bExact = b.item.name
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase());

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      if (a.item.type === "directory" && b.item.type !== "directory") return -1;
      if (a.item.type !== "directory" && b.item.type === "directory") return 1;

      return (a.score || 0) - (b.score || 0);
    });

interface TelescopeProps {
  isOpen: boolean;
  onClose: () => void;
  fileSystem: Directory;
  setIsTerminalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Telescope: React.FC<TelescopeProps> = ({
  isOpen,
  onClose,
  fileSystem,
  setIsTerminalVisible,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<FileSystemItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const flattenedFileSystem = useMemo(
    () => flattenFileSystem(fileSystem),
    [fileSystem],
  );

  const fuse = useMemo(
    () => new Fuse(flattenedFileSystem, SEARCH_CONFIG),
    [flattenedFileSystem],
  );

  const getInitialItems = useCallback(() => {
    const directories = flattenedFileSystem.filter(
      (item) => item.type === "directory",
    );
    const files = flattenedFileSystem.filter((item) => item.type === "file");
    return [...directories, ...files].slice(0, MAX_RESULTS);
  }, [flattenedFileSystem]);

  useEffect(() => {
    if (isOpen && !searchQuery) {
      setResults(getInitialItems());
    }
  }, [isOpen, searchQuery, getInitialItems]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      const sortedResults = sortSearchResults(searchResults, searchQuery);

      setResults(
        sortedResults.map((result) => result.item).slice(0, MAX_RESULTS),
      );
      setSelectedIndex(0);
    } else {
      setResults(getInitialItems());
      setSelectedIndex(0);
    }
  }, [searchQuery, fuse, getInitialItems]);

  const handleNavigation = useCallback(
    (item: FileSystemItem) => {
      if (item.type === "file") {
        const timestamp = Date.now();
        // const queryParam = item.name.toLowerCase();
        navigate(
          `/${item.parent || ""}/?${item.parent}=${item.parent}1&timestamp=${timestamp}`,
        );
      } else if (item.type === "directory") {
        if (item.name === "home") {
          navigate(``);
        } else {
          navigate(`/${item.name}`);
        }
      }
      setIsTerminalVisible(false);
      onClose();
    },
    [navigate, setIsTerminalVisible, onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(results.length - 1, prev + 1));
          break;
        case "Escape":
          onClose();
          break;
        case "Enter":
          if (results[selectedIndex]) {
            handleNavigation(results[selectedIndex]);
          }
          break;
      }
    },
    [results, selectedIndex, onClose, handleNavigation],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Card
        className="w-[600px] max-h-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-grow">Fuzzy Finder</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Fuzzy find files and directories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <ScrollArea className="h-[300px]" viewportRef={viewportRef}>
              {results.length > 0 ? (
                <ul className="space-y-2">
                  {results.map((item, index) => (
                    <li
                      key={item.name}
                      className={`p-2 cursor-pointer rounded-md flex justify-between items-center ${
                        index === selectedIndex
                          ? "bg-accent"
                          : "hover:bg-accent/50"
                      }`}
                      onClick={() => handleNavigation(item)}
                    >
                      <span>{item.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {item.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No results found
                </div>
              )}
            </ScrollArea>
            <div className="text-sm text-muted-foreground flex justify-between">
              <div>
                {results.length} result{results.length !== 1 && "s"}
              </div>
              <div className="flex items-center">
                <ChevronUp className="w-4 h-4 mr-2" />
                <ChevronDown className="w-4 h-4 mr-2" />
                <span>to navigate</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
