import { createSlice } from "@reduxjs/toolkit";



const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    entities: [],
    status: 'idle',
  },
  reducers: {
    courseFetchRejected(state, action) {
      state.status = "rejected"
    },
    courseActionLoading(state, action) {
      state.status = "loading"
    },
    coursesFetched(state, action) {
      state.entities = action.payload;
    },
    courseAdded(state, action) {
      state.entities.push({name: action.payload.name})
    },
    courseRemoved(state, action) {
      state.entities = state.entities.filter(course => course.id !== action.payload)
    },
    courseUpdated(state, action) { 
      const course = state.entities.find((course) => course.id === action.payload.id)
      if (course) {
        course.name = action.payload.name
      }
    }
  }
})
// export the action creators
export const { courseAdded, courseRemoved, courseUpdated, courseFetchRejected, coursesFetched, courseActionLoading } = coursesSlice.actions;

export default coursesSlice.reducer;
