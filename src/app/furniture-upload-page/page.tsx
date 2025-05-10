import FurnitureUploadForm from "app/components/FurnitureUploadForm";




export default function Page() {




    return (
        <div  className=" w-full min-h-[50vh] flex items-center flex-col gap-3.5 py-6 px-[6%] font-poppins bg-[#FAF3EA]  " >



<h1  className=" font-bold text-[40px] text-[#B88E2F] " >Upload Furniture</h1>


<FurnitureUploadForm/>




        </div>
    )
}