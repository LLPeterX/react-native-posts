import { LOAD_POSTS } from '../action_types'
import { DATA } from '../../data'

// action creators for Posts list (on MainScreen)
export const loadPosts = () => {
  return ({
    type: LOAD_POSTS,
    payload: DATA
  });
};

