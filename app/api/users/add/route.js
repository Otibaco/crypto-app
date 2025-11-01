import { NextResponse } from 'next/server'
import { createUserIfNotExists } from '../../../../controllers/userController'

export async function POST(req) {
  try {
    const body = await req.json()
    const { walletAddress } = body || {}
    if (!walletAddress) return NextResponse.json({ error: 'walletAddress required' }, { status: 400 })
    const user = await createUserIfNotExists(walletAddress)
    return NextResponse.json({ success: true, user })
  } catch (err) {
    console.error('API /api/users/add error', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
