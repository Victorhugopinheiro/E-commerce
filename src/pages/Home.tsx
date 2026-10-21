import Categories from "@/components/Categories"
import BestSallers from "../components/BestSallers"
import GarantedServices from "../components/GarantedServices"
import Hero from "../components/Hero"
import LastestsCollections from "../components/LastestsCollections"
import SendEmail from "../components/SendEmail"


function Home() {
    return (
        <>
            <Hero />
            <div>
                <Categories />
                <LastestsCollections />
                <BestSallers />
                <GarantedServices />
                <SendEmail />
            </div>
        </>
    )
}

export default Home