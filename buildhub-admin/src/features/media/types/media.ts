export type MediaType =
  | "Image"
  | "Video"
  | "Document";

export type MediaStatus =
  | "Active"
  | "Processing"
  | "Archived";

export interface Media {
  id: number;

  name: string;

  type: MediaType;

  status: MediaStatus;

  size: string;

  folder: string;

  uploadedBy: string;

  uploadedAt: string;

  url: string;

  thumbnail: string;
}