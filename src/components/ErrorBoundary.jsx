import React from "react";
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state={hasError:false};
    }

    static getDerivedStateFromError(error){
        console.log("erroreee")
        return {hasError:true};
    }

    componentDidCatch(error,info){
        console.log(error);
    }

    render(){
        if (this.state.hasError){
            return this.props.fallback;
        }
        return this.props.children;
    }


    }
    export default ErrorBoundary;