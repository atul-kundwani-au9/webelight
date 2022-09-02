const initialState = {
  cart: [],
  price: "",
};

export default function userReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: action.cart };
    case "SEARCH_RESULT":
      return {
        ...state,
        products: { data: action.payload.products, isLoaded: true },
      };
    default:
      return state;
  }
}
