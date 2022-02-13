import { createSlice } from "@reduxjs/toolkit";
import { headers, getToken, baseUrl } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";

export function fetchInstructors() {
  return function (dispatch) {
    
    fetch(baseUrl + '/instructors', {
      method: "GET",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(instructors => {
          dispatch(instructorsFetched(instructors))
        })
      }else{
        res.json().then(errors => {
          dispatch(setErrors(errors))
        })
      }
    })
  }
}

const instructorsSlice = createSlice({
  name: 'instructors',
  initialState: {
    entities: [],
    status: 'idle',
  },
  reducers: {
    instructorFetchRejected(state, action) {
      state.status = "rejected"
    },
    instructorActionLoading(state, action) {
      state.status = "loading"
    },
    instructorsFetched(state, action) {
      state.entities = action.payload;
    },
    instructorAdded(state, action) {
      state.entities = [...state.entities, {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        primary_email: action.payload.primary_email,
        primary_phone: action.payload.primary_phone,
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        zip_code: action.payload.zip_code,
      }]
    },
    instructorRemoved(state, action) {
      state.entities = state.entities.filter(instructor => instructor.id !== action.payload)
    },
    instructorUpdated(state, action) { 
      const instructor = state.entities.find((instructor) => instructor.id === action.payload.id)
      if (instructor) {
          instructor.id = action.payload.id
          instructor.first_name = action.payload.first_name
          instructor.last_name = action.payload.last_name
          instructor.primary_email = action.payload.primary_email
          instructor.primary_phone = action.payload.primary_phone
          instructor.address = action.payload.address
          instructor.city = action.payload.city
          instructor.state = action.payload.state
          instructor.zip_code = action.payload.zip_code
      }
    }
  }
})
// export the action creators
export const { instructorAdded, instructorRemoved, instructorUpdated, instructorFetchRejected, instructorsFetched, instructorFetched, instructorActionLoading } = instructorsSlice.actions;

export default instructorsSlice.reducer;
