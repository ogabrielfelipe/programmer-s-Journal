import { LottieLoading } from "../Lotties/Loading"
import styles from "./styles.module.scss"


function Loading(){
    return (
        <>
            <div className={styles.containerLoading}>
                <div className={styles.content}>
                    <LottieLoading/> 
                </div>
            </div>
        </>
    )
}

export { Loading }