import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginGoggle } from "../../store/users/userActions";
import { Firestore } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
function Login() {
  const productColletion = collection(Firestore, "nombre de la colecion");

  useEffect(() => {
    const getData = async () => {
      const responde = await getDocs(productColletion);
      console.log(responde);
    };
    getData();
  }, []);

  const handlelogin = () => {
    dispatch(loginGoggle());
  };
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => handlelogin()}>Entrar con google</button>
    </div>
  );
}
export default Login;
