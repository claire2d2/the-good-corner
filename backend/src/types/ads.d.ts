import type AdEntity from "../entities/Ad.entity";
import type { FindOptionsOrderValue } from "typeorm";

export type FilterType = {
  limit?: number;
  order?: FindOptionsOrderValue;
};

export type AdCreateType = Omit<
  AdEntity,
  "id" | "created_at" | "updated_at" | "tags" | "category"
> & {
  tagsIds: string[];
  categoryId: string;
};

export type AdUpdateType = Partial<
  Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags" | "category"> & {
    tagsIds: string[];
  }
> & { categoryId: string };