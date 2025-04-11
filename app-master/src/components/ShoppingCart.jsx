import React, { useReducer } from "react";

/**
 * itme 객체
 */
const initialState = {
  items: [],
  totalPrice: 0,
  nextItemId: 1,
};

/**
 * 쇼핑카트 Reducer 핸들러
 * @param {reducerState} state reducer 상태값
 * @param {dispatch} action dispatch의 {type, payload}
 * @returns
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = {
        ...action.payload,
        id: state.nextItemId,
      };
      return {
        ...state,
        items: [...state.items, newItem],
        totalPrice: state.totalPrice + newItem.price,
        nextItemId: state.nextItemId + 1,
      };
    }
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const newTotalPrice = filteredItems.reduce(
        (total, item) => (total += item.price * (item.quantity || 1)),
        0
      );
      return {
        ...state,
        items: filteredItems,
        totalPrice: newTotalPrice,
      };
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotalPrice = updatedItems.reduce(
        (total, item) => (total += item.price * (item.quantity || 1)),
        0
      );
      return {
        ...state,
        items: updatedItems,
        totalPrice: newTotalPrice,
      };
    }
    default:
      return state;
  }
};

/**
 * useReducer 훅을 사용한 쇼핑카트 예제
 * @returns
 */
const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const handleAddItem = () => {
    const newItemName = `상품 ${state.nextItemId}`;
    const newItemPrice = Math.floor(Math.random() * 10000) + 1000;

    addItem({ name: newItemName, price: newItemPrice });
  };
  const handleRemoveItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };
  const handleUpdateQty = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    });
  };

  return (
    <div>
      <h2>쇼핑 카트</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}원 X {item.quantity || 1}
            <button
              onClick={() => handleUpdateQty(item.id, (item.quantity || 1) + 1)}
            >
              +
            </button>
            <button
              onClick={() => handleUpdateQty(item.id, (item.quantity || 1) - 1)}
            >
              -
            </button>
            <button onClick={() => handleRemoveItem(item)}>삭제</button>
          </li>
        ))}
      </ul>
      <p>총 가격 : {state.totalPrice}</p>
      <button onClick={handleAddItem}>상품 추가</button>
    </div>
  );
};

export default ShoppingCart;
