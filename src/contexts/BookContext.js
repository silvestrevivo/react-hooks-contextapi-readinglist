import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  // if books variable changes, useEffect trigers a function
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    // with a function as third argument, we check here if there is a saved
    // value on localStorage for books variable. Otherwise returns empty array
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : [];
  });
  // useEffect hook saves data in localStorage each time that books changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books])

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;
