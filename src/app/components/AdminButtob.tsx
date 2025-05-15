"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShieldUser } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleRoute = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <div className="fixed right-5 bottom-7 transform scale-50 hover:scale-100 transition duration-200 ease-in-out  ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer flex flex-col gap-1 items-center font-poppins rounded-full w-[70px] h-[70px] text-sm  bg-[#FCF8F3] p-1 justify-center shadow-inner">
          <ShieldUser size={30} /> Admin
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-[30px] text-[#B88E2F] font-poppins">Admin functions</DialogTitle>

              <ul>
                <li
                  onClick={() => handleRoute("/blog-upload-page")}
                  className="text-base font-medium text-[#000000] font-poppins my-1 hover:text-[#B88E2F] cursor-pointer"
                >
                  Add Blog
                </li>
                <li
                  onClick={() => handleRoute("/furniture-upload-page")}
                  className="text-base font-medium text-[#000000] font-poppins my-1 hover:text-[#B88E2F] cursor-pointer"
                >
                  Add Furniture
                </li>
              </ul>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
