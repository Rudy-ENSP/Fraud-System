export function refreshNavbar(islogin){
    if (islongin){
        return { type:"refresh"}
    }
    return {type:"NOne"}
}