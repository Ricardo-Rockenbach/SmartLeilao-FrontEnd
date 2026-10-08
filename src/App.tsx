import CardSmartphone from "./components/CardSmartphone"
import { InputPesquisa } from "./components/InputPesquisa"
import type { Smartphone } from "./utils/SmartphoneType"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
    const [todosSmartphones, setTodosSmartphones] = useState<Smartphone[]>([])
    const [smartphones, setSmartphones] = useState<Smartphone[]>([])

    const { logaCliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/smartphones`)
            const dados = await response.json()

            setTodosSmartphones(dados)

            // Ao entrar na página, mostra apenas os destaques
            // que não possuem leilão encerrado
            const destaques = dados.filter((smartphone: Smartphone) => {
                const possuiLeilaoEncerrado =
                    smartphone.leiloes?.some(
                        (leilao) => leilao.status === "ENCERRADO"
                    )

                return smartphone.destaque && !possuiLeilaoEncerrado
            })

            setSmartphones(destaques)
        }

        buscaDados()

        async function buscaCliente(id: string) {
            const response = await fetch(`${apiUrl}/clientes/${id}`)
            const dados = await response.json()

            logaCliente(dados)
        }

        if (localStorage.getItem("clienteKey")) {
            const idCliente = localStorage.getItem("clienteKey")
            buscaCliente(idCliente as string)
        }
    }, [logaCliente])

    function mostrarDestaques() {
        const destaques = todosSmartphones.filter((smartphone) => {
            const possuiLeilaoEncerrado =
                smartphone.leiloes?.some(
                    (leilao) => leilao.status === "ENCERRADO"
                )

            return smartphone.destaque && !possuiLeilaoEncerrado
        })

        setSmartphones(destaques)
    }

    function mostrarTodos() {
        const disponiveis = todosSmartphones.filter((smartphone) => {
            const possuiLeilaoEncerrado =
                smartphone.leiloes?.some(
                    (leilao) => leilao.status === "ENCERRADO"
                )

            return !possuiLeilaoEncerrado
        })

        setSmartphones(disponiveis)
    }

    function mostrarEncerrados() {
        const encerrados = todosSmartphones.filter((smartphone) => {
            return smartphone.leiloes?.some(
                (leilao) => leilao.status === "ENCERRADO"
            )
        })

        setSmartphones(encerrados)
    }

    const listaSmartphones = smartphones.map((smartphone) => (
        <CardSmartphone
            smartphone={smartphone}
            key={smartphone.id}
        />
    ))

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* Área de pesquisa */}
            <section className="max-w-6xl mx-auto px-4 pt-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Encontre seu próximo
                        <span className="block text-blue-600 dark:text-blue-500">
                            smartphone
                        </span>
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        Participe dos leilões e dê seu lance pelo smartphone que deseja.
                    </p>

                </div>

                <InputPesquisa
                    todosSmartphones={todosSmartphones}
                    setSmartphones={setSmartphones}
                />

                {/* Filtros */}
                <div className="flex justify-center gap-3 mt-4 flex-wrap">

                    <button
                        type="button"
                        onClick={mostrarDestaques}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                    >
                        Ver destaques
                    </button>

                    <button
                        type="button"
                        onClick={mostrarTodos}
                        className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium transition"
                    >
                        Ver todos
                    </button>

                    <button
                        type="button"
                        onClick={mostrarEncerrados}
                        className="px-5 py-2.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-sm font-medium transition"
                    >
                        Leilões encerrados
                    </button>

                </div>

            </section>

            {/* Smartphones */}
            <section className="max-w-7xl mx-auto px-4 py-10">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Smartphones em destaque
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Confira os aparelhos disponíveis nos leilões.
                        </p>
                    </div>

                    <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                        {smartphones.length} disponíveis
                    </span>

                </div>

                {smartphones.length > 0 ? (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listaSmartphones}
                    </div>

                ) : (

                    <div className="text-center py-16">

                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Nenhum smartphone encontrado.
                        </p>

                    </div>

                )}

            </section>

        </main>
    )
}