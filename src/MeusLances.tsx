import { useEffect, useState } from "react"
import { FiClock, FiDollarSign, FiSmartphone, FiStar, FiX } from "react-icons/fi"

import { useClienteStore } from "./context/ClienteContext"
import type { Lance } from "./utils/LanceType"

const apiUrl = import.meta.env.VITE_API_URL

export default function MeusLances() {

    const [lances, setLances] = useState<Lance[]>([])
    const { cliente } = useClienteStore()

    const [avaliacoes, setAvaliacoes] = useState<number[]>([])
    const [leilaoSelecionado, setLeilaoSelecionado] = useState<number | null>(null)
    const [nota, setNota] = useState(5)
    const [comentario, setComentario] = useState("")
    const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false)

    useEffect(() => {

        async function buscaDados() {

            if (!cliente.id) {
                return
            }

            try {

                const response = await fetch(`${apiUrl}/lances/${cliente.id}`)
                const dados = await response.json()

                setLances(dados)

                const responseAvaliacoes = await fetch(
                    `${apiUrl}/avaliacoes/cliente/${cliente.id}`
                )

                if (responseAvaliacoes.ok) {

                    const dadosAvaliacoes = await responseAvaliacoes.json()

                    setAvaliacoes(
                        dadosAvaliacoes.map(
                            (avaliacao: { leilaoId: number }) =>
                                avaliacao.leilaoId
                        )
                    )
                }

            } catch (error) {

                console.error("Erro ao buscar dados:", error)

            }
        }

        buscaDados()

    }, [cliente.id])


    function dataDMA(data: string) {

        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)

        return `${dia}/${mes}/${ano}`
    }


    function statusClasses(status: string) {

        if (status === "ATIVO") {
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        }

        if (status === "ENCERRADO") {
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        }

        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    }


    function resultadoLance(lance: Lance) {

        if (lance.leilao.status === "ENCERRADO") {

            if (Number(lance.valor) >= Number(lance.maiorLance)) {

                return {
                    texto: "🏆 Você venceu",
                    classes:
                        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }
            }

            return {
                texto: "Leilão perdido",
                classes:
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }
        }


        if (Number(lance.valor) >= Number(lance.maiorLance)) {

            return {
                texto: "Lance vencedor",
                classes:
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }
        }


        return {
            texto: "Lance superado",
            classes:
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        }
    }


    async function enviarAvaliacao() {

        if (!cliente.id || !leilaoSelecionado) {
            return
        }

        try {

            setEnviandoAvaliacao(true)

            const response = await fetch(`${apiUrl}/avaliacoes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    clienteId: cliente.id,
                    leilaoId: leilaoSelecionado,
                    nota,
                    comentario
                })
            })

            const dados = await response.json()

            if (!response.ok) {

                alert(dados.erro || "Erro ao enviar avaliação")
                return
            }

            setAvaliacoes((atual) => [
                ...atual,
                leilaoSelecionado
            ])

            setLeilaoSelecionado(null)
            setNota(5)
            setComentario("")

        } catch (error) {

            console.error(error)

            alert("Erro ao enviar avaliação")

        } finally {

            setEnviandoAvaliacao(false)
        }
    }


    const lancesTable = lances.map((lance) => {

        const resultado = resultadoLance(lance)

        const venceu =
            lance.leilao.status === "ENCERRADO" &&
            Number(lance.valor) >= Number(lance.maiorLance)

        return (

            <tr
                key={lance.id}
                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
            >

                {/* SMARTPHONE */}

                <td className="px-6 py-5">

                    <div className="flex items-center gap-4 min-w-[240px]">

                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">

                            <FiSmartphone className="text-xl" />

                        </div>

                        <div>

                            <p className="font-semibold text-gray-900 dark:text-white">

                                {lance.leilao.smartphone.marca}{" "}

                                {lance.leilao.smartphone.modelo}

                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                                {lance.leilao.smartphone.armazenamento} ·{" "}

                                {lance.leilao.smartphone.memoriaRam} RAM

                            </p>

                        </div>

                    </div>

                </td>


                {/* MEU LANCE */}

                <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                        <FiDollarSign className="text-blue-500" />

                        <span className="font-bold text-blue-600 dark:text-blue-400 text-base">

                            R${" "}

                            {Number(lance.valor).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}

                        </span>

                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">

                        Enviado em {dataDMA(lance.createdAt)}

                    </p>

                </td>


                {/* INCREMENTO */}

                <td className="px-6 py-5">

                    <p className="text-xs uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500">

                        Incremento mínimo

                    </p>

                    <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">

                        R${" "}

                        {Number(lance.leilao.incrementoMinimo).toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2,
                            }
                        )}

                    </p>

                </td>


                {/* STATUS */}

                <td className="px-6 py-5">

                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(
                            lance.leilao.status
                        )}`}
                    >

                        {lance.leilao.status}

                    </span>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">

                        <FiClock className="text-gray-400" />

                        <span>

                            Encerra em{" "}

                            <span className="font-medium text-gray-700 dark:text-gray-300">

                                {new Date(
                                    lance.leilao.dataFim
                                ).toLocaleDateString("pt-BR")}

                            </span>

                        </span>

                    </div>

                </td>


                {/* RESULTADO */}

                <td className="px-6 py-5">

                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${resultado.classes}`}
                    >

                        {resultado.texto}

                    </span>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">

                        Maior lance: R${" "}

                        {Number(lance.maiorLance).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}

                    </p>

                </td>


                {/* AVALIAÇÃO */}

                <td className="px-6 py-5">

                    {venceu ? (

                        avaliacoes.includes(lance.leilao.id) ? (

                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">

                                <FiStar />

                                Avaliado

                            </span>

                        ) : (

                            <button
                                onClick={() =>
                                    setLeilaoSelecionado(lance.leilao.id)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >

                                <FiStar />

                                Avaliar

                            </button>

                        )

                    ) : (

                        <span className="text-xs text-gray-400">
                            —
                        </span>

                    )}

                </td>

            </tr>
        )
    })


    return (

        <main className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto">


                {/* CABEÇALHO */}

                <div className="mb-8">

                    <div className="flex items-center gap-4">

                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">

                            <FiDollarSign className="text-2xl" />

                        </div>

                        <div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">

                                Meus Lances

                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                Acompanhe os lances realizados nos leilões.

                            </p>

                        </div>

                    </div>

                </div>


                {/* RESUMO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">


                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">

                                    Total de lances

                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">

                                    {lances.length}

                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">

                                <FiDollarSign className="text-xl" />

                            </div>

                        </div>

                    </div>


                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">

                                    Leilões ativos

                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">

                                    {
                                        lances.filter(
                                            (lance) =>
                                                lance.leilao.status === "ATIVO"
                                        ).length
                                    }

                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">

                                <FiClock className="text-xl" />

                            </div>

                        </div>

                    </div>


                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">

                                    Leilões encerrados

                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">

                                    {
                                        lances.filter(
                                            (lance) =>
                                                lance.leilao.status ===
                                                "ENCERRADO"
                                        ).length
                                    }

                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">

                                <FiSmartphone className="text-xl" />

                            </div>

                        </div>

                    </div>

                </div>


                {/* TABELA */}

                <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">


                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                            Histórico de lances

                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                            Consulte os valores e o status dos seus lances.

                        </p>

                    </div>


                    {lances.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-5">

                                <FiSmartphone className="text-3xl" />

                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">

                                Nenhum lance realizado

                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">

                                Você ainda não realizou nenhum lance.

                                Explore os smartphones disponíveis e participe
                                dos leilões.

                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                <thead className="bg-gray-50 dark:bg-gray-800/60">

                                    <tr>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Smartphone
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Meu lance
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Incremento
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Leilão
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Resultado
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Avaliação
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {lancesTable}
                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </div>


            {/* MODAL DE AVALIAÇÃO */}

            {leilaoSelecionado && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

                    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Avaliar leilão
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Como foi sua experiência?
                                </p>

                            </div>

                            <button
                                onClick={() => setLeilaoSelecionado(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <FiX className="text-xl" />
                            </button>

                        </div>


                        {/* ESTRELAS */}

                        <div className="flex justify-center gap-2 mb-6">

                            {[1, 2, 3, 4, 5].map((estrela) => (

                                <button
                                    key={estrela}
                                    type="button"
                                    onClick={() => setNota(estrela)}
                                    className={`text-3xl transition ${
                                        estrela <= nota
                                            ? "text-yellow-400"
                                            : "text-gray-300 dark:text-gray-600"
                                    }`}
                                >

                                    <FiStar
                                        className={
                                            estrela <= nota
                                                ? "fill-current"
                                                : ""
                                        }
                                    />

                                </button>

                            ))}

                        </div>


                        <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-5">

                            {nota} de 5 estrelas

                        </p>


                        {/* COMENTÁRIO */}

                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Deixe um comentário (opcional)"
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />


                        {/* BOTÕES */}

                        <div className="flex gap-3 mt-5">

                            <button
                                type="button"
                                onClick={() => setLeilaoSelecionado(null)}
                                className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={enviarAvaliacao}
                                disabled={enviandoAvaliacao}
                                className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                {enviandoAvaliacao
                                    ? "Enviando..."
                                    : "Enviar avaliação"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>
    )
}