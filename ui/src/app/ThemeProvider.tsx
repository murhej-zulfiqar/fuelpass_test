'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

interface Props {
    children: ReactNode;
}
// A wrapper for applying the theme by material UI
export default function Provider({ children }: Props) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}