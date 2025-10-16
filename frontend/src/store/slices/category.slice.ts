import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axiosInstance";

export const categoryThunk = createAsyncThunk(
    "category/all",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/category');
            console.log("ress",res);
            
            if(res?.data?.success){
                return res?.data?.data;
            }
        } catch (error:any) {
            rejectWithValue(error?.response?.data?.message || "Failed to load categories");
        }
    }
)

export const addCategoryThunk = createAsyncThunk(
    "category/add",async(formData,{rejectWithValue}) => {
        try {
            const res = await api.post('/category',formData);
            if(res?.data?.success){
                return res?.data?.data;
            }
        } catch (error) {
            rejectWithValue(error?.response?.data?.message || "Failed to load categories");
        }
    }
);

const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:[],
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(categoryThunk.pending,(state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(categoryThunk.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
            state.categories = action?.payload
        });
        builder.addCase(categoryThunk.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addCategoryThunk.pending,(state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addCategoryThunk.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(addCategoryThunk.rejected,(state,action) => {
            state.loading = false,
            state.error = action?.payload;
        })
    }
})

export default categorySlice.reducer;