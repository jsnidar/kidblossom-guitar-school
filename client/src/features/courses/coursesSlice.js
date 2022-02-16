import { createSlice } from "@reduxjs/toolkit";
import { setErrors } from "../../errorHandling/errorsSlice";
import { headers, getToken } from "../../Globals";


// export const getCourses = createAsyncThunk(
//   'courses/getCourses', 
//   async () => {
//   return await fetch('/courses', {
//     method: "GET",
//     headers: {
//       ...headers,
//       ...getToken()
//     },
//   }).then((res) => res.json())
// })

// export const postCourse = createAsyncThunk(
//   'courses/postCourse', 
//   async (strongParams) => {
//   return await fetch('/course', {
//     method: "POST",
//     headers: {
//       ...headers,
//       ...getToken()
//     },
//     body: JSON.stringify(strongParams)
//   }).then((res) => res.json())
// })

export const fetchCourses = () => {
  return function (dispatch) {
    dispatch(courseActionLoading())
    fetch('/courses', {
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
          dispatch(coursesFetchSucceeded())
        })
      }else{
        res.json().then(errors => {
          dispatch(setErrors(errors))
          dispatch(coursesFetchRejected())
        })
      }
    })
  }
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    entities: [],
    status: 'idle',
    errors: []
  },
  reducers: {
    coursesFetchRejected(state, action) {
      state.status = "rejected"
    },
    coursesFetchSucceeded(state, action) {
      state.status = "succeeded"
    },
    courseActionLoading(state, action) {
      state.status = "loading"
    },
    coursesFetched(state, action) {
      state.entities = action.payload;
    },
    courseAdded(state, action) {
      const { 
        name, 
        id, 
        setting, 
        meeting_day, 
        start_date, 
        start_time, 
        status, 
        user_id, 
        course_level, 
        user, 
        students
      } = action.payload

      state.entities = [...state.entities, {
        name: name,
        id: id,
        setting: setting,
        meeting_day: meeting_day,
        start_date: start_date,
        start_time: new Date(start_time).toString(),
        status: status,
        user_id: user_id,
        course_level: course_level,
        instructor_name: `${user.first_name} ${user.last_name}`,
        students: students
      }]
    },
    courseRemoved(state, action) {
      state.entities = state.entities.filter(course => course.id !== action.payload)
    },
    courseUpdated(state, action) { 
      const course = state.entities.find((course) => course.id === action.payload.id)
      const { 
        name, 
        id, 
        meeting_day, 
        setting, 
        start_date, 
        start_time, 
        status, 
        user_id, 
        course_level, 
        course_list_label, 
        students 
      } = action.payload

      if (course) {
          course.name = name
          course.id = id
          course.meeting_day = meeting_day
          course.setting = setting
          course.start_date = start_date
          course.start_time = new Date(start_time).toString()
          course.status = status
          course.user_id = user_id
          course.course_level = course_level
          course.course_list_label = course_list_label
          course.students = students
      }
    }
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(getCourses.pending, (state, action) => {
  //       state.status = 'loading'
  //       state.errors = []
  //     })
  //     .addCase(getCourses.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       state.entities = action.payload
  //     })
  //     .addCase(getCourses.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.errors = action.payload
  //     })
  //     .addCase(postCourse.pending, (state, action) => {
  //       state.status = 'loading'
  //       state.errors = []
  //     })
  //     .addCase(postCourse.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       const { name, id, setting, meeting_day, start_date, start_time, status, user_id, course_level, user, students} = action.payload

  //       state.entities.push({
  //         name: name,
  //         id: id,
  //         setting: setting,
  //         meeting_day: meeting_day,
  //         start_date: start_date,
  //         start_time: new Date(start_time).toString(),
  //         status: status,
  //         user_id: user_id,
  //         level: course_level,
  //         instructor_name: `${user.first_name} ${user.last_name}`,
  //         students: students
  //       })
  //     })
  //     .addCase(postCourse.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.errors = action.payload
  //     })
  // }
})
// export the action creators
export const { courseAdded, courseRemoved, courseUpdated, coursesFetchRejected, coursesFetched, coursesFetchSucceeded, courseActionLoading, courseFetched } = coursesSlice.actions;

export default coursesSlice.reducer;

export const selectAllCourses = state => state.courses.entities 

export const selectCourseById = (state, classId) => state.courses.entities.find(course => course.id === parseInt(classId))
