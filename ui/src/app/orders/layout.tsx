import Header from "@/components/molecules/Header";
import Container from "@mui/material/Container";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            <Container sx={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}>
                {children}
            </Container>
        </main>

    );
}
