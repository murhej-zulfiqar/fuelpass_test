import Header from "@/components/molecules/Header";
import {Grid} from "@mui/material";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            <Grid container justifyContent="center" sx={{ minHeight: "calc(100vh - 64px)", marginTop: "64px", padding: "32px" }}>
                {children}
            </Grid>
        </main>

    );
}
