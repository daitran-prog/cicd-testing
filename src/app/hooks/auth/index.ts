import { messaging } from "@/src/firebase/config"
import { getToken, onMessage } from "firebase/messaging"

export const usePushNotification = (vapidKey: string, onForegroundMessage: any) => {
    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return null

        const token = await getToken(messaging!, {  })
        return token
    }


    if (messaging) {
        onMessage(messaging, (payload) => {
            console.log("message received.", payload)
            onForegroundMessage(payload)
        })
    }

    return { requestPermission }
}