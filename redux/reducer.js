import { ActionType } from "./action/action_types";

const initialState = {
  text: "",
  isLoading: true,
  tags: [],
  countries: [],
};

function nextArrayId(arr) {
  const maxId = arr.reduce((maxId, arr) => Math.max(arr.id, maxId), -1);
  return maxId + 1;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.ADD_NEW_TAG:
      return {
        ...state,
        tags: state.tags
          ? [
              ...state.tags,
              {
                id: nextArrayId(state.tags),
                tag: action.payload,
              },
            ]
          : [
              {
                id: 0,
                tag: action.payload,
              },
            ],
      };
    case ActionType.UPDATE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case ActionType.UPDATE_COUNTRY_LIST:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
}
