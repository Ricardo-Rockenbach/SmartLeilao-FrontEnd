import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import { FiCheckCircle } from "react-icons/fi"
import { Link } from "react-router-dom"

import type { Smartphone } from "../../utils/SmartphoneType"
import { useAdminStore } from "../context/AdminContext"

type ListaSmartphoneProps = {
    smartphone: Smartphone
    smartphones: Smartphone[]
    setSmartphones: React.Dispatch<React.SetStateAction<Smartphone[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemSmartphone({
    smartphone,
    smartphones,
    setSmartphones
}: ListaSmartphoneProps) {

    const { admin } = useAdminStore()


    async function excluirSmartphone() {

        if (!admin || admin.nivel == 1) {
            alert("Você não tem permissão para excluir smartphones")
            return
        }

        if (confirm(
            `Confirma a exclusão do smartphone ${smartphone.marca} ${smartphone.modelo}?`
        )) {

            const response = await fetch(
                `${apiUrl}/smartphones/${smartphone.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${admin.token}`
                    },
                }
            )

            if (response.status == 200) {

                const smartphones2 = smartphones.filter(
                    x => x.id != smartphone.id
                )

                setSmartphones(smartphones2)

                alert("Smartphone excluído com sucesso")

            } else {

                alert("Erro... Smartphone não foi excluído")

            }
        }
    }


    async function alterarDestaque() {

        if (!admin) {
            alert("Administrador não identificado")
            return
        }

        const response = await fetch(
            `${apiUrl}/smartphones/destacar/${smartphone.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${admin.token}`
                },
            }
        )

        if (response.status == 200) {

            const smartphones2 = smartphones.map(x => {

                if (x.id == smartphone.id) {

                    return {
                        ...x,
                        destaque: !x.destaque
                    }

                }

                return x
            })

            setSmartphones(smartphones2)

        } else {

            alert("Não foi possível alterar o destaque")

        }
    }


    return (

        <tr
            key={smartphone.id}
            className="group bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
        >

            {/* SMARTPHONE */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-4">

                    {/* FOTO */}

                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

                        {smartphone.fotos?.[0]?.url ? (

                            <img
                                src={smartphone.fotos[0].url}
                                alt={`Foto do ${smartphone.marca} ${smartphone.modelo}`}
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                Sem foto
                            </div>

                        )}

                    </div>


                    {/* NOME */}

                    <div className="min-w-0">

                        <p
                            className={`font-semibold truncate ${
                                smartphone.destaque
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-800 dark:text-gray-200"
                            }`}
                        >
                            {smartphone.modelo}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {smartphone.cor}
                        </p>


                        {/* DESTAQUE */}

                        {smartphone.destaque && (

                            <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">

                                <FiCheckCircle />

                                Destaque

                            </span>

                        )}

                    </div>

                </div>

            </td>


            {/* MARCA */}

            <td className="px-6 py-4">

                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">

                    {smartphone.marca}

                </span>

            </td>


            {/* ARMAZENAMENTO */}

            <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">

                {smartphone.armazenamento}

            </td>


            {/* RAM */}

            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">

                {smartphone.memoriaRam}

            </td>


            {/* CONDIÇÃO */}

            <td className="px-6 py-4">

                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        smartphone.condicao === "Excelente"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : smartphone.condicao === "Muito bom"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : smartphone.condicao === "Bom"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    {smartphone.condicao}
                </span>

            </td>


            {/* AÇÕES */}

            <td className="px-6 py-4">

                <div className="flex items-center justify-center gap-2">
                    
                    {/* CRIAR LEILÃO */}

                    <Link
                        to={`/admin/leiloes/novo/${smartphone.id}`}
                        title="Criar leilão"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition"
                    >
                        <span className="text-sm font-bold">$</span>
                    </Link>

                    {/* DESTAQUE */}

                    <button
                        type="button"
                        onClick={alterarDestaque}
                        title={
                            smartphone.destaque
                                ? "Remover destaque"
                                : "Destacar smartphone"
                        }
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition ${
                            smartphone.destaque
                                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
                                : "bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400"
                        }`}
                    >

                        <FaRegStar className="text-lg" />

                    </button>


                    {/* EXCLUIR */}

                    <button
                        type="button"
                        onClick={excluirSmartphone}
                        title="Excluir smartphone"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition"
                    >

                        <TiDeleteOutline className="text-xl" />

                    </button>

                </div>

            </td>

        </tr>
    )
}