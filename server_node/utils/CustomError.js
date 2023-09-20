class CustomError extends Error{
    constructor(custom_msg,status){
        super();
        this.name=this.constructor.name;
        this.status=status;
        this.message=custom_msg;
    }
}

export default CustomError;