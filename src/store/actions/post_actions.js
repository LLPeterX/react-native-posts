import { LOAD_POSTS, TOGGLE_BOOKED } from '../action_types'
import { DATA } from '../../data'

// action creators for Posts list (on MainScreen)
export const loadPosts = () => {
  return ({
    type: LOAD_POSTS,
    payload: DATA
  });
};

export const toggleBooked = (id) => {
  return ({type: TOGGLE_BOOKED, payload: id} );
};
