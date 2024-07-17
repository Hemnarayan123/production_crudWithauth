
const backendUrl = `http://localhost:8000`


const summaryAPI = {

   signUp: {
    url: `${backendUrl}/api/v1/register`,
   },

    signIn: {
    url: `${backendUrl}/api/v1/login`,
   },
}

export { summaryAPI} 