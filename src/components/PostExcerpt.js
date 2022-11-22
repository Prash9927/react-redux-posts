import React from 'react';
import PostByUser from './PostByUser';
import ReactionsButton from './ReactionsButton';
import TimeAgo from './TimeAgo';
const PostExcerpt = ({post}) => {
  return (
    <article key={post.id} className='post-box'>
        <h2 className='title'>{post.title}</h2>
        <p className='content'>{post?.body?.substring(0,50)}</p>
        <div style={{display:'flex', justifyContent:"space-between"}}>
          <PostByUser userId={post.userId}/>
          <TimeAgo timeStamp={post.date}/>
        </div>
        <ReactionsButton post={post}/>
        
    </article>
  );
}

export default PostExcerpt;
