import { useEffect, useState } from "react" 

import { Progress } from "@/components/ui/progress"

export function Loading() {
  const [progress, setProgress] =  useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Progress value={progress} className="w-[60%]" />
      <div className="text-white text-3xl">Waiting to other user to join...</div>
    </div>
  )
}
