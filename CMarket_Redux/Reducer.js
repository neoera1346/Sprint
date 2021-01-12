import { bindActionCreators } from "redux";
import { REMOVE_FROM_CART, ADD_TO_CART, SET_QUANTITY } from "../actions/index";
import { initialState } from "./initialState";

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //    ✕ ADD_TO_CART 액션에 따라 cartItems 상태가 변해야 합니다 (35 ms)
      //TODO
    return Object.assign({}, state, {cartItems: [...state.cartItems, {itemId: action.payload.itemId, quantity: action.payload.quantity}]})
      break;

    case REMOVE_FROM_CART:
      //TODO
    let rmvIdx = state.cartItems.findIndex(el => el.itemId === action.payload.itemId);
    let copiedArr = state.cartItems.slice();
    copiedArr.splice(rmvIdx, 1);
    return Object.assign({}, state, {cartItems: copiedArr})
      break;

    case SET_QUANTITY:
      let idx = state.cartItems.findIndex(el => el.itemId === action.payload.itemId)
      //TODO
      let copiedArray = state.cartItems.slice();
      copiedArray[idx].quantity = action.payload.quantity;
      return Object.assign({}, state, {cartItems: copiedArray});
      break;

    default:
      return state;
  }
}
export default itemReducer;