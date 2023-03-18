import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const onChange = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        })
    }

    const onSubmitNuevoUsuario = async (ev) => {
        ev.preventDefault();
        // Llamar backend
        const { nombre, email, password } = form;

        const respuesta = await register(nombre, email, password);
        const { msg } = respuesta
        //console.log(respuesta);

        if (!respuesta) {
            Swal.fire('Error al registrar', msg, 'error')
        } else {
            Swal.fire('Usuario registrado con exito', msg, 'success')
        }


    }

    return (

        <>
            <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmitNuevoUsuario}>
                <span className="login100-form-title mb-3">
                    Chat - Registro
                </span>

                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={onChange} />
                    <span className="focus-input100"></span>
                </div>



                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange} />
                    <span className="focus-input100"></span>
                </div>


                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChange} />
                    <span className="focus-input100"></span>
                </div>

                <div className="row mb-3">
                    <div className="col text-right">
                        <NavLink to="/auth/login" className="txt1">
                            Ya tienes cuenta?
                        </NavLink>
                    </div>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <button className="login100-form-btn" type='submit'>
                        Crear cuenta
                    </button>
                </div>

            </form>
        </>
    );
};
