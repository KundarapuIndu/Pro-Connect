import { createSlice } from "@reduxjs/toolkit"
import { reset } from "../authReducer"
import { getAllPosts,getAllComments } from "../../action/postAction"
import { getAboutUser} from "../../action/authAction"

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    comments: [],
    postId: "",
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = ""
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true
                state.message = "Fetching all posts..."
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload.posts.reverse();
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAboutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
                state.user = action.payload.profile
                state.connections = action.payload.connections
                state.connectionRequest = action.payload.connectionRequest
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.postId = action.payload.post_id
                state.comments=action.payload.comments
            })
    }
})

export const { resetPostId }=postSlice.actions;
export default postSlice.reducer;