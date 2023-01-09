import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import {useEffect} from "react";
import Toast, {ToastState, ToastType, Alert} from "../Toast";
import Snackbar from "@mui/material/Snackbar";
import {auth, axiosInstance} from "../../utils/firebase";
import {Bookmark} from "../../models/Bookmark";
import { useSWRConfig } from "swr"


export default function Favorite(props: any) {
    const { mutate } = useSWRConfig()
    const [bookmarked, setBookmarked] = React.useState<Bookmark | null>(null);
    const [selected, setSelected] = React.useState(props.selected);
    const [state, setState] = React.useState<ToastState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: "",
        type: ToastType.INFO,
    });
    const { vertical, horizontal, open, message, type } = state;

    const handleToast = (message: string, type: ToastType) => {
        console.log("handleClick");
        setState({ ...state, open: true, message: message, type: type });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    function handleSelected() {
        if (auth.currentUser != null) {
            auth.currentUser.getIdToken(true).then(function (idToken) {

                if (selected) {

                    if (bookmarked != null) {

                        fetch("http://localhost:8080/bookmark/"+ bookmarked.id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + idToken
                            },
                        })
                            .then((response) => {
                                if (response.ok) {
                                    handleToast("Removed from favorites", ToastType.INFO);
                                    setSelected(false);
                                } else {
                                    handleToast("Error removing from favorites", ToastType.ERROR);
                                }
                            })
                    }

                    else {
                        handleToast("You have to bookmark the movie first", ToastType.ERROR);
                    }


                }
                else {
                    fetch("http://localhost:8080/bookmark/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + idToken
                        },
                        body: JSON.stringify({
                            movieId: props.movie.movieId,
                            userId: auth.currentUser?.uid,
                            created: new Date(),
                        }),
                    })
                        .then(async (response) => {
                            let data = await response.json();
                            if (response.status == 200) {
                                setSelected(true);
                                setBookmarked(data.data);
                                handleToast(data.message, data.status? ToastType.SUCCESS : ToastType.ERROR);
                            } else {
                                setSelected(false);
                                handleToast(data.error, ToastType.ERROR);
                            }
                        });

                }

                //tel all SWR to revalidate the data

            }).catch(function (error) {
                handleToast(error.message, ToastType.ERROR);
            });
        } else {
            handleToast("Please login to add to favorites", ToastType.INFO);
        }
    }

    useEffect( () => {

        axiosInstance.get("http://localhost:8080/bookmark/" + props.movie.id).then((response) => {
            if (response.status == 200) {
                setSelected(response.data.success);
                setBookmarked(response.data.data);
            }

        }).catch((error) => {
            setSelected(false);
            handleToast(error.message, ToastType.ERROR);

        });

    }, []);

    return (
        <>
            <IconButton
                onClick={handleSelected}
                sx={{
                    color: selected ? "red" : "white.500"
                }}
                aria-label="add to favorites"
                color={selected ? "primary" : "inherit"}
            >
                <FavoriteIcon/>
            </IconButton>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>

    )
}