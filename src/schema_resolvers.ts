import { Post } from "./schema";
import { User } from "./schema";

export type feed = {
    feed: [Post]
}
export type postById = {
    postById: Post
}
export type createDraft = {
    createDraft: Post
}
