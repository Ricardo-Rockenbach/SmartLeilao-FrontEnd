import type { Smartphone } from "./utils/SmartphoneType"

import { useParams } from "react-router-dom"

import { useEffect, useState } from "react"

import { useClienteStore } from "./context/ClienteContext"

import { useForm } from "react-hook-form"

import { toast } from "sonner"


const apiUrl = import.meta.env.VITE_API_URL


type Inputs = {
    valor: string
}


export default function Detalhes() {

    const params = useParams()

    const [smartphone, setSmartphone] = useState<Smartphone>()

    const { cliente } = useClienteStore()

    const [imagemAtual, setImagemAtual] = useState(0)

    const [analiseIA, setAnaliseIA] = useState<{
        pontosFortes: string[]
        pontosFracos: string[]
        recomendacao: string
    } | null>(null)

    const [carregandoIA, setCarregandoIA] = useState(false)

    const { register, handleSubmit, reset } = useForm<Inputs>()


    useEffect(() => {

        async function buscaDados() {

            const response = await fetch(
                `${apiUrl}/smartphones/${params.smartphoneId}`
            )

            const dados = await response.json()

            setSmartphone(dados)

            setImagemAtual(0)
        }

        buscaDados()

    }, [params.smartphoneId])


    const leilao = smartphone?.leiloes?.[0]


    const maiorLance = leilao
        ? Number(leilao.maiorLance || leilao.valorInicial)
        : 0


    const incrementoMinimo = leilao
        ? Number(leilao.incrementoMinimo)
        : 0


    const proximoLance = maiorLance + incrementoMinimo


    async function analisarComIA() {

        if (!smartphone) {
            return
        }

        setCarregandoIA(true)

        try {

            const response = await fetch(`${apiUrl}/ia/analisar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    marca: smartphone.marca,
                    modelo: smartphone.modelo,
                    armazenamento: smartphone.armazenamento,
                    memoriaRam: smartphone.memoriaRam,
                    condicao: smartphone.condicao
                })
            })

            const dados = await response.json()

            if (!response.ok) {

                toast.error(
                    dados.erro || "Não foi possível realizar a análise"
                )

                return
            }

            setAnaliseIA(dados)

        } catch (error) {

            console.error(error)

            toast.error("Erro ao conectar com a IA")

        } finally {

            setCarregandoIA(false)

        }
    }


    async function enviaLance(data: Inputs) {

        if (!cliente.id) {

            toast.error("Você precisa estar identificado para dar um lance")

            return
        }


        if (!leilao) {

            toast.error("Este smartphone não possui um leilão ativo")

            return
        }


        const valor = Number(data.valor)


        if (valor < proximoLance) {

            toast.error(
                `O lance mínimo é R$ ${proximoLance.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}`
            )

            return
        }


        const response = await fetch(`${apiUrl}/lances`, {

            headers: {

                "Content-Type": "application/json"

            },

            method: "POST",

            body: JSON.stringify({

                clienteId: cliente.id,

                leilaoId: leilao.id,

                valor

            })

        })


        const dados = await response.json()


        if (response.status === 201) {

            toast.success("Lance realizado com sucesso!")

            reset()


            setSmartphone((atual) => {

                if (!atual) {

                    return atual

                }


                return {

                    ...atual,

                    leiloes: atual.leiloes.map((item) =>

                        item.id === leilao.id

                            ? {

                                ...item,

                                maiorLance: String(valor)

                            }

                            : item

                    )

                }

            })

        } else {

            toast.error(

                dados.erro || "Erro... Não foi possível realizar o lance"

            )

        }

    }


    const fotos = smartphone?.fotos || []


    function proximaImagem() {

        if (fotos.length === 0) {
            return
        }

        setImagemAtual((atual) =>
            atual === fotos.length - 1 ? 0 : atual + 1
        )
    }


    function imagemAnterior() {

        if (fotos.length === 0) {
            return
        }

        setImagemAtual((atual) =>
            atual === 0 ? fotos.length - 1 : atual - 1
        )
    }


    return (

        <>

            <section className="mt-6 mx-auto max-w-5xl bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">


                {/* CARROSSEL */}

                <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-900 rounded-t-lg overflow-hidden">

                    {fotos.length > 0 ? (

                        <img
                            src={fotos[imagemAtual]?.url}
                            alt={`Foto ${imagemAtual + 1} do ${smartphone?.marca} ${smartphone?.modelo}`}
                            className="object-contain w-full h-full"
                        />

                    ) : (

                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            Nenhuma imagem cadastrada
                        </div>

                    )}


                    {fotos.length > 1 && (

                        <>

                            <button
                                type="button"
                                onClick={imagemAnterior}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center"
                            >
                                ‹
                            </button>


                            <button
                                type="button"
                                onClick={proximaImagem}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center"
                            >
                                ›
                            </button>


                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

                                {fotos.map((foto, index) => (

                                    <button
                                        key={foto.id}
                                        type="button"
                                        onClick={() => setImagemAtual(index)}
                                        className={`w-3 h-3 rounded-full ${
                                            imagemAtual === index
                                                ? "bg-blue-600"
                                                : "bg-white/70"
                                        }`}
                                    />

                                ))}

                            </div>

                        </>

                    )}

                </div>


                <div className="p-6">


                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">

                        {smartphone?.marca} {smartphone?.modelo}

                    </h5>


                    <h5 className="mb-4 text-xl tracking-tight text-gray-900 dark:text-white">

                        Lance atual: R$ {maiorLance.toLocaleString("pt-BR", {

                            minimumFractionDigits: 2

                        })}

                    </h5>


                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 italic">

                        {smartphone?.descricao}

                    </p>


                    {/* ANÁLISE DA IA */}

                    <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-gray-700 dark:border-gray-600">

                        <div className="flex items-center justify-between gap-4">

                            <div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">

                                    ✨ Análise com IA

                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-300">

                                    Veja os principais prós e contras deste smartphone.

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={analisarComIA}
                                disabled={carregandoIA}
                                className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 font-medium rounded-lg text-sm px-4 py-2.5"
                            >

                                {carregandoIA
                                    ? "Analisando..."
                                    : "✨ Analisar com IA"}

                            </button>

                        </div>


                        {analiseIA && (

                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="p-4 bg-green-50 rounded-lg dark:bg-gray-800">

                                    <h4 className="mb-3 font-bold text-green-700 dark:text-green-400">

                                        👍 Prós

                                    </h4>

                                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">

                                        {analiseIA.pontosFortes.map((ponto, index) => (

                                            <li key={index}>
                                                • {ponto}
                                            </li>

                                        ))}

                                    </ul>

                                </div>


                                <div className="p-4 bg-red-50 rounded-lg dark:bg-gray-800">

                                    <h4 className="mb-3 font-bold text-red-700 dark:text-red-400">

                                        👎 Contras

                                    </h4>

                                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">

                                        {analiseIA.pontosFracos.map((ponto, index) => (

                                            <li key={index}>
                                                • {ponto}
                                            </li>

                                        ))}

                                    </ul>

                                </div>


                                <div className="md:col-span-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">

                                    <h4 className="mb-2 font-bold text-gray-900 dark:text-white">

                                        🎯 Recomendação

                                    </h4>

                                    <p className="text-sm text-gray-700 dark:text-gray-300">

                                        {analiseIA.recomendacao}

                                    </p>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* INFORMAÇÕES DO APARELHO */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Armazenamento
                            </p>

                            <p className="font-bold text-gray-900 dark:text-white">
                                {smartphone?.armazenamento}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Memória RAM
                            </p>

                            <p className="font-bold text-gray-900 dark:text-white">
                                {smartphone?.memoriaRam}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Cor
                            </p>

                            <p className="font-bold text-gray-900 dark:text-white">
                                {smartphone?.cor}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Condição
                            </p>

                            <p className="font-bold text-gray-900 dark:text-white">
                                {smartphone?.condicao}
                            </p>

                        </div>

                    </div>


                    {/* INFORMAÇÕES DO LEILÃO */}

                    {leilao && (

                        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">

                            <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                                Informações do Leilão
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Lance atual
                                    </p>

                                    <p className="text-xl font-bold text-gray-900 dark:text-white">

                                        R$ {maiorLance.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2
                                        })}

                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Incremento mínimo
                                    </p>

                                    <p className="text-xl font-bold text-gray-900 dark:text-white">

                                        R$ {incrementoMinimo.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2
                                        })}

                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Próximo lance
                                    </p>

                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">

                                        R$ {proximoLance.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2
                                        })}

                                    </p>

                                </div>

                            </div>


                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">

                                Encerramento:{" "}

                                {new Date(leilao.dataFim).toLocaleString("pt-BR")}

                            </p>

                        </div>

                    )}


                    {/* LANCE */}

                    {cliente.id ? (

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">

                            <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">

                                🔨 Dê seu lance neste smartphone!

                            </h3>


                            <form onSubmit={handleSubmit(enviaLance)}>

                                <input
                                    type="text"
                                    className="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                                    value={`${cliente.nome} (${cliente.email})`}
                                    disabled
                                    readOnly
                                />


                                <input
                                    type="number"
                                    step="0.01"
                                    min={proximoLance}
                                    className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder={`Digite seu lance (mínimo R$ ${proximoLance.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2
                                    })})`}
                                    required
                                    {...register("valor")}
                                />


                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Dar Lance
                                </button>

                            </form>

                        </div>

                    ) : (

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">

                            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">

                                😎 Gostou? Identifique-se para participar deste leilão!

                            </h2>

                        </div>

                    )}

                </div>

            </section>

        </>

    )
}