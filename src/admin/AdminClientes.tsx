import { useEffect, useState } from "react"
import { FiUsers } from "react-icons/fi"

import { useAdminStore } from "./context/AdminContext"
import ItemCliente from "./components/ItemCliente"

type Cliente = {
    id: string
    nome: string
    email: string
    cidade: string
    createdAt: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminClientes() {

    const { admin } = useAdminStore()

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {

        async function getClientes() {

            try {

                const response = await fetch(`${apiUrl}/clientes`, {
                    headers: {
                        Authorization: `Bearer ${admin?.token || ""}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Erro ao buscar clientes")
                }

                const dados = await response.json()

                setClientes(dados)

            } catch (error) {

                console.error("Erro ao buscar clientes:", error)

            } finally {

                setCarregando(false)

            }
        }

        getClientes()

    }, [admin])


    return (

        <main className="min-h-screen pt-20 bg-gray-100 dark:bg-gray-950">

            <div className="p-6 sm:p-8 lg:p-10 max-w-[1600px] mx-auto">

                {/* CABEÇALHO */}

                <div className="mb-8">

                    <div className="flex items-center gap-4">

                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">

                            <FiUsers className="text-2xl" />

                        </div>

                        <div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">

                                Clientes

                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                Gerencie os clientes cadastrados no SmartLeilão.

                            </p>

                        </div>

                    </div>

                </div>


                {/* RESUMO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">

                                    Total de clientes

                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">

                                    {clientes.length}

                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">

                                <FiUsers className="text-xl" />

                            </div>

                        </div>

                    </div>

                </div>


                {/* CARD DA TABELA */}

                <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">

                    {/* CABEÇALHO DA TABELA */}

                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                            Clientes cadastrados

                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                            Visualização dos usuários registrados no sistema.

                        </p>

                    </div>


                    {/* CARREGANDO */}

                    {carregando && (

                        <div className="flex flex-col items-center justify-center py-20">

                            <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />

                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">

                                Carregando clientes...

                            </p>

                        </div>

                    )}


                    {/* NENHUM CLIENTE */}

                    {!carregando && clientes.length === 0 && (

                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

                            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-4">

                                <FiUsers className="text-2xl" />

                            </div>

                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                                Nenhum cliente encontrado

                            </h3>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                Ainda não existem clientes cadastrados.

                            </p>

                        </div>

                    )}


                    {/* TABELA */}

                    {!carregando && clientes.length > 0 && (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                <thead className="bg-gray-50 dark:bg-gray-800/60">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">

                                            Cliente

                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">

                                            E-mail

                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">

                                            Cidade

                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">

                                            Cadastro

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {clientes.map((cliente) => (

                                        <ItemCliente
                                            key={cliente.id}
                                            cliente={cliente}
                                        />

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </div>

        </main>

    )
}