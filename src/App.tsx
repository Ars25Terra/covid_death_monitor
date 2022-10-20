import React from 'react';
import {observer} from "mobx-react-lite";
import {useRootStore} from "./app/stores/StoreProvider";
import LoginForm from "./app/components/LoginForm/LoginForm";
import UserArea from "./app/components/UserArea/UserArea";
import {createTheme, ThemeProvider} from "@mui/material";
import './app/styles/style.css'
import ErrorMessage from "./app/components/ErrorMessage/ErrorMessage";

const App = observer(() => {
    const store = useRootStore()
    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        },
    });

    return <ThemeProvider theme={darkTheme}>
    <div className="app">
        {!store.accessToken && !store.errorText && <LoginForm store={store}/>}
        {store.accessToken && !store.errorText && <UserArea store={store}/>}
        {store.errorText && <ErrorMessage errorText={store.errorText}/>}
    </div>
    </ThemeProvider>
    }

)
export default App;
