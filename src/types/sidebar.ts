export interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  keyShortcut?: string;
}

export interface AppSidebarProps {
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
  setSplitDirectory: React.Dispatch<React.SetStateAction<string>>;
}
