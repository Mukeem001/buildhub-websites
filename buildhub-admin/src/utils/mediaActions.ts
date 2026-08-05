import { Media } from "@/features/media/types/media";

/**
 * Delete Selected Media
 */
export const deleteSelectedMedia = (
  media: Media[],
  selectedIds: number[]
): Media[] => {
  return media.filter(
    (item) => !selectedIds.includes(item.id)
  );
};

/**
 * Move Selected Media to Folder
 */
export const moveSelectedMedia = (
  media: Media[],
  selectedIds: number[],
  folder: string
): Media[] => {
  return media.map((item) => {
    if (!selectedIds.includes(item.id)) {
      return item;
    }

    return {
      ...item,
      folder,
    };
  });
};