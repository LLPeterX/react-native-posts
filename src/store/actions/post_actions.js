import { DB } from "../../db";
import {
  CREATE_POST,
  DELETE_POST,
  LOAD_POSTS,
  TOGGLE_BOOKED,
} from "../action_types";
import * as FileSystem from "expo-file-system";

// action creators for Posts list (on MainScreen)
export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts();
    //    console.log("post_action: posts=", posts);
    dispatch({ type: LOAD_POSTS, payload: posts });
  };
};

export const toggleBooked = (post) => {
  return async (dispatch) => {
    await DB.updatePost(post);
    dispatch({ type: TOGGLE_BOOKED, payload: post.id });
  }
};

export const deletePost = (id) => {
  return async (dispatch) => {
    await DB.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  }
};

export const createPost = (post) => async (dispatch) => {
  let payload;
  if (post.img) {
    const imgFileName = post.img.split("/").pop();
    const newImgPath = FileSystem.documentDirectory + imgFileName;
    try {
      await FileSystem.copyAsync({
        from: post.img,
        to: newImgPath,
      });
    } catch (e) {
      console.error("Error saving image:", e);
    }
    payload = { ...post, img: newImgPath };
  } else {
    payload = { ...post };
  }

  payload.id = await DB.createPost(payload);
  dispatch({ type: CREATE_POST, payload });
};
