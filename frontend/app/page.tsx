"use client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Home() {
  return (
    <>
      <div className='text-6xl flex-col gap-4 h-screen align-middle flex justify-center items-center '>
        <div>  welcome to Portfolio builder</div>
        <div className="flex gap-3">
          <Link className="btn-primary bg-black rounded-lg block text-white p-4 text-lg" href="/register">
            Get Started
          </Link>
          <Link className="btn-primary bg-black rounded-lg block text-white p-4 text-lg" href="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  )
}
