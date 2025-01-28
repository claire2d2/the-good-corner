export type Ad = {
    id: string,
    title: string,
    description: string,
    price: float,
    picture: string,
    location: string,
    created_at: string,
    updated_at: string, 
    category : Category,
    tags: Tag[]
}

export type AdCreate = {
    title: string,
    description: string,
    price: float,
    picture: string,
    location: string,
    categoryId : string,
    tagsIds: string[]
}

export type Category = {
    id: string,
    title: string,
    created_at: string,
    updated_at: string
}

export type Tag = {
    id: string,
    label: string,
    created_at: string,
    updated_at: string
}

export type AdCreateFormInfos = Omit<
  ProductType,
  "id" | "created_at" | "updated_at" | "category"
> & { categoryId: string };

