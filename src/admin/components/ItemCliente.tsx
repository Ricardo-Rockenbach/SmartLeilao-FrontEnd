import { FiMail, FiMapPin, FiCalendar } from "react-icons/fi"

type Cliente = {
    id: string
    nome: string
    email: string
    cidade: string
    createdAt: string
}

type ItemClienteProps = {
    cliente: Cliente
}

export default function ItemCliente({
    cliente
}: ItemClienteProps) {

    function formatarData(data: string) {

        return new Date(data).toLocaleDateString("pt-BR")

    }


    return (

        <tr
            key={cliente.id}
            className="group bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
        >

            {/* CLIENTE */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                    {/* AVATAR */}

                    <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">

                        {cliente.nome
                            ?.charAt(0)
                            .toUpperCase()}

                    </div>


                    {/* NOME */}

                    <div className="min-w-0">

                        <p className="font-semibold text-gray-900 dark:text-white truncate">

                            {cliente.nome}

                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">

                            ID: {cliente.id}

                        </p>

                    </div>

                </div>

            </td>


            {/* EMAIL */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

                    <FiMail className="shrink-0 text-gray-400" />

                    <span className="truncate">

                        {cliente.email}

                    </span>

                </div>

            </td>


            {/* CIDADE */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

                    <FiMapPin className="shrink-0 text-gray-400" />

                    <span>

                        {cliente.cidade}

                    </span>

                </div>

            </td>


            {/* DATA DE CADASTRO */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

                    <FiCalendar className="shrink-0 text-gray-400" />

                    <span>

                        {formatarData(cliente.createdAt)}

                    </span>

                </div>

            </td>

        </tr>

    )
}