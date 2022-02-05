export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

export const baseUrl = "http://localhost:3000"
// export const baseUrl = "https://kidblossom-guitar-school.herokuapp.com"

export const getToken = () => {
  return {
    'Authorization': `bearer ${ localStorage.getItem('jwt') }`
  }
}

export const customStyles = <style type="text/css">
{`
.btn-yellow {
  background-color: #f3b700;
  color: white;
  margin: 1rem;
  width: fit-content
}

{/* .btn-blue:hover {
  color: #f3b700
} */}

.btn-yellow-outline {
  color: #f3b700;
  border-style: solid;
  border-color: #112B80;
  width: fit-content;
}
`}
</style>

export const formatDate = (dateString) => {
  
  const year = parseInt(dateString.slice(0, 4), 10)
  const month = parseInt(dateString.slice(5, 7), 10) - 1
  const day = parseInt(dateString.slice(-2), 10)
  return new Date(year, month, day)
}

export const formatCourse = (courseObj) => {
  const formattedCourse = {...courseObj}
  switch (courseObj.meeting_day) {
    case "sunday":
      formattedCourse.meeting_day = "0";
      break;
    case "monday":
      formattedCourse.meeting_day = "1";
      break;
    case "tuesday":
      formattedCourse.meeting_day = "2";
      break;
    case "wednesday":
      formattedCourse.meeting_day = "3";
      break;
    case "thursday":
      formattedCourse.meeting_dayay = "4";
      break;
    case "friday":
      formattedCourse.meeting_day = "5";
      break;
    case "saturday":
      formattedCourse.meeting_day = "6";
      break;
    default:
      formattedCourse.meeting_day = "";
  }
  switch(courseObj.name) {
    case "group_lesson_30_min":
      formattedCourse.name = "0";
      break;
    case "group_lesson_15_min":
      formattedCourse.name = "1";
      break;
    case "private_lesson_30_min":
      formattedCourse.name = "2";
      break;
    default:
      formattedCourse.name = "";
  }
  switch(courseObj.status) {
    case "current":
      formattedCourse.status = "0";
      break;
    case "completed":
      formattedCourse.status = "1";
      break;
    default: 
      formattedCourse.status = ""
  }
  switch(courseObj.setting) {
    case "online":
      formattedCourse.setting = "0";
      break;
    case "in_person":
      formattedCourse.setting = "1";
      break;
    default:
      formattedCourse.setting = "";
  }
  
  formattedCourse.start_time = new Date(courseObj.start_time)
  return formattedCourse
}
