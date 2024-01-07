import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GoogleSignInBtn({ isLoading, authFor }) {
  const navigate = useNavigate();
  async function handleOAuthSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // CHECK IF USER EXISTS
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success(
        `Successfully ${authFor === "sign-in" ? "signed in" : "signed up"}`
      );
    } catch (error) {
      console.log(error.code.split("/").at(1).split("-").join(" "));
    }
  }
  return (
    <button type="button" onClick={handleOAuthSignUp} disabled={isLoading}>
      <span>
        <FcGoogle />
      </span>
      <span>Continue with Google</span>
    </button>
  );
}
