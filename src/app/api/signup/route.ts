import { NextResponse } from 'next/server'
import { userStorage } from '@/utils/userStorage'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json()

    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (userStorage.findUserByEmail(email)) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    const newUser = {
      id: uuidv4(),
      name,
      username,
      email,
      password, // In a real app, you should hash the password
    }

    userStorage.addUser(newUser)

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error in signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

