'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export function BrochureDownloadButton({ url }: { url: string }) {
   const [isDownloading, setIsDownloading] = useState(false)

   const handleDownload = async () => {
      setIsDownloading(true)
      try {
         const response = await fetch(url)
         const blob = await response.blob()
         const objectUrl = URL.createObjectURL(blob)
         const a = document.createElement('a')
         a.href = objectUrl
         a.download = url.split('/').pop() || 'brochure'
         a.click()
         URL.revokeObjectURL(objectUrl)
      } catch {
         window.open(url, '_blank')
      } finally {
         setIsDownloading(false)
      }
   }

   return (
      <button
         onClick={handleDownload}
         disabled={isDownloading}
         className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-60"
      >
         <Download className="w-4 h-4" />
         {isDownloading ? 'Downloading...' : 'Download Brochure'}
      </button>
   )
}
