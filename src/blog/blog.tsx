import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { feed } from './schema_resolvers';

const FeedQuery = gql`
query ($searchString: String, $skip: Int!, $take: Int!, $orderBy: PostOrderByUpdatedAtInput) {
    feed (searchString: $searchString, skip: $skip, take: $take, orderBy: $orderBy) {
        id
        title
        content
        author {
            name
        }
    }
}
`;

const Blog = () => {
    const { index, count } = useParams();
    const [Sort, setSort] = useState({name: 'Newest to Oldest', sort: 'desc'});
    const skip = typeof(index) == 'string' ? parseInt(index) : 0;
    const take = typeof(count) == 'string' ? parseInt(count) : 0;

    const {data} = useQuery<feed> (
        FeedQuery,
        {variables: {skip, take, orderBy: {updatedAt: Sort.sort}}}
    );

    return <div>
    <h3>Blog</h3>
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">{Sort.name}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort({name: 'Newest to Oldest', sort:'desc'})}>Newest to Oldest</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort({name: 'Oldest to Newest', sort:'asc'})}>Oldest to Newest</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            
    {!data ? (
      <p>Loading ...</p>
    ) : (
      <table width='100' className='table fixed'>
        <thead>
          <tr>
            <th>Blog Title</th>
            <th>Blog Content</th>
            <th>Blog ID</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
            {console.log(data)}
          {data.feed.map((e) => {
              return (<tr>
                  <td width='10%'>{e.title}</td>
                  <td width='70%'><Link to={"/blog/post="+e.id}>{e.content}</Link></td>
                  <td width='10%'>{e.id}</td>
                  <td width='10%'>{e.author.name}</td>
              </tr>)
          })}
          {data.feed && data.feed[data.feed.length-1].id !== 1 ? 
          (<tr>
            <th>end of page</th>
            <td>
              <Link to={'/blog/start='+(skip+take)+'/end='+(take)}>next page </Link>
              {(skip-take) > -take &&  // ensures that the skip - take is will result in a page greater than 0
                <Link to={'/blog/start='+(skip-take > 0 ? skip-take : 0)+'/end='+(take)}> previous page</Link>
              }
            </td>
            </tr>) : (
            <tr>
                <th>end of blog posts</th>
                <th><Link to={'/blog/start='+(skip-take)+'/end='+(take)}>previous page</Link></th>
            </tr>
            )}

        </tbody>
      </table>
    )}
  </div>
    };


export {Blog, FeedQuery}