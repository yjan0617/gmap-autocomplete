export const searchPlace = (query) => ({
  type: 'SEARCH_PLACE',
  payload: query,
});

export const searchSuccess = (results) => ({
  type: 'SEARCH_SUCCESS',
  payload: results,
});

export const setSelectedPlace = (place) => ({
  type: 'SET_SELECTED_PLACE',
  payload: place,
});
