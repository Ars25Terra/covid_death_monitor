import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {RootStore} from "../../stores/RootStore";
import {Button, TextField} from "@mui/material";

const LoginForm = ({store}: {store: RootStore}) => {

    const [login, setLogin] = useState<string>('')

    return (
        <div className={'login-form'}>
            <div className={'input-area'}>
                <TextField value={login}
                           data-testid={'userNameInput'}
                           required={true}
                           label="User Name"
                           variant="outlined"
                           onChange={(e) => {
                               setLogin(e.target.value)
                           }} />
            </div>
            <Button
                    disabled={!login}
                    size={"medium"}
                    variant={"outlined"}
                    onClick={() => store.authorize()}>
                Authorize
            </Button>
        </div>
    )
}

export default observer(LoginForm)