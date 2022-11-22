import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../slice/postSlice';
import { selectAllUsers } from '../slice/userSlice';

const FormPost = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [userId,setUserId] = useState(0);
  const userOptions = users.users.map((user) => {
    return (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    )
  })
  const [title,setTitle] = useState('');
  
  const [content,setContent] = useState('');
//   const [showButton,setShowButton] = useState(true);
  const onContentChanged = (e) => {
    setContent(e.target.value);
  }
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  function savePost(e){
    e.preventDefault();
    if(title && content && userId){
        console.log('userid', userId);
        dispatch(addPosts(JSON.stringify({title,body:content,userId})));
        setContent('');
        setTitle('');
    }else{
        console.log('error');
    }
  }

  function onUserChange(e){
    console.log('e',e.target.value);
    setUserId(e.target.value)
  }
  return (
    <div className='form-conatiner'>
      <form className='form-group'>
        <section style={{marginBottom:'1rem'}}>
            <div>
                <label className='text-label'>
                    Post Title
                </label>
            </div>
            <input
                type='text'
                value={title}
                onChange={onChangeTitle}
                className='form-elements input-element'
            />
        </section>
        <section>
            <div>
                <label className='text-label'>
                    User
                </label>
            </div>
            <select className='form-elements' style={{height:'2rem'}} onChange={(e) => onUserChange(e)}>
                <option value=""></option>
                {userOptions}
            </select>
            
        </section>
        <section style={{marginBottom:'1rem'}}>
            <div>
            <label className='text-label'>
                Content
            </label>
            </div>
            <textarea value={content} onChange={onContentChanged} className='form-elements text-element'/>
        </section>

        <button 
          className='btn' 
          onClick={(e) => savePost(e)}
          disabled={title && content && userId ? false : true}
        >
        Save Post
        </button>
      </form>
    </div>
  );
}

export default FormPost;
