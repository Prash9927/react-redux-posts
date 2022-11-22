import React from 'react';
import FormPost from './components/FormPost';
import PostList from './components/PostList';
// import Counter from './components/Counter';
import './index.css'

function App() {
  
  return (
    <div className='container'>
      <FormPost/>
      <PostList/>
    </div>
  );
}

export default App;
