import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import { fetchPosts } from './postsSlice';

export const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  React.useEffect(() => {
    const promise = dispatch(fetchPosts());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section
      role="feed"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px' }}
    >
      {content}
    </section>
  );
};

export default PostsList;
