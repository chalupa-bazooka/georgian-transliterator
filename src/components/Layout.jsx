import { Link, NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import { MdMenu } from "react-icons/md";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
    const [language, setLanguage] = useState("ENG")

    return (
        <>
            <div className="Header">
                <Link
                    to="/"
                    className="Header__HomeLink"
                    style={{
                        textDecoration: "none"
                    }}
                >
                    <div className="Header__HomeDiv">
                        <div className="Header__Logo">
                            <span className="Header__Logo--tlat">t</span>

                            <span className="Header__Logo--slash">⃕</span>
                            <span className="Header__Logo--tgeo">თ</span>
                        </div>
                        <div className="Header__Title">Georgian Transliterator </div>
                    </div>
                </Link>



                {/* LANGUAGE MENU */}
                <div className="Header__Languages">
                    <button
                        className="Header__Languagues--Button"
                        onClick={() => {
                            setLanguageMenuOpen(prevOpen => !prevOpen)
                            setMenuOpen(false)
                        }}
                    >
                        {
                            language === "RUS"
                                ? "RUS"
                                : "ENG"
                        }
                    </button>
                    {
                        languageMenuOpen &&
                        <ul className="Header__Languages--Menu">
                            <li
                                className={language === "ENG" ? "Header__Languages--MenuItemActive" : ""}
                                onClick={() => {
                                    setLanguage("ENG")
                                    setLanguageMenuOpen(false)
                                }}
                            >
                                {
                                    language === "RUS"
                                        ? "Английский"
                                        : "English"
                                }
                            </li>
                            <li
                                className={language === "RUS" ? "Header__Languages--MenuItemActive" : ""}
                                onClick={() => {
                                    setLanguage("RUS")
                                    setLanguageMenuOpen(false)
                                }}
                            >
                                {
                                    language === "RUS"
                                        ? "Русский"
                                        : "Russian"
                                }
                            </li>
                        </ul>
                    }
                </div>



                {/* KEBAB MENU */}
                <div className="Header__KebabDiv">
                    <button
                        className="Header__Kebab"
                        onClick={() => {
                            setMenuOpen(prevMenu => !prevMenu)
                            setLanguageMenuOpen(false)
                        }}
                    >
                        <MdMenu />
                    </button>

                    {
                        menuOpen &&
                        <ul className="Header__Kebab--Menu">
                            {/* home */}
                            <li><NavLink
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                            >
                                {
                                    language === "RUS"
                                        ? "Главная"
                                        : "Home"
                                }
                            </NavLink></li>

                            {/* knowledge */}
                            <li><NavLink
                                to="/knowledge"
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                            >
                                {
                                    language === "RUS"
                                        ? "Полезно знать"
                                        : "Knowledge"
                                }
                            </NavLink></li>

                            {/* contacts */}
                            <li><NavLink
                                to="/contacts"
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                            >
                                {
                                    language === "RUS"
                                        ? "Контакты"
                                        : "Contacts"
                                }
                            </NavLink></li>
                        </ul>
                    }
                </div>


            </div >

            <Outlet context={language} />
        </>
    )
}