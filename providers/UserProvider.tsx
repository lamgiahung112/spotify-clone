"use client"

import { UserContextProvider } from "@/hooks/useUser"
import { ReactNode } from "react"

interface UserProviderProps {
	children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
	return <UserContextProvider>{children}</UserContextProvider>
}

export default UserProvider
