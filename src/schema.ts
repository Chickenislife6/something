import internal from "stream";

interface Post {
    id: number,
    createdAt: Date,
    updatedAt: Date, 
    title: string,
    content: string,
    published: boolean,
    author: User
}

interface User {
    id: number,
    name: string,
    email: string,
    posts: [Post],
}

export type {Post, User}