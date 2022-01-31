export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

export const baseUrl = "http://localhost:3000"

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
