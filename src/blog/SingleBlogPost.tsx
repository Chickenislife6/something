import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { postById } from "../schema_resolvers";

const SingleBlogQuery = gql`
query ($id: Int!) {
    postById (id: $id) {
        id
        title
        content
        author {
            name
        }
    }
}
`;

const BlogPost: React.FC = () => {
    const { blogid } = useParams();
    const id = typeof(blogid) === 'string' ? parseInt(blogid) : null

    const {loading, data} = useQuery<postById>(
        SingleBlogQuery,
        {variables: {id}}
    )
    return (
    <div>
        {!data ? <h1>loading....</h1>:
        <div>
            {console.log(data.postById.title)}
            <h1>{data.postById.title}</h1>
            <p>{data.postById.content}</p>
        </div>}
    </div>)
    
}

export { BlogPost } 