import React from 'react';

export const PostAuthor = ({ user }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {<img
        src={`https://picsum.photos/id/${user.id}/50/50`}
        alt=""
        style={{ borderRadius: '50%', height: '100%' }}
      />}
      <span>{user.name}</span>
    </div>
  );
};

export default PostAuthor;
