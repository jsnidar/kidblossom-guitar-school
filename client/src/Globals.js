export const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

export const getToken = () => {
  return {
    'Authorization': `bearer ${ localStorage.getItem('jwt') }`
  }
}

export const customStyles = <style type="text/css">
{`
.btn-blue {
  background-color: #112B80;
  color: white;
}
.btn-blue-outline {
  color: #112B80;
  border-style: solid;
  border-color: #112B80
}
`}
</style>
