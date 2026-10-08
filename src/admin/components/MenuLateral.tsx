import { useAdminStore } from "../context/AdminContext"

import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaMobileScreenButton, FaUsers } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"

import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {

  const navigate = useNavigate()
  const { deslogaAdmin } = useAdminStore()


  function adminSair() {

    if (confirm("Confirma saída do sistema?")) {

      deslogaAdmin()

      navigate("/", {
        replace: true
      })

    }
  }


  return (

    <aside
      id="default-sidebar"
      className="
        fixed
        top-20
        left-0
        z-40
        w-64
        h-[calc(100vh-5rem)]
        transition-transform
        -translate-x-full
        sm:translate-x-0
      "
      aria-label="Sidebar"
    >

      <div
        className="
          flex
          flex-col
          h-full
          px-4
          py-6
          overflow-y-auto
          bg-gray-950
          border-r
          border-gray-800
        "
      >

        {/* MENU */}

        <div className="mb-6">

          <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Menu
          </p>


          <ul className="space-y-1">


            {/* VISÃO GERAL */}

            <li>

              <Link
                to="/admin"
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-lg
                  text-gray-300
                  hover:bg-gray-800
                  hover:text-white
                  transition
                  group
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-lg
                    bg-gray-800
                    text-gray-400
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition
                  "
                >
                  <BiSolidDashboard className="text-lg" />
                </span>

                <span className="text-sm font-medium">
                  Visão Geral
                </span>

              </Link>

            </li>


            {/* SMARTPHONES */}

            <li>

              <Link
                to="/admin/smartphones"
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-lg
                  text-gray-300
                  hover:bg-gray-800
                  hover:text-white
                  transition
                  group
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-lg
                    bg-gray-800
                    text-gray-400
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition
                  "
                >
                  <FaMobileScreenButton className="text-lg" />
                </span>

                <span className="text-sm font-medium">
                  Smartphones
                </span>

              </Link>

            </li>


            {/* CLIENTES */}

            <li>

              <Link
                to="/admin/clientes"
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-lg
                  text-gray-300
                  hover:bg-gray-800
                  hover:text-white
                  transition
                  group
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-lg
                    bg-gray-800
                    text-gray-400
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition
                  "
                >
                  <FaUsers className="text-lg" />
                </span>

                <span className="text-sm font-medium">
                  Clientes
                </span>

              </Link>

            </li>


            {/* LANCES */}

            <li>

              <Link
                to="/admin/lances"
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-lg
                  text-gray-300
                  hover:bg-gray-800
                  hover:text-white
                  transition
                  group
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-lg
                    bg-gray-800
                    text-gray-400
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition
                  "
                >
                  <BsCashCoin className="text-lg" />
                </span>

                <span className="text-sm font-medium">
                  Lances
                </span>

              </Link>

            </li>

          </ul>

        </div>


        {/* ESPAÇO */}

        <div className="flex-1" />


        {/* SAIR */}

        <div className="pt-4 border-t border-gray-800">

          <button
            type="button"
            onClick={adminSair}
            className="
              flex
              items-center
              gap-3
              w-full
              px-3
              py-3
              rounded-lg
              text-gray-400
              hover:bg-red-950/40
              hover:text-red-400
              transition
              group
            "
          >

            <span
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                rounded-lg
                bg-gray-800
                group-hover:bg-red-900/40
                transition
              "
            >
              <IoExitOutline className="text-lg" />
            </span>

            <span className="text-sm font-medium">
              Sair do Sistema
            </span>

          </button>

        </div>

      </div>

    </aside>

  )
}