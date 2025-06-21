"use client"
import { SessionProvider } from "next-auth/react"
import dynamic from "next/dynamic";

// 1️⃣  Dynamically import *only* the named export we need
const ImageKitProvider = dynamic(
  () =>
    import("@imagekit/next").then((mod) => mod.ImageKitProvider),
  { ssr: false }          // makes sure it never runs in SSR / RSC
);
const urlEndPoint=process.env.NEXT_PUBLIC_URL_ENDPOINT!
export default function Provider({children}:{children:React.ReactNode}){
    return <SessionProvider refetchInterval={5*60}>
        <ImageKitProvider urlEndpoint={urlEndPoint}>
{children}
        </ImageKitProvider>
        </SessionProvider>
}