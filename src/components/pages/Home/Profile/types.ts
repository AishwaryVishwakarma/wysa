export interface ProfileProps {
  closeProfile: () => void;
}

export enum UploadStatus {
  Idle,
  Loading,
  Success,
  Error,
}
