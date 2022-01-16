export default {

    getToken(){
      return  localStorage.getItem("o2o-app-key");
    },

    deleteToken(){
        return localStorage.removeItem("o2o-app-key")
    }
}