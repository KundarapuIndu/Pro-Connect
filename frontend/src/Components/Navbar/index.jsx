import React from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";


export default function NavBarComponent() {
    const router = useRouter();
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1 style={{ cursor: "pointer" }} onClick={() => { router.push("/") }}>Pro Connect</h1>

                <div className={styles.navBarOptionContainer}>



                    {/* Show user info only when user IS logged in AND profile is fetched */}
                    {authState.profileFetched &&
                        <div>
                            <div style={{ display: "flex", gap: "1.2rem" }}>
                                {/* <p>Hey, {authState.user?.userId?.name}</p> */}
                                <p onClick={() => {
                                    router.push("/profile")
                                }} style={{ fontWeight: "bold", cursor: "pointer" }}>Profile</p>

                                <p
                                    onClick={() => {
                                        dispatch(reset());                 // 1️⃣ reset redux FIRST
                                        localStorage.removeItem("token");  // 2️⃣ remove token
                                        router.replace("/login");          // 3️⃣ replace, not push
                                    }}
                                    style={{ fontWeight: "bold", cursor: "pointer" }}
                                >
                                    Log Out
                                </p>


                            </div>
                        </div>
                    }

                    {/* Show "Be a part" only when user is NOT logged in */}
                    {!authState.profileFetched &&
                        <div onClick={() => {
                            router.push("/login")

                        }} className={styles.buttonJoin}>
                            <p>Be a part</p>
                        </div>
                    }

                </div>
            </nav>
        </div>
    )
}