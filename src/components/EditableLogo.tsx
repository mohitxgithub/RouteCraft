'use client'

import { useState } from 'react'

interface EditableLogoProps {
  color: string
  setColor: (color: string) => void
}

export default function EditableLogo({ color, setColor }: EditableLogoProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      {/* Replace SVG with an image */}
      <img
        src="/image/routecraftlogo.png" // Update this to the correct path of your PNG
        alt="Custom Logo"
        onClick={() => setIsEditing(true)}
        className="cursor-pointer w-10 h-10" // Adjust size as needed
        
      />
      {isEditing && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md p-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full"
          />
          <button
            onClick={() => setIsEditing(false)}
            className="mt-2 w-full bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
