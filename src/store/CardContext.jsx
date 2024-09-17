// src/store/CardContext.jsx
"use client";

import React, { createContext, useState, useContext } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  console.log(cards);
  return (
    <CardContext.Provider value={{ cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);

export default CardContext;
