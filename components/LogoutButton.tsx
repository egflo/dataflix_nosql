import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import {signInWithGoogle, auth} from "../utils/firebase";
import Button from "@mui/material/Button";
import React from "react";
import {CircularProgress} from "@mui/material";


export function LogoutButton() {
    const [signOut, loading, error] = useSignOut(auth);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <CircularProgress/>;
    }
    return (
        <Button style={{marginRight:'10px', marginLeft:'10px'}}
                onClick={async () => {
                    const success = await signOut();
                    if (success) {
                        alert('You are sign out');
                    }
                }}
        >Log Out</Button>
    );
}