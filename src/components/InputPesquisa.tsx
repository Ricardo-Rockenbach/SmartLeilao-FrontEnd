import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { Smartphone } from "../utils/SmartphoneType"

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    todosSmartphones: Smartphone[]
    setSmartphones: React.Dispatch<React.SetStateAction<Smartphone[]>>
}

export function InputPesquisa({
    todosSmartphones,
    setSmartphones
}: InputPesquisaProps) {

    const { register, handleSubmit, reset } = useForm<Inputs>()

    function enviaPesquisa(data: Inputs) {

        if (data.termo.trim().length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }

        const termo = data.termo.trim().toLowerCase()

        const resultado = todosSmartphones.filter((smartphone) =>
            smartphone.marca.toLowerCase().includes(termo) ||
            smartphone.modelo.toLowerCase().includes(termo) ||
            smartphone.armazenamento.toLowerCase().includes(termo) ||
            smartphone.memoriaRam.toLowerCase().includes(termo) ||
            smartphone.cor.toLowerCase().includes(termo)
        )

        if (resultado.length === 0) {
            toast.error("Nenhum smartphone encontrado")
            return
        }

        setSmartphones(resultado)
    }

    function mostraDestaques() {

        const destaques = todosSmartphones.filter(
            (smartphone) => smartphone.destaque
        )

        setSmartphones(destaques)

        reset({
            termo: ""
        })
    }

    function mostraTodos() {

        setSmartphones(todosSmartphones)

        reset({
            termo: ""
        })
    }

    return (
        <div className="max-w-4xl mx-auto">

            <form
                onSubmit={handleSubmit(enviaPesquisa)}
                className="flex flex-col sm:flex-row gap-3"
            >

                <div className="relative flex-1">

                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">

                        <svg
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>

                    </div>

                    <input
                        type="search"
                        placeholder="Pesquise por marca, modelo, armazenamento..."
                        className="block w-full p-4 ps-12 text-sm text-gray-900 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                        {...register("termo")}
                    />

                </div>

                <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
                >
                    Pesquisar
                </button>

            </form>

        </div>
    )
}