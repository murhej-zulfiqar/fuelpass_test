import {Grid} from "@mui/material";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main style={{minHeight: "100vh"}}>
            <Grid container justifyContent="center" alignItems="center" width="100%" height="100vh" sx={{
                backgroundImage: "url(/images/oil-company.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
                height: "100vh",
            }}>
                {children}
            </Grid>
        </main>

    );
}