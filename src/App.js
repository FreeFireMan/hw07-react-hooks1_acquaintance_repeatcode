import logo from './logo.svg';
import './App.css';

import React, { memo, useEffect, useMemo, useReducer, useState } from "react";

// agenda
// useState +
// useEffect +
// useReducer
// useMemo
// memo
// useCallback


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODO': {
            return action.payload;
        }
        case 'CHANGE_TODO_STATUS': {
            return {
                ...state,
                completed: ! state.completed
            };
        }
        case 'CHANGE_TODO_TITLE': {
            return {
                ...state,
                title: action.payload
            };
        }
        default: {
            console.error(`didn't found case for action:`, action);
            return state;
        }
    }
};

const initialState = {
    userId: null,
    id: null,
    title: '',
    completed: false
};

// let test = 0;

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [counter, setCounter] = useState(0);
  // console.log(counter);
    const [counter, setCounter] = useState(1);
    const [user, setUser] = useState({name: 'a', age: 40});
    const [todo, setTodo] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);

  const onClickHandler = () => {
      // setCounter(counter + 1)
      setCounter((prevState) => prevState + 1)
  }

  const onStatusChange = () => dispatch({type: 'CHANGE_TODO_STATUS'});

  const onTitleChange = () =>
      dispatch({type: 'CHANGE_TODO_TITLE', payload: Math.random()});
    // const onClickHandler = () => {
    //     // test++
    //     setUser(prevState => ({
    //         ...prevState,
    //         age: prevState.age + 1
    //     }));
    // }

    // const userNameClickHandler = () => {
    //     setUser(prevState => ({
    //         ...prevState,
    //             name: prevState.name  + '!'
    //     }));
    // }
    useEffect(() => {
        console.log('beat me out of me');
        if ([2, 4, 6].some(el => el === counter)){
            fetch(`https://jsonplaceholder.typicode.com/todos/${counter}`)
                .then(response => response.json())
                .then(json => setTodo(json));
        }
    }, [counter])

    return (
      <div className="App">
        <button onClick={onClickHandler}>inc</button>
        {/*<button onClick={userNameClickHandler}>change name</button>*/}
        <button onClick={onStatusChange}>change todo status</button><button onClick={onTitleChange}>change todo title</button>
        <h1>May use object</h1>
        {/*<h2>{test}</h2>*/}
        {/*  <h2>{counter}</h2>*/}
        {/*  <h2>{user.name}</h2>*/}
        {/*  <h2>{user.age}</h2>*/}
        {!!todo && (
           <>
            {/*<h2>{todo.id}</h2>*/}
            {/*<h2>{todo.title}</h2>*/}
            {/*<h2>{todo.completed.toString()}</h2>*/}
            <h2>{state.id}</h2>
            <h2>{state.title}</h2>
            <h2>{state.completed.toString()}</h2>
           </>
        )}
      </div>
  );
}
