export type Category = {
    [key: string]: string;
    id: string;
    title: string;
}

export type CategoryWithoutId = Omit<Category, [id]>