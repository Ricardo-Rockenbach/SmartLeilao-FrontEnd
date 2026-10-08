import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    marca: string
    modelo: string
    armazenamento: string
    memoriaRam: string
    cor: string
    condicao: string
    descricao: string
    imei: string
    destaque: boolean
}

export default function AdminNovoSmartphone() {

    const { admin } = useAdminStore()

    const [urlImagem, setUrlImagem] = useState("")
    const [fotos, setFotos] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        reset,
        setFocus
    } = useForm<Inputs>()

    useEffect(() => {
        setFocus("marca")
    }, [setFocus])

    function adicionarImagem() {

        const url = urlImagem.trim()

        if (!url) {
            toast.error("Digite a URL da imagem")
            return
        }

        try {
            new URL(url)
        } catch {
            toast.error("Digite uma URL válida")
            return
        }

        if (fotos.includes(url)) {
            toast.error("Esta imagem já foi adicionada")
            return
        }

        setFotos((atual) => [...atual, url])
        setUrlImagem("")
    }

    function removerImagem(index: number) {

        setFotos((atual) =>
            atual.filter((_, i) => i !== index)
        )
    }

    async function incluirSmartphone(data: Inputs) {

        const novoSmartphone = {
            marca: data.marca,
            modelo: data.modelo,
            armazenamento: data.armazenamento,
            memoriaRam: data.memoriaRam,
            cor: data.cor,
            condicao: data.condicao,
            descricao: data.descricao,
            imei: data.imei || null,
            destaque: data.destaque,
            fotos
        }

        const response = await fetch(`${apiUrl}/smartphones`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${admin.token}`
            },
            body: JSON.stringify(novoSmartphone)
        })

        if (response.status === 201) {

            toast.success("Ok! Smartphone cadastrado com sucesso")

            reset()
            setFotos([])
            setUrlImagem("")

        } else {

            const dados = await response.json()

            toast.error(
                dados.erro || "Erro no cadastro do smartphone..."
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
            <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
                Inclusão de Smartphones
            </h1>

            <form
                className="max-w-xl mx-auto"
                onSubmit={handleSubmit(incluirSmartphone)}
            >

                {/* Marca / Modelo */}
                <div className="grid gap-6 mb-3 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="marca"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Marca
                        </label>

                        <input
                            type="text"
                            id="marca"
                            placeholder="Ex: Apple"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                            {...register("marca")}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="modelo"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Modelo
                        </label>

                        <input
                            type="text"
                            id="modelo"
                            placeholder="Ex: iPhone 15"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                            {...register("modelo")}
                        />
                    </div>

                </div>

                {/* Armazenamento / RAM */}
                <div className="grid gap-6 mb-3 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="armazenamento"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Armazenamento
                        </label>

                        <select
                            id="armazenamento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            {...register("armazenamento")}
                        >
                            <option value="">Selecione</option>
                            <option value="64 GB">64 GB</option>
                            <option value="128 GB">128 GB</option>
                            <option value="256 GB">256 GB</option>
                            <option value="512 GB">512 GB</option>
                            <option value="1 TB">1 TB</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="memoriaRam"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Memória RAM
                        </label>

                        <select
                            id="memoriaRam"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            {...register("memoriaRam")}
                        >
                            <option value="">Selecione</option>
                            <option value="4 GB">4 GB</option>
                            <option value="6 GB">6 GB</option>
                            <option value="8 GB">8 GB</option>
                            <option value="12 GB">12 GB</option>
                            <option value="16 GB">16 GB</option>
                        </select>
                    </div>

                </div>

                {/* Cor / Condição */}
                <div className="grid gap-6 mb-3 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="cor"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Cor
                        </label>

                        <input
                            type="text"
                            id="cor"
                            placeholder="Ex: Preto"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                            {...register("cor")}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="condicao"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Condição
                        </label>

                        <select
                            id="condicao"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            {...register("condicao")}
                        >
                            <option value="">Selecione</option>
                            <option value="Excelente">Excelente</option>
                            <option value="Muito bom">Muito bom</option>
                            <option value="Bom">Bom</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </div>

                </div>

                {/* IMEI */}
                <div className="mb-3">

                    <label
                        htmlFor="imei"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        IMEI
                    </label>

                    <input
                        type="text"
                        id="imei"
                        placeholder="Opcional"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("imei")}
                    />

                </div>

                {/* Descrição */}
                <div className="mb-3">

                    <label
                        htmlFor="descricao"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Descrição
                    </label>

                    <textarea
                        id="descricao"
                        rows={5}
                        placeholder="Descreva o estado, acessórios, detalhes e observações do smartphone..."
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                        {...register("descricao")}
                    />

                </div>

                {/* IMAGENS */}
                <div className="mb-5">

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Imagens do smartphone
                    </label>

                    <div className="flex gap-2">

                        <input
                            type="text"
                            value={urlImagem}
                            onChange={(e) => setUrlImagem(e.target.value)}
                            placeholder="Cole a URL da imagem"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />

                        <button
                            type="button"
                            onClick={adicionarImagem}
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 whitespace-nowrap"
                        >
                            + Adicionar
                        </button>

                    </div>

                    {fotos.length > 0 && (

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">

                            {fotos.map((foto, index) => (

                                <div
                                    key={foto}
                                    className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                                >

                                    <img
                                        src={foto}
                                        alt={`Imagem ${index + 1}`}
                                        className="w-full h-32 object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removerImagem(index)}
                                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7"
                                    >
                                        ×
                                    </button>

                                    <p className="p-2 text-xs text-gray-600 dark:text-gray-300 truncate">
                                        Imagem {index + 1}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* Destaque */}
                <div className="flex items-center mb-5">

                    <input
                        id="destaque"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        {...register("destaque")}
                    />

                    <label
                        htmlFor="destaque"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Marcar smartphone como destaque
                    </label>

                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Incluir
                </button>

            </form>
        </div>
    )
}