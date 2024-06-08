export interface RecordProps {
  name: string;
  date: string;
}

export interface RegisteredDevice {
  id: string;
  name: string;
  user_id: number;
  status: number;
}

export interface Record {
  id: string;
  filename: string;
  user_id: number;
  created_at: string;
}

export interface Tabs {
  title: string;
  type: string;
  // component: React.Component;
}

export interface RecordListType {
  name: string;
  date: string;
}
