'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const DynamicTravelTips = dynamic(() => import('./TravelTips'), {
  loading: () => <div>Loading Travel Tips...</div>
})

export default function DynamicTravelTipsWrapper() {
  return (
    <Suspense fallback={<div>Loading Travel Tips...</div>}>
      <DynamicTravelTips />
    </Suspense>
  )
}

