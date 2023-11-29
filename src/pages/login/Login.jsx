import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../store/users/userActions";
import { firestore } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";

const Login = () => {
  const productCollection = collection(firestore, "Productos");
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginGoogle());
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getDocs(productCollection);
      const tempArr = [];
      response.forEach((doc) => {
        tempArr.push({ id: doc.id, ...doc.data() });
      });
      console.log(tempArr);
    };
    getData();
  }, []);

  const { register, handleSubmit } = useForm();

  const handleLoginWithEmailAndPasssword = (data) => {
    console.table(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLoginWithEmailAndPasssword)}>
        <input
          className="loginInput"
          type="text"
          placeholder="ingrese correo electronico"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="ingrese su contraseña"
          {...register("password")}
        />
        <button type="submit">Entrar</button>
      </form>

      <button type="button" onClick={() => handleLogin()}>
        Entrar con google
      </button>
    </div>
  );
};

export default Login;
