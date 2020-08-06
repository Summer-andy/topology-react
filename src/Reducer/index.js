export const initState = {
  eventKey: ''
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'addNode':
      return {
        ...state,
        eventKey: action.data
      };
    default:
      return state;
  }
}
