"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import yaml from "js-yaml"
import type { SchemaTable } from "../types"

interface FileUploadProps {
  onUpload: (schema: SchemaTable[]) => void
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const fileContent = event.target?.result as string
          const parsedSchema = file.name.endsWith(".json") ? JSON.parse(fileContent) : yaml.load(fileContent)

          if (parsedSchema && parsedSchema.tables) {
            onUpload(parsedSchema.tables)
            setError(null)
          } else {
            throw new Error("Invalid schema format")
          }
        } catch (err) {
          console.error("Error parsing file:", err)
          setError("Error parsing file. Please ensure it's a valid YAML or JSON file.")
        }
      }

      reader.readAsText(file)
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
      "application/x-yaml": [".yaml", ".yml"],
    },
    multiple: false,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a YAML or JSON file here, or click to select a file</p>
        )}
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  )
}

