import {Movie} from "../../models/Movie";
import {GetStaticPaths, GetStaticProps} from 'next'
import type {ParsedUrlQuery} from 'querystring'
import {Layout} from "../../components/Layout";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Scroll from "../../components/Scroll";
import {CardStyle} from "../../components/CardStyle";
import * as React from "react";
import ScrollPagination from "../../components/ScrollPagination";
import {Score} from "../../components/Score";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Favorite from "../../components/actions/Favorite";
import Share from "../../components/actions/Share";
import Rate from "../../components/actions/Rate";
import {Chip} from "@mui/material";
import {useRouter} from "next/router";
import {Tag} from "../../models/Tag";
import {axiosInstance} from "../../utils/firebase";
import {ViewType} from "../../components/ViewType";
import {ContentType} from "../../components/ContentType";
import {Paper} from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";



export interface QParams extends ParsedUrlQuery {
    id?: string
}


const API_URL: string = 'http://localhost:8080/movie/';
const API_URL_SUGGEST: string = 'http://localhost:8080/movie/suggest/';
const API_URL_REVIEWS: string = 'http://localhost:8080/review/movie/';
function MoviePage({data}: {data: Movie}) {
    const router = useRouter();

    function testURL(url: string) {
        if (url == null) {
            return false
        }
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function testValue(value: any) {
        if (value == null) {
            return false
        }

        if (typeof value === 'string' || value instanceof String) {

            if (value.length === 0) {
                return false
            }
        }

        if (typeof value === 'number') {

            if (value <= 0) {
                return false
            }
        }

        return true
    }

    function onCastClick(id: string) {
        router.push(`/cast/${id}`);
    }


    function formatNumber(num?: number) {
        if (num) {
            return num.toFixed(0)
        }

        if (num == null) {
            return "N/A"
        }
        return num.toFixed(0)
    }

    function onGenreClick(id: string) {
        const params = {
            genres: id
        }
        router.push({
            pathname: '/search/all',
            query: params
        });
    }


    function onTagClick(tag: Tag) {
        const params = {
            tags: tag.tagId
        }
        router.push({
            pathname: '/search/all',
            query: params
        });
    }

    return (
        <>

            <Box className="container__content" >

                <Box
                    className="content__background"
                    style={
                        {
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${testURL(data.background) ? data.background : "/background.png"})`,

                        }
                    }>
                </Box>

                <Box
                    className="content__background"
                    style={
                        {
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(0,0,0,0.5)',

                        }
                    }>
                </Box>


                <Box className="container__header">

                    <Box className="container__header__left">
                        <img className="content__image"
                             style={{width: '100%', height: '95%', objectFit: 'cover'}}
                            src={testURL(data.poster) ? data.poster : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                            alt={data.title}
                        />

                        <Box className="container__header__left__score"
                                style={ {
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '10px',
                                }}
                        >
                            <Score score={data.ratings.rating}></Score>

                        </Box>

                    </Box>


                    <Box className="container__info">

                        <Box className="container__info__title">
                            <Typography variant="h4">
                                {data.title}
                            </Typography>
                        </Box>

                        <Box className="content__subtitle">
                            <Typography variant="subtitle1" className="content__subtitle__text">
                                {data.year}
                            </Typography>

                            <span className="separator">&bull;</span>

                            <Typography variant="subtitle1" className="content__subtitle__text">
                                {data.rated ? data.rated : "N/A"}
                            </Typography>

                            <span className="separator">&bull;</span>

                            <Typography variant="subtitle1" className="content__subtitle__text">
                                {data.runtime} min
                            </Typography>
                        </Box>

                        <Box className="content__genres">
                            {data.genres.map((genre, index) => (
                                <Chip key={index}
                                      onClick={() => onGenreClick(genre)}
                                      sx={{
                                          "&:hover": {
                                              backgroundColor: "rgba(100,100,100,0.4)",
                                          },
                                          cursor: 'pointer',
                                      }}
                                  color="primary" label={genre}></Chip>
                            ))}
                        </Box>


                        <Box className="content__action_items">
                            <Favorite movie={data}></Favorite>
                            <Share movie={data}></Share>
                            <Rate movie={data}></Rate>
                        </Box>

                        <Box style={{
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap',
                            alignItems:'center',
                            alignContent:'flex-start',
                            gap:'15px'
                        }}>
                            {testValue(data.ratings.imdb)   &&
                                <Box className="container__ratings">
                                    <img className="content__rating" style={{padding:0}} src={"/imdb.png"} alt={"IMDB"}></img>
                                    <Typography className="content__rating__text">{data.ratings.imdb}
                                        <span style={{color:'grey', fontSize: '0.8rem', margin:0}}> / 10 </span>
                                    </Typography>
                                </Box>
                            }

                            {testValue(data.ratings.metacritic)  &&
                                <Box className="container__ratings">
                                    <img className="content__rating" style={{height:38}} src={"/metacritic.png"} alt={"meta"}></img>
                                    <Typography
                                    className="content__rating__text">{formatNumber(data.ratings.metacritic)}</Typography></Box>
                            }

                            {data.ratings.rottenTomatoesStatus &&
                                <Box className="container__ratings">
                                    <img className="content__rating" style={{height:38}} src={"/Fresh.png"} alt={"tomato"}></img>
                                    <Typography className="content__rating__text">{formatNumber(data.ratings.rottenTomatoes)}%</Typography></Box>
                            }

                            {data.ratings.rottenTomatoesAudienceStatus &&
                                <Box className="container__ratings">
                                    <img className="content__rating" style={{height:38}} src={'/' + data.ratings.rottenTomatoesAudienceStatus + '.png'} alt={"tomato"}></img>
                                    <Typography className="content__rating__text">{formatNumber(data.ratings.rottenTomatoesAudience)}%
                                    </Typography>
                                </Box>
                            }

                        </Box>

                        <Box className="description-container">
                            <Box className="description-item-container" sx={{width:'100%'}}>
                                <Typography className="description-title">Overview</Typography>
                                <Typography className="description-text">{data.plot}</Typography>
                            </Box>
                            <Box className="description-item-container">
                                <Typography className="description-title">Director</Typography>
                                <Typography className="description-text">{data.director}</Typography>
                            </Box>

                        </Box>

                        <Box className="content__tags">
                            {data.keywords.map((tag, index) => (
                                <Chip key={index}
                                      onClick={() => onTagClick(tag)}
                                      sx={{
                                          "&:hover": {
                                              backgroundColor: "rgba(100,100,100,0.4)",
                                          },
                                          cursor: 'pointer',
                                      }}
                                      color="primary" label={tag.name}></Chip>
                            ))}
                        </Box>

                    </Box>
                </Box>

            </Box>



                <Scroll title={"Cast & Crew"}>
                        <Box className="container-fluid">
                            <Box className="row flex-row flex-nowrap">
                                {data.cast.map((cast, index) => (

                                    <Box key={index} className="col">

                                        <Card sx={{ width: 180, height: 270, pointer: 'cursor'}} onClick={() => onCastClick(cast.castId)} >
                                            <CardMedia
                                                component="img"
                                                alt={cast.name}
                                                height="150"
                                                image={testURL(cast.photo) ? cast.photo: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" sx={
                                                    {
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',

                                                    }}>
                                                    {cast.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {cast.characters}
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                        {/*

                                <div className="card cast-card" style={{
                                    width: '10rem',
                                    boxShadow: '0 0 2px rgba(0,0,0,0.5)',
                                }} onClick={() => onCastClick(cast.castId)}>
                                    <img className="card-img-top"
                                         style={
                                                {
                                                    width: '100%',
                                                    height: '10rem',
                                                    objectFit: 'cover',
                                                }
                                         }
                                         src={testURL(cast.photo) ? cast.photo: 'https://via.placeholder.com/150'}
                                         alt={cast.name}>
                                    </img>
                                    <div className="card-body"
                                         style={
                                             {
                                                 width: '100%',
                                                 height: '7rem',
                                                 objectFit: 'cover',
                                             }
                                         }
                                    >
                                        <h5 className="card-title"
                                            style={
                                                {
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',

                                                }
                                            }
                                        >{cast.name}</h5>
                                        <p className="card-text">{cast.characters}</p>
                                    </div>
                                </div>
                                */}
                                    </Box>


                                ))}
                            </Box>

                        </Box>
                </Scroll>

                <ScrollPagination path={API_URL_REVIEWS + data.movieId + '?sortBy=created'} style={CardStyle.VERTICAL} type={ContentType.REVIEW} view={ViewType.HORIZONTAL} title={"Reviews"} />


                <ScrollPagination path={API_URL_SUGGEST + data.movieId + '?sortBy=popularity'} style={CardStyle.VERTICAL} type={ContentType.MOVIE} view={ViewType.HORIZONTAL} title={"Related"}/>


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
                            variant="h5"className="container__header__title">Information</Typography>
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

                <Box className="container__inf" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '10px',
                    padding: 1,
                    backgroundColor: theme => theme.palette.background.paper,


                }}>
                    <Paper elevation={1}>
                        <div className="description-item">
                            <Typography className="description-title">Writer(s)</Typography>
                            <Typography className="description-text">{data.writer}</Typography>
                        </div>
                    </Paper>

                    <Paper elevation={1}>
                        <div className="description-item">
                            <Typography className="description-title">Production</Typography>
                            <Typography className="description-text">{data.production}</Typography>
                        </div>
                    </Paper>

                    <Paper elevation={1}>
                        <div className="description-item">
                            <Typography className="description-title">Country</Typography>
                            <Typography className="description-text">{data.country}</Typography>
                        </div>
                    </Paper>

                    <Paper elevation={1}>
                        <div className="description-item">
                            <Typography className="description-title">Language(s)</Typography>
                            <Typography className="description-text">{data.language}</Typography>
                        </div>
                    </Paper>

                    <Paper elevation={1}>
                        <div className="description-item">
                            <Typography className="description-title">Box Office</Typography>
                            <Typography className="description-text">{data.boxOffice}</Typography>
                        </div>
                    </Paper>
                </Box>

        </>
    )
}

//https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    // @ts-ignore
    const slug = context.params['id'];
    if (!slug) {
        return {
            notFound: true,
        }
    }

    let fetcher = (url: string) => axiosInstance.get(url).then((response: { data: any; }) => response.data)

    const res = await axiosInstance.get(API_URL + slug)
    const data = await res.data

    if(!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data
        }
    }
}
export default MoviePage;


MoviePage.getLayout = (page: any) => (
    <Layout>
        {page}
    </Layout>
);