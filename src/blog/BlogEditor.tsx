import { gql, useMutation } from '@apollo/client';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Post } from '../schema';
import { createDraft } from '../schema_resolvers';

interface PostCreateInput {
    title: String,
    content: String
}
interface args {
    data: PostCreateInput,
    authorEmail: String
}

const CreateBlog = gql`
mutation CreateDraft($data: PostCreateInput!, $authorEmail: String!) {
  createDraft(data: $data, authorEmail: $authorEmail) {
    id
    title
    content
    author {
      name
    }
  }
}
`;

const BlogEditor = () => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Email, setEmail] = useState('');


    const [CreateBlogEntry, { data, loading, error }] = useMutation<createDraft>(CreateBlog);

    if (loading) return <h1>'Submitting...'</h1>;
    if (error) return <h1>`Submission error! ${error.message}`</h1>;
    if (data) {console.log(data); return <h1><Link to={"/blog/post=" + data.createDraft.id}>This is the newly created blog post!</Link></h1>};
   return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const mutationData: args = { 
            data: {title: Title, content: Content},
            authorEmail: Email
         }
          console.log(mutationData)
          CreateBlogEntry({variables: mutationData});
        }}
      >
        <textarea placeholder='title' value={Title} onChange={(e) => (setTitle(e.target.value))}/>
        <textarea placeholder='content' value={Content} onChange={(e) => (setContent(e.target.value))}/>
        <textarea placeholder='email' value={Email} onChange={(e) => (setEmail(e.target.value))}/>

        <button type="submit">Add Blog Entry</button>
      </form>
    </div>
  );
};

export { BlogEditor }