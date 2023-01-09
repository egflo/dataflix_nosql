import React, {MutableRefObject, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";

import {Movie} from "../models/Movie";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function Scroll({title, children}: { title?: String, children: any}) {
    let scrl = useRef() as MutableRefObject<HTMLDivElement>;
    const [scroll, setScroll] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);


    const slide = (shift: any) => {
        scrl.current.scrollLeft += shift;
        setScroll(scroll + shift);

        //For checking if the scroll has ended
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    }

    //This will check scroll event and checks for scroll end
    const scrollCheck = () => {
        setScroll(scrl.current.scrollLeft);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
        console.log(scrollEnd);
    };

    return (

        <>
            {title &&
                <Box className="header"
                     sx={{
                         backgroundColor: theme => theme.palette.background.paper,
                     }
                     }>

                    <Box className="header__sub" style={
                        {
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            gap:'10px',
                        }
                    }>

                        <Box className="container__main__shape"></Box>
                        <Typography
                            sx={{
                                color: theme => theme.palette.primary.contrastText,
                            }}
                            variant="h5"className="container__header__title">Cast & Crew</Typography>
                    </Box>

                    <Divider style={
                        {
                            width: '100%',
                            height: '4px',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            borderRadius: '1px',
                            margin: '2px',
                        }}></Divider>
                </Box>

            }

            <Box sx={
                {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme => theme.palette.background.paper,

                }
            }>

                {scroll !== 0 && (
                    <div className="button" onClick={() => slide(-150)}>
                        <FontAwesomeIcon icon={faChevronLeft} size="3x" color="#0F52BA"/>
                    </div>
                )}

                <div className="container__scroll" ref={scrl} onScroll={scrollCheck}>
                    {children}
                </div>

                {!scrollEnd && (
                    <div className="button" style={{right: '0', top: '0'}} onClick={() => slide(150)}>
                        <FontAwesomeIcon icon={faChevronRight} size="3x" color="#0F52BA"/>
                    </div>
                )}

            </Box>
        </>


    )
}