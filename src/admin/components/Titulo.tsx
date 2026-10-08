import { FiUser, FiShield } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">

      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO / TÍTULO */}

        <Link
          to="/admin"
          className="flex items-center gap-3 group"
        >

          {/* ÍCONE */}

          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition">

            <span className="text-xl font-bold">
              SL
            </span>

          </div>


          {/* NOME */}

          <div className="flex flex-col">

            <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Smart<span className="text-blue-600 dark:text-blue-400">Leilão</span>
            </span>

            <div className="flex items-center gap-1.5">

              <FiShield className="text-blue-600 dark:text-blue-400 text-xs" />

              <span className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400">
                Administração
              </span>

            </div>

          </div>

        </Link>


        {/* ADMINISTRADOR */}

        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrador
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {admin?.nome || "Administrador"}
            </p>

          </div>


          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">

            <FiUser className="text-lg" />

          </div>

        </div>

      </div>

    </nav>
  )
}