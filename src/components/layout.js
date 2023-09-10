import {Providers} from "../app/providers";

export default function Layout({ children }) {
    return (
        <>
            <Providers>
                <main>{children}</main>
            </Providers>
        </>
    )
}