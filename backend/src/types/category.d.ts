import type CategoryEntity from "../entities/Category.entity";

export type CategoryCreateType = Omit<
  CategoryEntity,
  "id" | "created_at" | "updated_at" | "ads"
>;
export type CategoryUpdateType = Omit<
  CategoryEntity,
  "id" | "created_at" | "updated_at" | "ads"
>;

export type CategoryFindWithParams = {
  id: string;
  limit?: string;
};
// export type CategoryUpdateType = Omit<CategoryEntity, "id">;