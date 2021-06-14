import { CREATE_POST, DELETE_POST, LOAD_POSTS, TOGGLE_BOOKED } from '../action_types'
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

export const deletePost = (id) => {
  return ({type: DELETE_POST, payload: id} )
};

export const createPost = (post) => {
  return ({type: CREATE_POST, payload: post} )
}