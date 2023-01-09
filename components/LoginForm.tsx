
import GoogleButton from 'react-google-button'
import {signInWithGoogle, signInWithEmail} from "../utils/firebase";
import Card from "@mui/material/Card";
import {auth} from "../utils/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

export function LoginForm() {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <div>
                <p>Signed In User: {user.user.email}</p>
            </div>
        );
    }

    return (
        <>
            <Card className="login-card"
                  sx={{
                      padding: '50px',
                      width: "100%",
                      height: "100%",
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,

                  }}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                }}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password">
                        </input>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(event) => {
                            event.preventDefault();
                            signInWithEmailAndPassword((document.getElementById("exampleInputEmail1") as HTMLInputElement).value, (document.getElementById("exampleInputPassword1") as HTMLInputElement).value);
                        }}
                    >Sign In
                    </button>
                </form>

                <div className="google-login">
                    <GoogleButton
                        onClick={() => { googleLogin() }}
                    />
                </div>
            </Card>

        </>
    );
}