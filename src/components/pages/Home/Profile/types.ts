export interface ProfileProps {
  closeProfile: () => void;
  name: string;
  email: string;
}

export enum UploadStatus {
  Idle,
  Loading,
  Success,
  Error,
}
