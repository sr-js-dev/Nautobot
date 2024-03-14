export interface TabItem {
  label: string;
  title?: string;
  value: string;
}

export interface TabContextProps {
  tabs: TabItem[];
  value: string;
  scrollY?: boolean;
  children: React.ReactNode;
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}
