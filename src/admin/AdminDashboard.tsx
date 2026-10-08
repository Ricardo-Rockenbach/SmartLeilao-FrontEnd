import './AdminDashboard.css'
import { useEffect, useState } from "react"

import {
  VictoryPie,
  VictoryLabel,
  VictoryTheme,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryAxis
} from "victory"

const apiUrl = import.meta.env.VITE_API_URL

type GraficoMarcaType = {
  marca: string
  num: number
}

type GraficoClienteType = {
  cidade: string
  num: number
}

type GeralDadosType = {
  clientes: number
  smartphones: number
  lances: number
}

type LancesMensalType = {
  mesAno: string
  lances: number
}

export default function AdminDashboard() {

  const [smartphonesMarca, setSmartphonesMarca] = useState<GraficoMarcaType[]>([])
  const [clientesCidade, setClientesCidade] = useState<GraficoClienteType[]>([])
  const [dados, setDados] = useState<GeralDadosType>({} as GeralDadosType)
  const [lancesMes, setLancesMes] = useState<LancesMensalType[]>([])

  useEffect(() => {

    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()

      setDados(dados)
    }

    async function getDadosGraficoMarca() {
      const response = await fetch(`${apiUrl}/dashboard/smartphonesMarca`)
      const dados = await response.json()

      setSmartphonesMarca(dados)
    }

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()

      setClientesCidade(dados)
    }

    async function getDadosLances() {
      const response = await fetch(`${apiUrl}/dashboard/lancesMes`)
      const dados: LancesMensalType[] = await response.json()

      setLancesMes(dados)
    }

    getDadosGerais()
    getDadosGraficoMarca()
    getDadosGraficoCliente()
    getDadosLances()

  }, [])

  const listaSmartphonesMarca = smartphonesMarca.map(item => ({
    x: item.marca,
    y: item.num
  }))

  const listaClientesCidade = clientesCidade.map(item => ({
    x: item.cidade,
    y: item.num
  }))

  const listaLancesMes = lancesMes.map(item => ({
    x: item.mesAno,
    y: item.lances
  }))

  return (
    <div className="container mt-24">

      <h2 className="text-3xl mb-4 font-bold">
        Visão Geral do Sistema
      </h2>

      {/* CARDS */}
      <div className="w-2/3 flex justify-between mx-auto mb-4">

        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">

          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}
          </span>

          <p className="font-bold mt-2 text-center">
            Nº Clientes
          </p>

        </div>

        <div className="border-red-600 border rounded p-6 w-1/3 me-3">

          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.smartphones}
          </span>

          <p className="font-bold mt-2 text-center">
            Nº Smartphones
          </p>

        </div>

        <div className="border-green-600 border rounded p-6 w-1/3">

          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.lances}
          </span>

          <p className="font-bold mt-2 text-center">
            Nº Lances
          </p>

        </div>

      </div>

      {/* GRÁFICO DE LANCES POR MÊS */}
      <h2 className="text-2xl font-bold mb-0">
        Nº de Lances por Mês
      </h2>

      <VictoryChart
        theme={VictoryTheme.clean}
        domainPadding={{ x: 20 }}
        height={150}
        padding={{
          top: 10,
          bottom: 30,
          left: 35,
          right: 20
        }}
      >

        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 8,
              padding: 0
            }
          }}
        />

        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 8,
              padding: 0
            }
          }}
        />

        <VictoryGroup
          style={{
            data: {
              width: 10
            }
          }}
        >

          <VictoryBar
            data={listaLancesMes}
            labels={({ datum }) => datum.y}
            style={{
              labels: {
                fontSize: 8,
                padding: 1
              }
            }}
          />

        </VictoryGroup>

      </VictoryChart>

      {/* GRÁFICOS DE PIZZA */}
      <div className="div-graficos">

        {/* SMARTPHONES POR MARCA */}
        <svg viewBox="30 55 400 400">

          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaSmartphonesMarca}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />

          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Smartphones", "por Marca"]}
          />

        </svg>

        {/* CLIENTES POR CIDADE */}
        <svg viewBox="30 55 400 400">

          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />

          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Clientes", "por Cidade"]}
          />

        </svg>

      </div>

    </div>
  )
}