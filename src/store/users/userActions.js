import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { setError, setIsAuthenticate, setUser } from "./userSlice";
import { auth } from "../../firebase/firebaseConfig";

export const createAnAccountAsync = (newUser) => async (dispatch) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    await updateProfile(auth.currentUser, {
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
    });
    dispatch(
      setUser({
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: user.accessToken,
      })
    );
    dispatch(setIsAuthenticate(true));
    dispatch(setError(false));
  } catch (error) {
    console.warn(error);
    dispatch(
      setError({ error: true, code: error.code, message: error.message })
    );
  }
};

export const loginGoggle = () => {
  const provider = new GoogleAuthProvider();
  return async (dispatch) => {
    try {
      const usercredential = await signInAnonymously(auth, provider);
      console.log(usercredential);
      dispatch(setIsAuthenticate(true));
      dispatch(setUser(usercredential.user));
    } catch (error) {
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
};
