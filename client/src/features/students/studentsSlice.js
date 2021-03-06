import { createSlice } from "@reduxjs/toolkit";
import { getToken, headers } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";

export function fetchStudents() {
  return function (dispatch) {
    dispatch(studentActionLoading())
    
    fetch('/students', {
      method: "GET",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(students => {
          dispatch(studentsFetched(students))
          dispatch(studentFetchSucceeded())
        })
      }else{
        res.json().then(errors => {
          dispatch(setErrors(errors))
          dispatch(studentFetchRejected())
        })
      }
    })
  }
}

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    entities: [],
    status: 'idle',
  },
  reducers: {
    studentFetchRejected(state, action) {
      state.status = "rejected"
    },
    studentFetchSucceeded(state, action) {
      state.status = "succeeded"
    },
    studentActionLoading(state, action) {
      state.status = "loading"
    },
    studentsFetched(state, action) {
      action.payload ? state.entities  = action.payload : state.entities = [];
    },
    studentAdded(state, action) {
      state.entities = [...state.entities, action.payload]
    },
    studentRemoved(state, action) {
      state.entities = state.entities.filter(student => student.id !== action.payload)
    },
    studentUpdated(state, action) { 
      const student = state.entities.find((student) => student.id === action.payload.id)
      if (student) {
        student.first_name = action.payload.first_name 
        student.last_name = action.payload.last_name
        student.birth_date = action.payload.birth_date
        student.gender = action.payload.gender
      }
    }
  }
})
// export the action creators
export const { studentAdded, studentRemoved, studentUpdated, studentFetchRejected, studentFetchSucceeded, studentsFetched, studentActionLoading } = studentsSlice.actions;

export default studentsSlice.reducer;

export const selectAllStudents = state => state.students.entities 

export const selectStudentById = (state, studentId) => state.students.entities.find(student => student.id === parseInt(studentId))
