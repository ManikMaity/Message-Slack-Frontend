export function getErrorMessage(error) {
    console.log(error, "getErrorMessage");
    if (error?.err[0]){
        return error.err[0];
    }
    else if (error?.message){
        return error.message;
    }
    else {
        return "Something went wrong";
    }
}