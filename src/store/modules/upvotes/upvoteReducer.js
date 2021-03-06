import {
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  REMOVE_UPVOTE_SUCCESS,
  REMOVE_UPVOTE_ERROR,
  GET_UPVOTES_SUCCESS,
  GET_UPVOTES_ERROR,
} from './upvoteTypes';

export const initState = {
  upvotedPosts: [],
  upvotesError: null,
};

export const upvotesReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPVOTE_SUCCESS:
      return {
        ...state,
        upvotedPosts: state.upvotedPosts.map((upvotePost) =>
          upvotePost.postID === payload.postID
            ? {
                ...upvotePost,
                upvotes: [...upvotePost.upvotes, payload.upvotes],
              }
            : upvotePost
        ),
        upvotesError: null,
      };
    case UPVOTE_ERROR:
      return {
        ...state,
        upvotesError: payload,
      };

    case GET_UPVOTES_SUCCESS:
      return {
        ...state,
        upvotedPosts: [
          ...state.upvotedPosts,
          { postID: payload.postID, upvotes: payload.upvotes },
        ],
        upvotesError: null,
      };

    case GET_UPVOTES_ERROR:
      return {
        ...state,
        upvotedPosts: [],
        upvotesError: payload,
      };

    case REMOVE_UPVOTE_SUCCESS:
      return {
        ...state,
        upvotedPosts: state.upvotedPost.map((upvoteItem) =>
          Number(upvoteItem.postID) === payload.postID
            ? {
                ...upvoteItem,
                upvotes: upvoteItem.upvotes.filter(
                  ({ id }) => id !== payload.upvoteID
                ),
              }
            : upvoteItem
        ),
      };
    case REMOVE_UPVOTE_ERROR:
      return {
        ...state,
        upvotesError: payload,
      };

    default:
      return state;
  }
};
