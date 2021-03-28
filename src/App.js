import React from 'react';

import PostsList from './features/posts/PostsList';

function App() {
  return (
    <>
      <header style={{ display: 'grid', placeContent: 'center' }}>
        <h1>Micro Blog</h1>
      </header>
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default App;
