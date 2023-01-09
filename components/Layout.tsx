
import {Fragment, useState} from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigationBar from "./NavigationBar";

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',

    [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft: 0,
        paddingTop: 0,
    }
}));

export const Layout = (props: { children: any; }) => {
    const { children } = props;


    return (
        <Fragment>
            <NavigationBar />

            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
        </Fragment>
    );
};
