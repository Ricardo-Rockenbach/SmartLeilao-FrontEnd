import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Link, useNavigate, useParams } from "react-router-dom"

import { FiArrowLeft, FiCalendar, FiDollarSign } from "react-icons/fi"
import { FaMobileScreenButton } from "react-icons/fa6"

import { useAdminStore } from "./context/AdminContext"
import type { Smartphone } from "../utils/SmartphoneType"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    valorInicial: number
    incrementoMinimo: number
    dataInicio: string
    dataFim: string
}

export default function AdminNovoLeilao() {

    const { smartphoneId } = useParams()
    const navigate = useNavigate()
    const { admin } = useAdminStore()

    const [smartphone, setSmartphone] = useState<Smartphone | null>(null)
    const [carregando, setCarregando] = useState(true)

    const {
        register,
        handleSubmit,
        setFocus
    } = useForm<Inputs>()

    useEffect(() => {

        setFocus("valorInicial")

    }, [setFocus])


    useEffect(() => {

        async function getSmartphone() {

            try {

                const response = await fetch(
                    `${apiUrl}/smartphones/${smartphoneId}`
                )

                if (!response.ok) {

                    toast.error("Smartphone não encontrado")

                    navigate("/admin/smartphones", {
                        replace: true
                    })

                    return
                }

                const dados: Smartphone = await response.json()

                setSmartphone(dados)

            } catch {

                toast.error(
                    "Não foi possível carregar o smartphone"
                )

                navigate("/admin/smartphones", {
                    replace: true
                })

            } finally {

                setCarregando(false)

            }
        }

        if (smartphoneId) {
            getSmartphone()
        }

    }, [smartphoneId, navigate])


    async function criarLeilao(data: Inputs) {

        if (!admin) {

            toast.error(
                "Administrador não identificado"
            )

            return
        }

        if (!smartphone) {

            toast.error(
                "Smartphone não identificado"
            )

            return
        }


        const novoLeilao = {

            smartphoneId: Number(smartphone.id),

            valorInicial: Number(
                data.valorInicial
            ),

            incrementoMinimo: Number(
                data.incrementoMinimo
            ),

            dataInicio: data.dataInicio,

            dataFim: data.dataFim,

            status: "AGUARDANDO"

        }


        try {

            const response = await fetch(
                `${apiUrl}/leiloes`,
                {
                    method: "POST",

                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${admin.token}`
                    },

                    body: JSON.stringify(
                        novoLeilao
                    )
                }
            )


            if (response.status === 201) {

                toast.success(
                    "Leilão criado com sucesso!"
                )

                setTimeout(() => {

                    navigate(
                        "/admin/smartphones"
                    )

                }, 800)

                return
            }


            const dados = await response.json()

            toast.error(
                dados.erro ||
                "Erro ao criar leilão"
            )

        } catch {

            toast.error(
                "Não foi possível conectar ao servidor"
            )

        }

    }


    if (carregando) {

        return (

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Carregando smartphone...
                    </p>

                </div>

            </div>

        )
    }


    if (!smartphone) {
        return null
    }


    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 pt-28 pb-10">

            <div className="max-w-4xl mx-auto">


                {/* CABEÇALHO */}

                <div className="mb-8">

                    <Link
                        to="/admin/smartphones"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
                    >

                        <FiArrowLeft />

                        Voltar para Smartphones

                    </Link>


                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                        Administração / Leilões
                    </p>


                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

                        Criar Novo Leilão

                    </h1>


                    <p className="mt-1 text-gray-500 dark:text-gray-400">

                        Configure os valores e o período do leilão.

                    </p>

                </div>


                {/* SMARTPHONE */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 mb-6">

                    <div className="flex items-center gap-4">


                        {/* FOTO */}

                        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

                            {smartphone.fotos?.[0]?.url ? (

                                <img
                                    src={
                                        smartphone.fotos[0].url
                                    }
                                    alt={`Foto do ${smartphone.marca} ${smartphone.modelo}`}
                                    className="w-full h-full object-cover"
                                />

                            ) : (

                                <div className="w-full h-full flex items-center justify-center">

                                    <FaMobileScreenButton className="text-gray-400 text-2xl" />

                                </div>

                            )}

                        </div>


                        {/* DADOS */}

                        <div>

                            <p className="text-xs uppercase tracking-wide font-semibold text-blue-600 dark:text-blue-400">
                                Smartphone selecionado
                            </p>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">

                                {smartphone.marca}{" "}
                                {smartphone.modelo}

                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                                {smartphone.armazenamento}
                                {" • "}
                                {smartphone.memoriaRam}
                                {" • "}
                                {smartphone.cor}

                            </p>

                        </div>

                    </div>

                </div>


                {/* FORMULÁRIO */}

                <form
                    onSubmit={handleSubmit(
                        criarLeilao
                    )}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden"
                >


                    {/* TÍTULO */}

                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                            Configuração do Leilão

                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                            Defina os valores e o período em que os lances estarão disponíveis.

                        </p>

                    </div>


                    <div className="p-6 space-y-6">


                        {/* VALORES */}

                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">

                                <FiDollarSign />

                                Valores

                            </h3>


                            <div className="grid gap-6 md:grid-cols-2">


                                {/* VALOR INICIAL */}

                                <div>

                                    <label
                                        htmlFor="valorInicial"
                                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Valor inicial
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            R$
                                        </span>

                                        <input
                                            type="number"
                                            id="valorInicial"
                                            step="0.01"
                                            min="0.01"
                                            placeholder="2500.00"
                                            {...register(
                                                "valorInicial",
                                                {
                                                    required: true,
                                                    valueAsNumber: true
                                                }
                                            )}
                                            className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-11 pr-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        />

                                    </div>

                                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        Valor mínimo para o primeiro lance.
                                    </p>

                                </div>


                                {/* INCREMENTO */}

                                <div>

                                    <label
                                        htmlFor="incrementoMinimo"
                                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Incremento mínimo
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            R$
                                        </span>

                                        <input
                                            type="number"
                                            id="incrementoMinimo"
                                            step="0.01"
                                            min="0.01"
                                            placeholder="50.00"
                                            {...register(
                                                "incrementoMinimo",
                                                {
                                                    required: true,
                                                    valueAsNumber: true
                                                }
                                            )}
                                            className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-11 pr-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        />

                                    </div>

                                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        Valor mínimo que cada novo lance deverá aumentar.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* DATAS */}

                        <div>

                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">

                                <FiCalendar />

                                Período do Leilão

                            </h3>


                            <div className="grid gap-6 md:grid-cols-2">


                                {/* INÍCIO */}

                                <div>

                                    <label
                                        htmlFor="dataInicio"
                                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Data e hora de início
                                    </label>

                                    <input
                                        type="datetime-local"
                                        id="dataInicio"
                                        {...register(
                                            "dataInicio",
                                            {
                                                required: true
                                            }
                                        )}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />

                                </div>


                                {/* FIM */}

                                <div>

                                    <label
                                        htmlFor="dataFim"
                                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Data e hora de encerramento
                                    </label>

                                    <input
                                        type="datetime-local"
                                        id="dataFim"
                                        {...register(
                                            "dataFim",
                                            {
                                                required: true
                                            }
                                        )}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* AVISO */}

                        <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 p-4">

                            <div className="flex gap-3">

                                <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                                    ℹ
                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                                        Como funciona
                                    </p>

                                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                                        O leilão será criado como <strong>AGUARDANDO</strong>.
                                        Os clientes poderão realizar lances somente quando o período começar.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RODAPÉ */}

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/smartphones"
                                )
                            }
                            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition"
                        >
                            Cancelar
                        </button>


                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                        >
                            Criar Leilão
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}