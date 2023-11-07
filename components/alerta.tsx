'use client'
import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';
var cookie = require("@boiseitguru/cookie-cutter");

export default function Alerta() {
    const [logged, setLogged] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [user, setUser] = React.useState({ name: "", ghId: '', token: '' })

    React.useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userCode = urlParams.get("code");
        var userPlainText = cookie.get("ghUser")
        if (!userPlainText) {
            if (userCode) {
                fetch(process.env.NEXT_PUBLIC_MY_URL + "/api/github?code=" + userCode).then((response) => {
                    if (response)
                        return response.json()
                }).catch((error) =>{erro(error)}).then((data) => {
                    if (!cookie.get("ghUser")) {
                        if (data?.user) {
                            setUser(data.user)
                            cookie.set("ghUser", JSON.stringify(data.user));
                            sucesso()
                        }
                        else if (data.error)
                            erro(data.error)
                    }
                }).catch((error) => {erro(error)})
            }
            else
                nada()
        }
        else if (userCode) {
            setUser(JSON.parse(userPlainText))
            window.location.replace("/")
            sucesso()
        }
        else {
            setUser(JSON.parse(userPlainText))
            sucesso()
        }
    }, []);

    function nada() {
        setLogged(false)
        setError(false)
        setErrorMsg('')
    }
    function sucesso() {
        setLogged(true)
        setError(false)
        setErrorMsg('')
    }
    function erro(msg = '') {
        setLogged(false)
        setError(true)
        setErrorMsg(msg)
    }

    return (
        <div>
            {
                logged &&
                <Alert severity="success">
                    <AlertTitle>{process.env.NEXT_PUBLIC_THANKS_TITLE} {user.name}</AlertTitle>
                    {process.env.NEXT_PUBLIC_THANKS_MESSAGE}
                </Alert>
            }
            {
                error &&
                <Alert severity="error">
                    <AlertTitle>{process.env.NEXT_PUBLIC_ERROR_TITLE}</AlertTitle>
                    {errorMsg != '' ? errorMsg : process.env.NEXT_PUBLIC_UNEXPECTED_ERROR_MESSAGE}
                </Alert>
            }
        </div>
    )
}
