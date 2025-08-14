import BestSallers from "../components/BestSallers"
import GarantedServices from "../components/GarantedServices"
import Hero from "../components/Hero"
import LastestsCollections from "../components/LastestsCollections"
import SendEmail from "../components/SendEmail"


function Home() {
    return (
        <>
        <Hero/>
        <LastestsCollections/>
        <BestSallers/>
        <GarantedServices/>
        <SendEmail/>
        </>
    )
}

export default Home