import { useEffect, useRef, useState } from "react"
import { assets } from "../assets/assets"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

// Add more full-size banner images here to get more slides
const slides = [
    { src: assets.hero_img, alt: "Recem chegados" },
    { src: assets.hero_img, alt: "Recem chegados" },
    { src: assets.hero_img, alt: "Recem chegados" },
]

function Hero() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const autoplay = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
    )

    useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        onSelect()
        api.on("select", onSelect)
        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    return (
        <Carousel
            setApi={setApi}
            opts={{ loop: slides.length > 1 }}
            plugins={slides.length > 1 ? [autoplay.current] : []}
            className="relative left-1/2 right-1/2 -mx-[50.375vw] w-screen"
        >
            <CarouselContent className="ml-0">
                {slides.map((slide, index) => (
                    <CarouselItem key={index} className="pl-0">
                        <img
                            className="w-full h-[60vh] min-h-72 max-h-[40rem] object-cover select-none"
                            src={slide.src}
                            alt={slide.alt}
                            draggable={false}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {slides.length > 1 && (
                <>
                    <CarouselPrevious className="left-4 hidden sm:inline-flex" />
                    <CarouselNext className="right-4 hidden sm:inline-flex" />

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ir para o slide ${index + 1}`}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-1.5 rounded-full transition-all ${index === current ? "w-6 bg-white" : "w-3 bg-white/50"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </Carousel>
    )
}

export default Hero