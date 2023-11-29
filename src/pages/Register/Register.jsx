import React from "react";
import { useForm } from "react-hook-form";
import uploadFile from "../../services/fileUpload";
import { useDispatch } from "react-redux";
import { createAnAccountAsync } from "../../store/users/userActions";
import "./register.css";
import { Link } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleRegister = async (data) => {
    const photoURL = await uploadFile(data.image[0]);
    const newUser = { ...data, photoURL };
    dispatch(createAnAccountAsync(newUser));
  };
  return (
    <div>
      <h1>Crear Una Nueva Cuenta</h1>
      <form onSubmit={handleSubmit(handleRegister)} className="registerForm">
        <input
          className="registerInput"
          type="text"
          placeholder="ingrese su nombre completo"
          {...register("name")}
        />
        <input
          className="registerInput"
          type="email"
          placeholder="ingrese su correo "
          {...register("email")}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="ingrese su contraseña"
          {...register("password")}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="confirme su contraseña"
          {...register("confirmedPassword")}
        />
        <input type="file" {...register("image")} className="registerInput" />
        <button type="submit" className="registerButton">
          Crear Cuenta
        </button>
      </form>
      <p>
        Si ya tienes cuenta registrada inicie sesión
        <Link to="/login">aquí</Link>
      </p>
    </div>
  );
}

export default Register;
