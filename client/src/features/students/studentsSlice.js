import { createSlice } from "@reduxjs/toolkit";



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
    studentActionLoading(state, action) {
      state.status = "loading"
    },
    studentsFetched(state, action) {
      action.payload ? state.entities  = action.payload : state.entities = [];
    },
    studentAdded(state, action) {
      state.entities.push(action.payload)
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
export const { studentAdded, studentRemoved, studentUpdated, studentFetchRejected, studentsFetched, studentActionLoading } = studentsSlice.actions;

export default studentsSlice.reducer;
