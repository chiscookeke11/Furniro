import Link from "next/link"





export default function Footer() {


    const links = [
        {
            label: "Home",
            url: "/",
        },
        {
            label: "Shop",
            url: "/",
        },
        {
            label: "About",
            url: "/",
        },
        {
            label: "Contact",
            url: "/",
        },
    ]


    const help = [
        {
            label: "Payment Options",
            url: "/",
        },
        {
            label: "Returns",
            url: "/",
        },
        {
            label: "Privacy Policies",
            url: "/",
        },
    ]



    return (
        <footer className="w-full flex flex-col items-start justify-center gap-10 px-[5%] py-15  " >

<div className="w-full flex flex-col md:flex-row items-start gap-10 justify-between" >

    <div className="flex flex-col gap-16 min-w-[285px]  "  >
        <h1 className="text-[#000000] font-bold text-2xl " >Funiro.</h1>
        <p className=" text-[#9F9F9F] text-base font-normal " >400 University Drive Suite 200 Coral<br/> Gables,<br/>
        FL 33134 USA</p>
    </div>

    <div className="flex flex-col gap-16 min-w-[230px] " >
        <h2 className=" text-base font-semibold text-[#9F9F9F] " > Links </h2>
        <ul className=" w-full flex flex-col items-start justify-center gap-14 " >
           {links.map((link, index) => (
            <Link key={index} href={link.url}>
                <li  className=" text-base font-medium text-[#000000] ">{link.label} </li>
                 </Link>
           ))}
        </ul>
    </div>

    <div className="flex flex-col gap-16 min-w-[240px]" >
        <h2 className=" text-base font-semibold text-[#9F9F9F] " > Help </h2>
        <ul  className=" w-full flex flex-col items-start justify-center gap-14 ">
           {help.map((link, index) => (
            <Link key={index} href={link.url}>
                <li  className=" text-base font-medium text-[#000000] ">{link.label} </li>
                 </Link>
           ))}
        </ul>
    </div>


    <div className="flex flex-col gap-16 min-w-[286px]" >
        <h2 className=" text-base font-semibold text-[#9F9F9F] " > Newsletter </h2>

        <div className=" w-full flex items-center gap-3 " >
            <input type="text" placeholder="Enter Your Email Address" className="text-sm font-normal text-[#9F9F9F] border-b-[1px] border-[#000000] py-1 outline-none pr-5 " />
            <button className="text-[#000000] text-sm font-medium cursor-pointer  border-b-[1px] border-[#000000] py-1 outline-none " >SUBSCRIBE</button>
        </div>


    </div>





</div>

            <div className="w-full  py-10 border-t-[1px] border-[#D9D9D9] " >
                <small className="text-[#000000] font-normal text-base " >2023 furino. All rights reverved</small>
            </div>
        </footer>
    )
}