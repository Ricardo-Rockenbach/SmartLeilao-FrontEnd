import { TiDeleteOutline } from "react-icons/ti"

import type { Lance } from "../../utils/LanceType"
import { useAdminStore } from "../context/AdminContext"

type ListaLanceProps = {
    lance: Lance
    lances: Lance[]
    setLances: React.Dispatch<React.SetStateAction<Lance[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemLance({
    lance,
    lances,
    setLances
}: ListaLanceProps) {

    const { admin } = useAdminStore()

    async function excluirLance() {

        if (!admin) {
            alert("Administrador não identificado")
            return
        }

        if (
            confirm(
                `Confirma a exclusão do lance de R$ ${Number(lance.valor).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                )}?`
            )
        ) {

            const response = await fetch(
                `${apiUrl}/lances/${lance.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${admin.token}`
                    },
                }
            )

            if (response.status === 200) {

                const lances2 = lances.filter(
                    x => x.id !== lance.id
                )

                setLances(lances2)

                alert("Lance excluído com sucesso")

            } else {

                alert("Erro... Lance não foi excluído")
            }
        }
    }

    return (

        <tr
            key={lance.id}
            className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
        >

            {/* SMARTPHONE */}

            <th
                scope="row"
                className="px-6 py-4 text-gray-900 dark:text-white"
            >

                <p className="font-semibold">

                    {lance.leilao.smartphone.marca}{" "}
                    {lance.leilao.smartphone.modelo}

                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">

                    {lance.leilao.smartphone.armazenamento} -{" "}
                    {lance.leilao.smartphone.memoriaRam} RAM

                </p>

            </th>


            {/* CLIENTE */}

            <td className="px-6 py-4 text-gray-900 dark:text-white">

                <p className="font-medium">

                    {lance.cliente.nome}

                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">

                    {lance.cliente.email}

                </p>

            </td>


            {/* LANCE */}

            <td className="px-6 py-4">

                <span className="font-bold text-blue-600 dark:text-blue-400">

                    R${" "}

                    {Number(lance.valor).toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}

                </span>

            </td>


            {/* LEILÃO */}

            <td className="px-6 py-4">

                <span
                    className={
                        lance.leilao.status === "ATIVO"
                            ? "inline-flex px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full"
                            : lance.leilao.status === "ENCERRADO"
                            ? "inline-flex px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full"
                            : "inline-flex px-2.5 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full"
                    }
                >

                    {lance.leilao.status}

                </span>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">

                    Encerra em{" "}

                    <span className="font-medium text-gray-800 dark:text-gray-200">

                        {new Date(
                            lance.leilao.dataFim
                        ).toLocaleDateString("pt-BR")}

                    </span>

                </p>

            </td>


            {/* DATA */}

            <td className="px-6 py-4">

                <span className="text-gray-700 dark:text-gray-200">

                    {new Date(
                        lance.createdAt
                    ).toLocaleDateString("pt-BR")}

                </span>

            </td>


            {/* AÇÕES */}

            <td className="px-6 py-4 text-center">

                <button
                    type="button"
                    title="Excluir lance"
                    onClick={excluirLance}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition"
                >

                    <TiDeleteOutline className="text-xl" />

                </button>

            </td>

        </tr>
    )
}