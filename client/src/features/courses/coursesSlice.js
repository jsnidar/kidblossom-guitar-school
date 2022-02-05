import { createSlice } from "@reduxjs/toolkit";
import { setErrors } from "../../errorHandling/errorsSlice";



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
      
      state.entities.push({
        name: action.payload.name,
        id: action.payload.id,
        setting: action.payload.setting,
        meeting_day: action.payload.meeting_day,
        start_date: action.payload.start_date,
        start_time: new Date(action.payload.start_time).toString(),
        status: action.payload.status,
        user_id: action.payload.user_id
      })
    },
    courseRemoved(state, action) {
      state.entities = state.entities.filter(course => course.id !== action.payload)
    },
    courseUpdated(state, action) { 
      const course = state.entities.find((course) => course.id === action.payload.id)
      if (course) {
          course.name = action.payload.name
          course.id = action.payload.id
          course.meeting_day = action.payload.meeting_day
          course.setting = action.payload.setting
          course.start_date = action.payload.start_date
          course.start_time = new Date(action.payload.start_time).toString()
          course.status = action.payload.status
          course.user_id = action.payload.user_id
      }
    }
  }
})
// export the action creators
export const { courseAdded, courseRemoved, courseUpdated, courseFetchRejected, coursesFetched, courseActionLoading } = coursesSlice.actions;

export default coursesSlice.reducer;
