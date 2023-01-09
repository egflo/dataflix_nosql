import {GetServerSideProps, GetStaticPaths, GetStaticProps} from "next";
import {QParams} from "../cast/[id]";
import {Movie} from "../../models/Movie";
import {Layout} from "../../components/Layout";
import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import MovieCard from "../../components/MovieCard";
import {Pagination} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSWR from "swr";
import {CardStyle} from "../../components/CardStyle";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";


const API_URL_SEARCH: string = 'http://localhost:8080/movie/search/';

const label = { inputProps: { 'aria-label': 'Detailed' } };

enum SortBy {
    RATING = "ratings.numOfVotes",
    RELEASE_DATE = "releaseDate",
    TITLE = "title",
    YEAR = "year",
    ID = "id",
    POPULARITY = "popularity"
}

enum Direction {
    ASC = 1,
    DESC = 0
}

interface Sort {
    sortBy: SortBy,
    direction: Direction

}

const defaultSort: Sort = {
    sortBy: SortBy.ID,
    direction: Direction.DESC
}
const fetcher = (url: string) => fetch(url,
    { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}}).then(response => response.json())


function SearchPage({searchProps}: {searchProps: SearchProps}) {

    const router = useRouter();
    //Get query params

    const theme = useTheme()
    const [page, setPage] = React.useState(searchProps.page);
    const [limit, setLimit] = React.useState(searchProps.limit);
    const [sort, setSort] = React.useState({sortBy: searchProps.sortBy, direction: searchProps.direction});
    const [genre, setGenre] = React.useState(searchProps.genres);
    const [tag, setTag] = React.useState(searchProps.tags);

    console.log("Search Props: ", searchProps);

    let url = API_URL_SEARCH + searchProps.term + "?page=" + page + "&limit=" + limit + "&sortBy=" + sort.sortBy + "&direction=" + sort.direction;
    if (genre.length > 0) {
        url += "&genres=" + genre;
    }
    if (tag.length > 0) {
        url += "&tags=" + tag;
    }
    const {data, error} = useSWR(url, fetcher)// {initialData: searchProps.movies})
    ///const {data, error} = useSWR(`${API_URL_SEARCH}${searchProps.term}?page=${page}&limit=${limit}&sortBy=${sort.sortBy}&direction=${sort.direction}`, fetcher);

    if(error) return <div>failed to load</div>
    if(!data) return <div>loading...</div>

    function processSort(value: number) {
        switch (value) {
            case 0:
                setSort({sortBy: SortBy.ID, direction: Direction.DESC});
                break;
            case 1:
                setSort({sortBy: SortBy.YEAR, direction: Direction.DESC});
                break;
            case 2:
                setSort({sortBy: SortBy.YEAR, direction: Direction.ASC});
                break;
            case 3:
                setSort({sortBy: SortBy.TITLE, direction: Direction.DESC});
                break;
            case 4:
                setSort({sortBy: SortBy.TITLE, direction: Direction.ASC});
                break;
            default:
                setSort({sortBy: SortBy.ID, direction: Direction.DESC});
        }
    }

    function processLimit(limit: number) {
        switch (limit) {
            case 0:
                setLimit(10);
                break;
            case 1:
                setLimit(15);
                break;
            case 2:
                setLimit(20);
                break;
            default:
                setLimit(25);

        }
    }

    return (
        <Box className="container__result"
            sx={{
             backgroundColor: theme.palette.background.default,
            }}>

            <Box className="container-fluid">
                <Box className="row flex-row">
                    <Box className="col">

                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel htmlFor="grouped-select">Sort By</InputLabel>
                            <Select
                                defaultValue="" id="sort-select" label="Sort By"
                                onChange={(event) => {
                                    processSort(Number(event.target.value));
                                } }
                            >
                                <MenuItem value={0}>Relevance</MenuItem>
                                <MenuItem value={1}>Year: Newest to Oldest</MenuItem>
                                <MenuItem value={2}>Year: Oldest to Newest</MenuItem>
                                <MenuItem value={3}>Title: Z - A</MenuItem>
                                <MenuItem value={4}>Title: A - Z</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="grouped-select">Limit By</InputLabel>
                            <Select defaultValue="" id="limit-select" label="Limit By"
                                    onChange={(event) => {
                                        processLimit(Number(event.target.value));
                                    } }
                            >
                                <MenuItem value={1}>10</MenuItem>
                                <MenuItem value={2}>15</MenuItem>
                                <MenuItem value={3}>20</MenuItem>
                                <MenuItem value={4}>25</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="col" style={{display:'flex', justifyContent:"right", alignItems:"center"}}>
                        <Pagination color="primary" count={data.totalPages} page={page} onChange={(event, value) => setPage(value)} />
                    </div>

                </Box>
            </Box>



            <Box className="container-fluid">

                <Box className = "row flex-row">

                    {data.content.map((movie: Movie) => (

                        <Box key={movie.id} className="col">

                            <MovieCard style={CardStyle.EXPANDED} movie={movie}></MovieCard>

                        </Box>

                    ))}

                </Box>

            </Box>

        </Box>
    );
}

//https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx






/*
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}
export const getStaticProps: GetStaticProps<QParams> = async ({params}) => {
    console.log(params);
    const slug = params
    if (!slug) {
        return {
            notFound: true,
        }
    }
    const res = await fetch(API_URL_SEARCH + slug.term)
    const data = await res.json()

    return {
        props: {
            slug,
        }
    }
}

export const getServersideProps: GetServerSideProps = async (context) => {
    console.log("getServersideProps");
    const page = context.query.hasOwnProperty('page') ? parseInt(context.query.page, 10) : 1;

    console.info(context.params.query, page, start);


    const { slug } = context.query;
    return {
        props: {
            term: slug
        }
    }
}

 */

export interface SearchProps {
    term: string
    page: number
    limit: number
    sortBy: SortBy
    direction: Direction
    genres: String
    tags: String
}
export const getServerSideProps: GetServerSideProps = async (context) => {


    const page = context.query.hasOwnProperty('page') ? parseInt(context.query.page as string, 10) : 0;
    const limit = context.query.hasOwnProperty('limit') ? parseInt(context.query.limit as string, 10) : 10;
    const sortBy = context.query.hasOwnProperty('sortBy') ? context.query.sortBy : SortBy.RATING;
    const genres = context.query.hasOwnProperty('genres') ? context.query.genres : "";
    const tags = context.query.hasOwnProperty('tags') ? context.query.tags : "";


    let object = {
        term: context.query.term,
        page: page,
        limit: limit,
        sortBy: sortBy,
        direction: Direction.DESC,
        genres: genres,
        tags: tags
    } as SearchProps;

    return {
        props: {
            searchProps: object,
        }
    }
}


export default SearchPage;


SearchPage.getLayout = (page: any) => (
    <Layout>
        {page}
    </Layout>
);