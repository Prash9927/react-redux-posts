import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts,getPostStatus,fetchPosts} from '../slice/postSlice';
import Loading from './Loading';
import PostExcerpt from './PostExcerpt';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  // const postError = useSelector(getPostError);
  useEffect(() => {
    if(postStatus === 'idle'){
      dispatch(fetchPosts());
    }
  },[postStatus,dispatch]);

  const orderPostByDate = posts.posts.slice().sort((a,b) => b.date.localeCompare(a.date));
  // console.log('orderPostByDate',orderPostByDate);
  let content;
  if(postStatus === 'loading'){
    return <Loading/>
  }
  if(postStatus === 'success'){
    content = orderPostByDate.map(post => <PostExcerpt key={post.id} post={post}/>)
  }
  return (
    <section>
      <h1 className='heading'>Posts</h1>
      {content}
    </section>
  );
}

export default PostList;
