"use client"

import type React from "react"

import { useState } from "react"

interface NLPPromptProps {
  onSearch: (prompt: string) => void
}

export default function NLPPrompt({ onSearch }: NLPPromptProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(prompt)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nlp-prompt" className="block text-sm font-medium text-gray-700">
          NLP Prompt
        </label>
        <input
          type="text"
          id="nlp-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your query (e.g., Find tables related to users)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  )
}

