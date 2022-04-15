
class  UserServices{
    getUser = async(userData) => {
        return { sucess:true, userData}
    }
}

module.exports = new UserServices()