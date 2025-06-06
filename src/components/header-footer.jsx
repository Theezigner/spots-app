export function Header() {
    return (
        <>
            <header className="top-0 left-0 w-screen h-[46px] bg-white items-center flex justify-center relative left-1/2 right-1/2 -translate-x-1/2">
                <img src="/public/Logo.png" alt="Spots" />
            </header>
        </>
    )
}

export function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full h-[136px]  items-center flex justify-center">
            <p className="text-gray-500">2024 © Spots</p>
        </footer>
    )
}