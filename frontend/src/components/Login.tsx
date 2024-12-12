"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useUser } from "@/context/UserContext"
const styles = {
  wrapper:
    "p-12 shadow-xl rounded-md w-max flex flex-col items-center m-auto my-20 ",
  heading:
    "text-3xl tracking-wider font-custom font-medium text-primary text-center hover:animate-pulse",
  form: "text-primary",
  label: "font-medium  cursor-pointer",
  inputGroup: " flex flex-col",
  input: "border p-2 rounded-md outline-none my-2",
  error: "text-red-800 text-sm ",
  line: "h-[1px] flex-grow bg-black",
  btn: "py-2 text-white w-full rounded-md font-bold tracking-wide  ",
  description: "text-gray-400 tracking-widest italic  text-sm mt-1",
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useUser()
  const [error, setError] = useState("")
  const router = useRouter()
  const handleLogin = async () => {
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/users/login", {
        email: username,
        password,
      })
      setUser(result.data.user)
      router.push("/dashboard")
    } catch (err: AxiosError | any) {
      setError(err.response.data.message)
    }
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className="mb-5">
          <h3 className={styles.heading}>Log In</h3>
          <p className={styles.description}>Welcome back to FlashC</p>
        </div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <p className={styles.error}>Username Error</p> */}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={styles.error}>{error}</p>
          </div>
          <div className="space-y-4 mt-2">
            <button
              className={`${styles.btn} bg-blue-500`}
              onClick={handleLogin}
              type="submit"
            >
              Log in
            </button>
            <div className="flex items-center">
              <div className={styles.line}></div>
              <div className="mx-2 uppercase font-bold text-sm">or</div>
              <div className={styles.line}></div>
            </div>
            <button
              className={`${styles.btn} bg-primary`}
              type="button"
              onClick={() => router.push("signup")}
            >
              Sign Up
            </button>
            <button>hello</button>
          </div>
        </form>
      </div>
    </>
  )
}
