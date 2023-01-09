import {LoginForm} from "../components/LoginForm";
import Card from "@mui/material/Card";


export default function LoginPage() {
    return (
        <div className="login-page"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    }}
        >

            <div style={{width:"400", height:"400"}}>
                <LoginForm/>
            </div>
        </div>
    );
}