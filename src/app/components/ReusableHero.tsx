import { ChevronRight } from "lucide-react"
import Link from "next/link"





interface ReusableHeroProps{
    pageName: string
}


export default function ReusableHero({pageName} : ReusableHeroProps) {
    return (
        <section className="w-full flex flex-col items-center justify-center gap-6 h-[316px] bg-[url('/backgrounds/resuable-hero-background.svg')] "  >
            <h1 className=" text-5xl font-medium text-[#000000] " >Shop</h1>
            <div className="flex items-center justify-center gap-2 text-base font-medium text-[#000000] " >
                <Link href={"/"}> <h2>Home</h2></Link>
                <ChevronRight/>
                <Link href={"#"}>  <h2>{pageName}</h2> </Link>
            </div>
        </section>
    )
}