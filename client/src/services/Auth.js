export default {

    getToken(){
      return  localStorage.getItem("auth-app-key");
    },

    deleteToken(){
        return localStorage.removeItem("auth-app-key")
    }
}
