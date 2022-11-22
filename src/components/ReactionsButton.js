import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../slice/postSlice';

const reactionBtn = {
    "like":'👍',
    "wow":'😲', 
    "heart":'❤️',
    "laugh":'🤣'
    
}

const ReactionsButton = ({post}) => {
    const dispatch = useDispatch();
    const reactionButton = Object.entries(reactionBtn).map(([name,emoji]) => {
        return (
            <button
                key={name}
                type="button"
                style={{backgroundColor:'rgb(48, 47, 47)', border:"none",color:'#FFF'}}
                onClick={() => dispatch(reactionAdded({id:post.id,reaction:name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButton}</div>

}

export default ReactionsButton;
