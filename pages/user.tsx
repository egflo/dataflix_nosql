import {LoginForm} from "../components/LoginForm";
import Card from "@mui/material/Card";

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../utils/firebase";
import Button from "@mui/material/Button";
import {Layout} from "../components/Layout";
import Home from "./index";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import theme from "tailwindcss/defaultTheme";
import Box from "@mui/material/Box";

const login = () => {
    signInWithEmailAndPassword(auth, 'test@test.com', 'password');
};
const logout = () => {
    signOut(auth);
};

export default function UserPage() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    user?.getIdToken().then((token) => {
        console.log(token);
    })
    if (user) {
        return (
            <Box className="user-page"
                 sx={{
                     display : 'flex',
                     justifyContent : 'center',
                     alignItems : 'center',
                     width : '100vw',
                     padding : '20px',
                     backgroundColor: theme => theme.palette.background.paper,
                 }}
            >
                <Card sx={{width:600}}>
                    <CardContent>
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <img
                                    src={"./firebase.png"}
                                    alt="User's profile picture"
                                    className="rounded-circle img-fluid profile-picture"
                                />
                            </div>
                            <div className="col-md  text-md-left">
                                <Typography variant="h5" component="div">
                                    {user.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    UID: {user.uid}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Provider ID: {user.providerId}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Email Verified: {user.emailVerified ? 'Yes' : 'No'}
                                </Typography>

                            </div>
                        </div>
                    </CardContent>
                </Card>

            </Box>


        );
    }
    return <Button onClick={login}>Log in</Button>;
};

UserPage.getLayout = (page: any) => (
    <Layout>
        {page}
    </Layout>
);