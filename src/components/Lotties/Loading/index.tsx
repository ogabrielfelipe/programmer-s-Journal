import { Player } from "@lottiefiles/react-lottie-player";
import Loading from "../../../../public/loading.json"
import styles from "./styles.module.scss" 


function LottieLoading(){
    return (
        <>
            <Player 
                src={Loading} 
                loop 
                autoplay 
                speed={1.5} 
                className={styles.loading}
            />
        </>
    )
}

export { LottieLoading }