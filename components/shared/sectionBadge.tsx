import React from 'react'

export default function SectionBadge({ title }: { title: string }) {
   return (
      <span className="inline-block px-4 py-2 bg-[var(--color-accent)] text-[var(--color-primary)] text-sm font-semibold rounded-full mb-4">
         {title}
      </span>
   )
}
