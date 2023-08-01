import { useRouter } from "next/navigation"
import Modal from "./Modal"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal"
import { useEffect } from "react"

function AuthModal() {
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const { session } = useSessionContext()
	const { onClose, isOpen } = useAuthModal()

	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	useEffect(() => {
		if (session) {
			router.refresh()
			onClose()
		}
	}, [session, router, onClose])

	return (
		<Modal
			title="Welcome back"
			description="Login to you account"
			isOpen={isOpen}
			onChange={onChange}
		>
			<Auth
				supabaseClient={supabaseClient}
				providers={["github"]}
				magicLink
				theme="dark"
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: "#404040",
								brandAccent: "#22c55e",
							},
						},
					},
				}}
			/>
		</Modal>
	)
}

export default AuthModal
