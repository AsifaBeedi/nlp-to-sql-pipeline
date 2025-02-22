"use client"

import type { SchemaTable } from "../types"

interface ResultsDisplayProps {
  results: SchemaTable[]
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (results.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Results:</h2>
      {results.map((table) => (
        <div key={table.name} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{table.name}</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {table.columns.map((column, index) => (
                <div
                  key={column.name}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-gray-500">{column.name}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {column.type} - {column.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  )
}

