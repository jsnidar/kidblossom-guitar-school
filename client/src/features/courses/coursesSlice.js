import { createSlice } from "@reduxjs/toolkit";
import { setErrors } from "../../errorHandling/errorsSlice";
import { headers, baseUrl, getToken } from "../../Globals";

export function fetchCourses() {
  return function (dispatch) {
    
    fetch(baseUrl + '/courses', {
      method: "GET",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(courses => {
          dispatch(coursesFetched(courses))
        })
      }else{
        res.json().then(errors => {
          dispatch(setErrors(errors))
        })
      }
    })
  }
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    entities: [],
    currentCourse: {},
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
    courseFetched(state, action) {
      state.currentCourse = action.payload
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
        user_id: action.payload.user_id,
        instructor_name: `${action.payload.user.first_name} ${action.payload.user.last_name}`
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
    state.currentCourse = action.payload
    }
  }
})
// export the action creators
export const { courseAdded, courseRemoved, courseUpdated, courseFetchRejected, coursesFetched, courseActionLoading, courseFetched } = coursesSlice.actions;

export default coursesSlice.reducer;
