import {combineReducers} from 'redux'
import {refreshNavbar} from './actions'

function re(state={'refresh':False}, action){
    switch (action.type){
        case "refresh":
            return {'refresh':True}
        default:
        return state
    }
}
const refresh= combineReducers({re})
export default refresh