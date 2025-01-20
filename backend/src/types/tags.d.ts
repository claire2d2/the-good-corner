export type Tag = {
    [key: string]: string;
    id: string;
    label: string;
}

export type TagWithoutId = Omit<Tag, [id]>