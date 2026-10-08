import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { useAdminStore } from "./context/AdminContext"
import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    email: string
    senha: string
}

export default function AdminLogin() {

    const {
        register,
        handleSubmit,
        setFocus
    } = useForm<Inputs>()

    const navigate = useNavigate()
    const { logaAdmin } = useAdminStore()

    useEffect(() => {
        setFocus("email")
    }, [setFocus])

    async function verificaLogin(data: Inputs) {

        try {

            const response = await fetch(`${apiUrl}/admins/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    senha: data.senha
                })
            })

            if (response.status === 200) {

                const admin = await response.json()

                logaAdmin(admin)

                navigate("/admin", {
                    replace: true
                })

            } else if (response.status === 400) {

                toast.error("Erro... Login ou senha incorretos")

            } else {

                toast.error("Erro ao realizar login")

            }

        } catch (error) {

            toast.error("Não foi possível conectar ao servidor")

        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">

            <div className="w-full max-w-md">

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">

                    <div className="text-center mb-8">

                        <div className="flex items-center justify-center mb-4">

                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">

                                <span className="text-3xl">
                                    📱
                                </span>

                            </div>

                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            SmartLeilão
                        </h1>

                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Acesso administrativo
                        </p>

                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit(verificaLogin)}
                    >

                        <div>

                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                E-mail
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="admin@smartleilao.com"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("email")}
                                required
                            />

                        </div>

                        <div>

                            <label
                                htmlFor="senha"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Senha
                            </label>

                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("senha")}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Entrar no painel
                        </button>

                    </form>

                </div>

            </div>

            <Toaster
                richColors
                position="top-right"
            />

        </main>
    )
}