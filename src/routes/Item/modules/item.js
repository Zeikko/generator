import axios from 'axios'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_ITEM = 'GENERATE_ITEM'

// ------------------------------------
// Actions
// ------------------------------------

export function generateItem() {
  return (dispatch, getState) => {
    return axios.get('/api/item', )
      .then(function (response) {
        return dispatch({
          type: GENERATE_ITEM,
          payload: response.data
        })
      })
  }
}

export const actions = {
  generateItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERATE_ITEM]: (state, action) => {
    return {
      ...state,
      result: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  result: {
    string: ''
  }
}
export default function itemReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

