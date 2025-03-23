export interface IBooks {
    docs: IBook[];
}

export interface IBook {
    title: string;
    author_name: string[];
    author_key: string[];
    first_publish_year: number;
    edition_count: number;
}