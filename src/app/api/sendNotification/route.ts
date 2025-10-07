import { adminMessaging } from "@/src/firebase/server"

export async function POST(request: Request) {
  try {
    const { token, title, body } = await request.json()
    await adminMessaging.send({
      token, notification: { title, body }
    })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error: any) {
    console.log(error)

    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}