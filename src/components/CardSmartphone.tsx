import { Link } from "react-router-dom"
import type { Smartphone } from "../utils/SmartphoneType"

type Props = {
    smartphone: Smartphone
}

export default function CardSmartphone({ smartphone }: Props) {

    const leilao = smartphone.leiloes?.[0]

    const valorAtual = leilao
        ? Number(leilao.maiorLance || leilao.valorInicial)
        : 0

    return (
        <div className="group overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">

            <div className="relative overflow-hidden">

                <img
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={smartphone.fotos?.[0]?.url}
                    alt={`${smartphone.marca} ${smartphone.modelo}`}
                />

                {smartphone.destaque && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                        Destaque
                    </span>
                )}

                <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                        leilao?.status === "ATIVO"
                            ? "text-green-700 bg-green-100"
                            : leilao?.status === "AGUARDANDO"
                                ? "text-yellow-700 bg-yellow-100"
                                : leilao?.status === "ENCERRADO"
                                    ? "text-red-700 bg-red-100"
                                    : "text-gray-700 bg-gray-100"
                    }`}
                >
                    {leilao?.status === "ATIVO"
                        ? "Leilão em andamento"
                        : leilao?.status === "AGUARDANDO"
                            ? "Leilão aguardando"
                            : leilao?.status === "ENCERRADO"
                                ? "Leilão encerrado"
                                : "Sem leilão"}
                </span>

            </div>

            <div className="p-5">

                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {smartphone.marca}
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    {smartphone.modelo}
                </h3>

                <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300">
                        {smartphone.armazenamento}
                    </span>

                    <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300">
                        {smartphone.memoriaRam} RAM
                    </span>

                    <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300">
                        {smartphone.condicao}
                    </span>

                </div>

                {leilao && (
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Lance atual
                        </p>

                        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            R$ {valorAtual.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}
                        </p>

                    </div>
                )}

                <Link
                    to={`/detalhes/${smartphone.id}`}
                    className="mt-5 inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
                >
                    Ver detalhes

                    <svg
                        className="w-4 h-4 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>

                </Link>

            </div>

        </div>
    )
}