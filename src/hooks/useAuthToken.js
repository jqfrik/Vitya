import React from 'react'

function useAuthToken(){
    const [authToken,setAuthToken] = React.useState("")
    setTimeout(()=>{
        setAuthToken(localStorage.getItem("authToken"))
    },20000)
    return {authToken}
}

export default useAuthToken;