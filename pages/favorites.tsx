import {signInWithEmailAndPassword} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, axiosInstance} from "../utils/firebase";
import Button from "@mui/material/Button";
import {Layout} from "../components/Layout";
import ScrollPagination from "../components/ScrollPagination";
import {CardStyle} from "../components/CardStyle";
import {ContentType} from "../components/ContentType";
import {ViewType} from "../components/ViewType";

const login = () => {
    signInWithEmailAndPassword(auth, 'test@test.com', 'password');
};


const BOOKMARKS = 'http://localhost:8080/bookmark/?sortBy=created';

export default function FavoritePage() {
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

    if (user) {
         user.getIdToken().then((token) => {
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return (
                <>
                    <ScrollPagination path={BOOKMARKS} style={CardStyle.EXPANDED} type={ContentType.BOOKMARK} view={ViewType.VERTICAL}></ScrollPagination>
                </>

            );
        });
    }
    return <Button onClick={login}>Log in</Button>;
};

FavoritePage.getLayout = (page: any) => (
    <Layout>
        {page}
    </Layout>
);