import { SAVE_DATA } from './const';

const initialState = {
    Values: {},
  }

function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_DATA:
                return Object.assign({}, state, {
                    Values: action.payload
                })
        default:
            return state
    } 
}

export default reducer;