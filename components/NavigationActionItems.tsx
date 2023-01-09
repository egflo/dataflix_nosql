import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {auth} from "../utils/firebase";
import React from "react";
import {useRouter} from "next/router";
import {CircularProgress} from "@mui/material";
import {LogoutButton} from "./LogoutButton";
import {useAuthState} from "react-firebase-hooks/auth";



export default function NavigationActionItems() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const handleFavoritesClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        router.push('/favorites')
    }

    const handleAccountClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        router.push('/user')
    }

    if (loading) {
        return (
            <CircularProgress/>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (user) {
        return (
            <>
                <IconButton
                    onClick={handleAccountClick}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="Favorites"
                    sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                    <AccountCircleIcon />
                    <Typography variant="subtitle1" noWrap component="div" sx={{ display: { color:'inherit' } }}>
                        Account
                    </Typography>
                </IconButton>

                <IconButton
                    onClick={handleFavoritesClick}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="Favorites"
                    sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                    <FavoriteIcon />
                    <Typography variant="subtitle1" noWrap component="div" sx={{ display: { color:'inherit' } }}>
                        Favorites
                    </Typography>
                </IconButton>


                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="Favorites"
                    sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                    <LogoutIcon />
                    <Typography variant="subtitle1" noWrap component="div" sx={{ display: { color:'inherit' } }}>
                        Logout
                    </Typography>
                </IconButton>
            </>
        );
    }




    return (
        <>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="Favorites"
                sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
                <LoginIcon />
                <Typography variant="subtitle1" noWrap component="div" sx={{ display: { color:'inherit' } }}>
                    Login
                </Typography>
            </IconButton>

        </>
    );
}