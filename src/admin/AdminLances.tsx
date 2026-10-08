import { useEffect, useState } from "react"
import { FiActivity, FiDollarSign } from "react-icons/fi"

import type { Lance } from "../utils/LanceType"
import ItemLance from "./components/ItemLance.tsx"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminLances() {

    const [lances, setLances] = useState<Lance[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {

        async function getLances() {

            try {

                const response = await fetch(`${apiUrl}/lances`)

                if (!response.ok) {
                    throw new Error("Erro ao buscar lances")
                }

                const dados = await response.json()

                setLances(dados)

            } catch (error) {

                console.error("Erro ao buscar lances:", error)

            } finally {

                setCarregando(false)

            }
        }

        getLances()

    }, [])


    return (

        <main className="min-h-screen pt-20 bg-gray-100 dark:bg-gray-950">

            <div className="p-6 sm:p-8 lg:p-10 max-w-[1600px] mx-auto">

                {/* CABEÇALHO */}

                <div className="mb-8">

                    <div className="flex items-center gap-4">

                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">

                            <FiActivity className="text-2xl" />

                        </div>

                        <div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">

                                Controle de Lances

                            </h1>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">

                                Acompanhe os lances realizados nos leilões.

                            </p>

                        </div>

                    </div>

                </div>


                {/* RESUMO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">

                                    Total de lances

                                </p>

                                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">

                                    {lances.length}

                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">

                                <FiDollarSign className="text-xl" />

                            </div>

                        </div>

                    </div>

                </div>


                {/* CARD DA TABELA */}

                <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">

                    {/* CABEÇALHO */}

                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                            Lances realizados

                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">

                            Consulte os lances registrados nos leilões do sistema.

                        </p>

                    </div>


                    {/* CARREGANDO */}

                    {carregando && (

                        <div className="flex flex-col items-center justify-center py-20">

                            <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />

                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">

                                Carregando lances...

                            </p>

                        </div>

                    )}


                    {/* NENHUM LANCE */}

                    {!carregando && lances.length === 0 && (

                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

                            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4">

                                <FiActivity className="text-2xl" />

                            </div>

                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                                Nenhum lance encontrado

                            </h3>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">

                                Ainda não existem lances registrados.

                            </p>

                        </div>

                    )}


                    {/* TABELA */}

                    {!carregando && lances.length > 0 && (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                <thead className="bg-gray-100 dark:bg-gray-800">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">

                                            Smartphone

                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">

                                            Cliente

                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">

                                            Lance

                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">

                                            Leilão

                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">

                                            Data

                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 text-center">

                                            Ações

                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                    {lances.map((lance) => (

                                        <ItemLance
                                            key={lance.id}
                                            lance={lance}
                                            lances={lances}
                                            setLances={setLances}
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