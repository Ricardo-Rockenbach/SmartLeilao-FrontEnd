import { Link, useNavigate } from "react-router-dom"
import { useClienteStore } from "../context/ClienteContext"

export default function Titulo() {
    const { cliente, deslogaCliente } = useClienteStore()
    const navigate = useNavigate()

    function clienteSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaCliente()

            if (localStorage.getItem("clienteKey")) {
                localStorage.removeItem("clienteKey")
            }

            navigate("/login")
        }
    }

    return (
        <nav className="border-blue-500 bg-blue-600 dark:bg-gray-900 dark:border-blue-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                        SmartLeilão
                    </span>
                </Link>

                <button
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <span className="sr-only">Abrir menu principal</span>

                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-solid-bg"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

                        <li>
                            {cliente.id ? (
                                <>
                                    <span className="text-white font-medium">
                                        {cliente.nome}
                                    </span>

                                    &nbsp;&nbsp;

                                    <Link
                                        to="/meusLances"
                                        className="text-white font-bold bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-400 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center"
                                    >
                                        Meus Lances
                                    </Link>

                                    &nbsp;&nbsp;

                                    <span
                                        className="cursor-pointer font-bold text-white hover:text-gray-200"
                                        onClick={clienteSair}
                                    >
                                        Sair
                                    </span>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block py-2 px-3 md:p-0 text-white rounded-sm hover:text-gray-200"
                                >
                                    Faça Seu Login
                                </Link>
                            )}
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    )
}