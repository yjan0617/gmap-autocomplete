const initialState = {
  results: [],
  selectedPlace: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        results: [action.payload, ...state.results].slice(0, 5),
      };
    case 'SET_SELECTED_PLACE':
      return {
        ...state,
        selectedPlace: action.payload,
      };
    default:
      return state;
  }
};
