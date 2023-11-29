import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../store/users/userActions";
import { firestore } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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

  return (
    <div>
      <button onClick={() => handleLogin()}>Entrar con google</button>
    </div>
  );
};

export default Login;
