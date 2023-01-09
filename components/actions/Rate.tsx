import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import {useEffect} from "react";
import Toast, {ToastState, ToastType, Alert} from "../Toast";
import Snackbar from "@mui/material/Snackbar";
import StarIcon from "@mui/icons-material/Star";
import Card from "@mui/material/Card";
import {Backdrop, CardHeader} from "@mui/material";
import Rating from '@mui/material/Rating';
import CardContent from "@mui/material/CardContent";
import ClickAwayListener from
        "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";

export default function Rate(props: any) {
    const [value, setValue] = React.useState<number | null>(2);
    const [selected, setSelected] = React.useState(false);
    const [state, setState] = React.useState<ToastState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: "",
        type: ToastType.INFO,
    });
    const { vertical, horizontal, open, message, type } = state;

    const handleToast = (message: string, type: ToastType) => () => {
        setState({ ...state, open: true, message: message, type: type });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleClickAway = () => {
        setSelected(false);
    }

    useEffect(() => {

        console.log("useEffect");

    } , [value])

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <IconButton
                        style={{zIndex: 99}}
                        onClick={() => setSelected(!selected)}
                        aria-label="rate"
                        color={selected ? "primary" : "inherit"}
                    >
                        <StarIcon/>
                    </IconButton>
                    {(selected && !props.backdrop) &&
                        <Card sx={{height: 40, position: 'absolute', top: 0, left: 0, zIndex: 98 }}>

                            <div style={{display: 'flex', justifyContent: 'right', alignItems: 'initial', height: '100%', paddingTop:5, paddingLeft: 35, paddingRight:10}}>
                                <Rating name="half-rating"
                                        onChange={(event, newValue) => {
                                            console.log("onChange");
                                            setValue(newValue);
                                        }}

                                        value={value}
                                        defaultValue={2.5}
                                        precision={0.5}
                                        max={10}/>
                            </div>
                        </Card>
                    }
                </div>
            </ClickAwayListener>

            {props.backdrop &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={selected}
                    onClick={handleClose}
                >
                    <Card sx={{zIndex: (theme) => theme.zIndex.drawer + 2 }}>
                        <CardHeader
                            title={props.movie.title}
                            subheader="Please rate this film"
                        />
                        <CardContent>
                            <Rating name="half-rating"
                                    onChange={(event, newValue) => {
                                        console.log("onChange");
                                        setValue(newValue);
                                    }}

                                    value={value}
                                    defaultValue={2.5}
                                    precision={0.5}
                                    max={10}/>
                        </CardContent>
                    </Card>

                </Backdrop>
            }


            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>

    )
}