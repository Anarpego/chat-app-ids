import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";


export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null
};



export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {

    const resp = await fetchSinToken('login', { email, password }, 'POST');

    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const { usuario } = resp;
      // console.log('->>>>', usuario);


      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email

      });

    }


    return resp.ok
  }

  const register = async (nombre, email, password) => {

    const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST')
    // console.log("->",resp);
    if (resp.ok) {
      localStorage.setItem('token', resp.token);

      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email

      });

    }

    return resp.ok;

  }

  const verificarToken = useCallback(async () => {

    const token = localStorage.getItem('token');

    // No hay token
    if (!token) {
      return setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null
      })
    }

    const resp = await fetchConToken('login/renew')

    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email

      });

      //console.log('autenticado :v')

      return true;

    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null

      });

      return false;
    }

  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    dispatch({
      type: types.cerrarSesion
    })
    setAuth({
      checking: false,
      logged: false
    });


  }


  return (
    <AuthContext.Provider value={{
      login,
      register,
      verificarToken,
      logout,
      auth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
