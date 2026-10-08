import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaPlus, FaMobileScreenButton } from "react-icons/fa6"
import { FiSmartphone } from "react-icons/fi"

import ItemSmartphone from "./components/ItemSmartphone"
import type { Smartphone } from "../utils/SmartphoneType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminSmartphones() {

    const [smartphones, setSmartphones] = useState<Smartphone[]>([])

    useEffect(() => {

        async function getSmartphones() {

            try {

                const response = await fetch(`${apiUrl}/smartphones`)
                const dados = await response.json()

                setSmartphones(dados)

            } catch (error) {

                console.error("Erro ao buscar smartphones:", error)

            }

        }

        getSmartphones()

    }, [])

    const smartphonesDestaque = smartphones.filter(
        smartphone => smartphone.destaque
    ).length

    const listaSmartphones = smartphones.map(smartphone => (

        <ItemSmartphone
            key={smartphone.id}
            smartphone={smartphone}
            smartphones={smartphones}
            setSmartphones={setSmartphones}
        />

    ))

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 pt-28 pb-10">

            <div className="max-w-7xl mx-auto">

                {/* CABEÇALHO */}

                <div className="flex flex-col gap-5 mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-2 mb-2">

                                <FiSmartphone className="text-blue-600 text-xl" />

                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Administração / Smartphones
                                </span>

                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Smartphones
                            </h1>

                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Gerencie os smartphones disponíveis no SmartLeilão.
                            </p>

                        </div>


                        <Link
                            to="/admin/smartphones/novo"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                        >
                            <FaPlus />

                            Novo Smartphone
                        </Link>

                    </div>


                    {/* RESUMO */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">

                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                    <FaMobileScreenButton className="text-blue-600 dark:text-blue-400 text-lg" />
                                </div>

                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Total cadastrados
                                    </p>

                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {smartphones.length}
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                    <span className="text-yellow-600 dark:text-yellow-400 text-xl">
                                        ★
                                    </span>
                                </div>

                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Em destaque
                                    </p>

                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {smartphonesDestaque}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* LISTAGEM */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">

                    {/* TOPO DA TABELA */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Smartphones cadastrados
                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Consulte e gerencie os aparelhos cadastrados.
                            </p>

                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {smartphones.length} aparelho{smartphones.length !== 1 ? "s" : ""}
                        </div>

                    </div>


                    {/* TABELA */}

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">

                            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">

                                <tr>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold"
                                    >
                                        Smartphone
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold"
                                    >
                                        Marca
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold"
                                    >
                                        Armazenamento
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold"
                                    >
                                        RAM
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold"
                                    >
                                        Condição
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-4 font-semibold text-center"
                                    >
                                        Ações
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                                {smartphones.length > 0 ? (

                                    listaSmartphones

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="px-6 py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">

                                                    <FaMobileScreenButton className="text-gray-400 text-2xl" />

                                                </div>

                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    Nenhum smartphone cadastrado
                                                </h3>

                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">
                                                    Comece cadastrando o primeiro aparelho.
                                                </p>

                                                <Link
                                                    to="/admin/smartphones/novo"
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                                                >
                                                    <FaPlus />
                                                    Cadastrar Smartphone
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    )
}