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

