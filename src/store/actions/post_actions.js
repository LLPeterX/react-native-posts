import { DB } from '../../db';
import { CREATE_POST, DELETE_POST, LOAD_POSTS, TOGGLE_BOOKED } from '../action_types'

// action creators for Posts list (on MainScreen)
export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts();
    console.log('post_action: posts=',posts);
    dispatch({type: LOAD_POSTS, payload: posts});
  }
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