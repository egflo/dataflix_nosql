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
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";

export default function Rate(props: any) {
    const [selected, setSelected] = React.useState(false);
    const handleClickAway = () => {
        setSelected(false);
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <IconButton
                        style={{zIndex: 99}}
                        onClick={() => setSelected(!selected)}
                        aria-label="share"
                        color={selected ? "primary" : "inherit"}
                    >
                        <ShareIcon/>
                    </IconButton>
                    {(selected && !props.backdrop)  &&
                        <Card sx={{ width: 400, position: 'absolute', top: 0, left: 0, zIndex: 98 }}>

                            <div style={{display: 'flex', justifyContent: 'right', alignItems: 'initial', height: '100%', paddingTop:0, paddingLeft: 0, paddingRight:10}}>
                                <CardContent>
                                    <div className="targets">
                                        <a className="share-button">
                                            <img
                                                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                                                alt="Facebook"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Facebook
                                            </Typography>
                                        </a>

                                        <a className="share-button">
                                              <img
                                                    src="https://img.icons8.com/color/48/000000/instagram-new.png"
                                                    alt="Instagram"
                                                />
                                            <Typography variant="body2" color="text.secondary">
                                                Instagram
                                            </Typography>
                                        </a>
                                        <a className="share-button">
                                            <img
                                                src="https://img.icons8.com/color/48/000000/twitter.png"
                                                alt="Twitter"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Twitter
                                            </Typography>
                                        </a>
                                        <a className="share-button">
                                            <img
                                                src="https://img.icons8.com/color/48/000000/email.png"
                                                alt="Email"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Email
                                            </Typography>
                                        </a>
                                    </div>
                                    <div className="link">
                                        <div className="pen-url">https://moviedb.com/movie/</div>
                                        <button className="btn">Copy Link</button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    }
                </div>
            </ClickAwayListener>

            {props.backdrop &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={selected}
                >
                    <Card>
                        <CardContent>
                            <div className="targets">
                                <a className="share-button">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/facebook-new.png"
                                        alt="Facebook"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Facebook
                                    </Typography>
                                </a>

                                <a className="share-button">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/instagram-new.png"
                                        alt="Instagram"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Instagram
                                    </Typography>
                                </a>
                                <a className="share-button">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/twitter.png"
                                        alt="Twitter"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Twitter
                                    </Typography>
                                </a>
                                <a className="share-button">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/email.png"
                                        alt="Email"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Email
                                    </Typography>
                                </a>
                            </div>
                            <div className="link">
                                <div className="pen-url">https://moviedb.com/movie/</div>
                                <button className="btn">Copy Link</button>
                            </div>
                        </CardContent>
                    </Card>
                </Backdrop>
            }
        </>

    )
}