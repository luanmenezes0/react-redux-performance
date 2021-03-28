import React from 'react';

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

let Post = ({ post }) => {
  return (
    <article style={{ border: 'solid grey 1px', padding: '16px' }} key={post.id}>
      <PostAuthor user={post.user} />
      <h3 style={{ margin: '5px 0' }}>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default Post;
