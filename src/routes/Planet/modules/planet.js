import axios from 'axios'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_PLANET = 'GENERATE_PLANET'

// ------------------------------------
// Actions
// ------------------------------------

export function generatePlanet() {
  return (dispatch, getState) => {
    return axios.get('/api/planet', {
      })
      .then(function (response) {
        return dispatch({
          type: GENERATE_PLANET,
          payload: response.data
        })
      })
  }
}

export const actions = {
  generatePlanet
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERATE_PLANET]: (state, action) => {
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

