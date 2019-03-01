export interface Book {
    isbn: string;
    title: string;
    authors: string;
}

export interface BookApi {
    items: Book[];
    total_count: number;
}