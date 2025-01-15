import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface AvatarSelectorProps {
  gender: string
  onSelect: (avatar: string) => void
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ gender, onSelect }) => {
  const [avatars, setAvatars] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const generateAvatars = () => {
      const newAvatars = Array.from({ length: 4 }, (_, i) => 
        `https://api.dicebear.com/6.x/${gender.toLowerCase() === 'male' ? 'male' : 'female'}/svg?seed=${i}`
      )
      setAvatars(newAvatars)
    }

    generateAvatars()
  }, [gender])

  const handleSelect = (avatar: string) => {
    setSelected(avatar)
    onSelect(avatar)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {avatars.map((avatar, index) => (
        <button
          key={index}
          onClick={() => handleSelect(avatar)}
          className={`p-2 border-2 ${
            selected === avatar ? 'border-primary-500' : 'border-transparent'
          } hover:border-primary-500 rounded-lg transition duration-300`}
        >
          <Image src={avatar || "/placeholder.svg"} alt={`Avatar ${index + 1}`} width={100} height={100} className="rounded-full" />
        </button>
      ))}
    </div>
  )
}

export default AvatarSelector

