'use client'
import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Router } from 'next/router';
var cookie = require("@boiseitguru/cookie-cutter");

export default function Alerta() {
    const [logged, setLogged] = React.useState(false)
    const [error, setError] = React.useState(false)
    
    React.useEffect(()=> {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userCode = urlParams.get("code");
        if(!cookie.get("GH_AUTH_TOKEN")){ 
            if(userCode){
                fetch(process.env.NEXT_PUBLIC_MY_URL + "/api/github?code=" + userCode).then((response)=>{
                    if(response)
                        return response.json()
                }).then((data) =>{
                    if(data?.ghToken){
                        cookie.set("GH_AUTH_TOKEN", data.ghToken);
                        sucesso()
                    }
                    else if(cookie.get("GH_AUTH_TOKEN"))
                        sucesso()
                    else
                        erro()
                })
            }
            else
                nada()
        }
        else if(userCode){
            window.location.replace("/")
            sucesso()
        }
        else{
            sucesso()
        }
    }, []);

    function nada() {
        setLogged(false)
        setError(false)
    }
    function sucesso() {
        setLogged(true)
        setError(false)
    }
    function erro() {
        setLogged(false)
        setError(true)
    }

    return(
        <div>
        {
            logged &&
            <Alert severity="success">
                <AlertTitle>Obrigado</AlertTitle>
                Você doou com sucesso um token.
            </Alert>
        }
        {
            error &&
            <Alert severity="error">
                <AlertTitle>Erro</AlertTitle>
                Algo inesperado aconteceu, tente novamente mais tarde.
            </Alert>
        }
        </div>
    )
}
