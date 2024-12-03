export function getErrorMessage(error) {
    if (Array.isArray(error?.err) && error?.err[0]){
        return error.err[0];
    }
    else if (error?.message){
        return error.message;
    }
    else {
        return "Something went wrong";
    }
}