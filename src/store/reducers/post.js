import { LOAD_POSTS, TOGGLE_BOOKED } from '../action_types'

const initialState = {
  allPosts: [],
  bookedPosts: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, allPosts: action.payload, bookedPosts: action.payload.filter(p=>p.booked)};
    case TOGGLE_BOOKED:
      let allPosts = state.allPosts.map(post=> {
         if(post.id === action.payload) {
           post.booked = !post.booked
         }
         return post;
      });
      return {...state, allPosts, bookedPosts: allPosts.filter(p=>p.booked)};r
    default:
      return state; // default value
  }

}