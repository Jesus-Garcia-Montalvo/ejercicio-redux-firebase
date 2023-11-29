import React from "react";
import { useForm } from "react-hook-form";
import uploadFile from "../../services/fileUpload";
import { useDispatch } from "react-redux";
import { createAnAccountAsync } from "../../store/users/userActions";

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
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          type="text"
          placeholder="ingrese su nombre completo"
          {...register("name")}
        />
        <input
          type="email"
          placeholder="ingrese su correo "
          {...register("email")}
        />
        <input
          type="password"
          placeholder="ingrese su contraseña"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="confirme su contraseña"
          {...register("confirmedPassword")}
        />
        <input type="file" {...register("image")} />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default Register;
