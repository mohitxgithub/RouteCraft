import { NextResponse } from 'next/server'
import { userStorage } from '@/utils/userStorage'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(req: Request) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string }
    const user = userStorage.findUserById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error in user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

