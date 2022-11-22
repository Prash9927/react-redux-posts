import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../slice/userSlice';
const PostByUser = ({userId}) => {
   
  const users = useSelector(selectAllUsers);
  let author = users.users.find((user) => user.id === userId)?.name;
  return (
    <div>
      <span style={{color:"#fff"}}><i>by {author ? author : 'Unknown User'}</i></span>
    </div>
  );
}

export default PostByUser;
