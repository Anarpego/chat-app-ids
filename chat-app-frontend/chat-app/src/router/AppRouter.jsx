import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const { auth, verificarToken } = useContext(AuthContext);

    useEffect(() => {

        verificarToken();

    }, [verificarToken]);

    //console.log('authchecking xd',auth.checking);
    if (auth.checking) {

        return (
            <h1>Espera por favor...</h1>
        )
    }

    return (
        <Router>
            <Routes>

                <Route path="/" element={
                    <PublicRoute isAuthenticated={auth.logged}>
                        <ChatPage />
                    </PublicRoute>
                } />

                {/* el asterisco le dice a react que las rutas son anidadas y el elemento debe responder a la ruta que comienza con /auth/ */}
                <Route path="/auth/*" element={
                    <PrivateRoute isAuthenticated={auth.logged}>
                        <AuthRouter />
                    </PrivateRoute>
                } />

                <Route path="*" element={<Navigate to={<ChatPage />} />} />
            </Routes>
        </Router>
    );
};
