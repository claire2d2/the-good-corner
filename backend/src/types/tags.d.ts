import type TagEntity from "../entities/Tag.entity";

export type TagCreateType = Omit<TagEntity, "id" | "created_at" | "updated_at">;

export type TagUpdateType = Omit<TagEntity, "id">;