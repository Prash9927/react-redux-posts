import React, { useState } from 'react';
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { addNumber,minusNumber,resetState,addByAmount } from '../slice/counterSlice';
const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const [amount,setAmount] = useState(0);
  console.log('count', count);
  function resteAll(){
    setAmount(0);
    dispatch(resetState());
  }
  return (
    <div className='container'>
      <h1>Counter</h1>
      <section className='app-section'>
        <h2 className='heading'>{count}</h2>
        <div>
            <button className='btn' onClick={() => dispatch(minusNumber())}>-</button>
            <button className='btn' onClick={() => resteAll()}>Reset</button>
            <button className='btn' onClick={() => dispatch(addNumber())}>+</button>
        </div>

        <div>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <button onClick={() => dispatch(addByAmount(Number(amount)))}>
            Add By Value
        </button>
      </section>
      
    </div>
  );
}

export default Counter;
