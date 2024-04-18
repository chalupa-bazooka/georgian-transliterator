// utilities
import { Outlet } from "react-router-dom"
import { useState, useEffect, createContext } from "react"

// components
import HeaderKebabMenuDesktop from "./HeaderKebabMenuDesktop.jsx"
import HeaderKebabMenuMobile from "./HeaderKebabMenuMobile.jsx"
import HeaderLaguageMenuDesktop from "./HeaderLanguageMenuDesktop.jsx"
import HeaderLanguageMenuMobile from "./HeaderLanguageMenuMobile.jsx"
import HeaderLetteringAndLogo from "./HeaderLetteringAndLogo.jsx"

export const LayoutContext = createContext()

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false) // this state controls the kebab menu, whether it's opened or not
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false) // this state controls the language menu, whether it's opened or not
    const [language, setLanguage] = useState() // this state controls the UI's language

    // this effect saves language preferences in the local storage
    useEffect(() => {
        if (localStorage.getItem("language")) {
            setLanguage(localStorage.getItem("language"))
        } else {
            setLanguage("ENG")
        }
    }, [])

    const [vpWidth, setVPWidth] = useState(window.innerWidth) // this state controls width of the viewport
    // this effect updates the vpWidth state whenever the viewport's width changes
    useEffect(() => {
        function handleResize() {
            setVPWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    })

    // these are states & functions shared with components via LayoutContext
    const layoutContextContents = {
        language,
        languageMenuOpen,
        menuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen,
    }

    return (
        <>
            <div className="Header">
                <LayoutContext.Provider value={layoutContextContents}>
                    <HeaderLetteringAndLogo />
                    {/* <div>vpWidth = {vpWidth}</div> */}
                    <div className="Header__RightBox">

                        {
                            vpWidth > 1919
                                ?
                                <>
                                    <HeaderLaguageMenuDesktop />
                                    <HeaderKebabMenuDesktop />
                                </>
                                :
                                <>
                                    <HeaderLanguageMenuMobile />
                                    <HeaderKebabMenuMobile />
                                </>
                        }
                    </div>
                </LayoutContext.Provider >
            </div >

            <Outlet context={language} />
        </>
    )
}