"use client"

import { useState } from "react"
import FileUpload from "./FileUpload"
import NLPPrompt from "./NLPPrompt"
import ResultsDisplay from "./ResultsDisplay"
import type { SchemaTable } from "../types"

export default function SchemaExplorer() {
  const [schema, setSchema] = useState<SchemaTable[]>([])
  const [results, setResults] = useState<SchemaTable[]>([])

  const handleFileUpload = (parsedSchema: SchemaTable[]) => {
    setSchema(parsedSchema)
  }

  const handleNLPSearch = async (prompt: string) => {
    try {
      const response = await fetch("http://localhost:8000/find_schema/", {  // 👈 Call FastAPI directly
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),  // 👈 Use `query`, matching FastAPI's expected input
      })

      if (!response.ok) {
        throw new Error("Failed to process NLP search")
      }

      const data = await response.json()
      setResults(data.tables)  // 👈 Assuming FastAPI returns `{ "tables": [...] }`
    } catch (error) {
      console.error("Error processing NLP search:", error)
      // You can add error handling UI here
    }
  }

  return (
    <div className="space-y-8">
      <FileUpload onUpload={handleFileUpload} />
      <NLPPrompt onSearch={handleNLPSearch} />
      <ResultsDisplay results={results} />
    </div>
  )
}
