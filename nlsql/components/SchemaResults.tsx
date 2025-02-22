interface SchemaResult {
  table: string
  columns: string[]
  similarity: number
}

interface SchemaResultsProps {
  results: SchemaResult[]
}

export default function SchemaResults({ results }: SchemaResultsProps) {
  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{result.table}</h3>
            <span className="text-sm text-gray-400">Similarity: {result.similarity.toFixed(2)}</span>
          </div>
          <ul className="list-disc list-inside">
            {result.columns.map((column, colIndex) => (
              <li key={colIndex} className="text-gray-300">
                {column}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

