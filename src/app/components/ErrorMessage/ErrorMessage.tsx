import Button from "@mui/material/Button";
import React from "react";

interface IProps {
    errorText: string
}

const ErrorMessage = (props: IProps) => {
    return (<div className={'login-form'}>
        <div>
            {props.errorText}
        </div>
        <Button onClick={() => {window.location.reload()}}>
            Retry
        </Button>
    </div>)
}

export default ErrorMessage