import { NextResponse } from 'next/server'
import { userStorage } from '@/utils/userStorage'
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const user = userStorage.findUserByEmail(email)

    if (!user || user.password !== password) { // In a real app, you should compare hashed passwords
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    const response = NextResponse.json({ message: 'Signed in successfully' }, { status: 200 })
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    return response
  } catch (error) {
    console.error('Error in signin:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

