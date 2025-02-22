import { NextResponse } from "next/server"
import natural from "natural"

const tokenizer = new natural.WordTokenizer()
const stemmer = natural.PorterStemmer

export async function POST(request: Request) {
  const { schema, prompt } = await request.json()

  if (!schema || !prompt) {
    return NextResponse.json({ error: "Missing schema or prompt" }, { status: 400 })
  }

  const keywords = tokenizer.tokenize(prompt.toLowerCase())
  const stemmedKeywords = keywords.map((word) => stemmer.stem(word))

  const matchingTables = schema.filter((table) => {
    const tableText =
      `${table.name} ${table.columns.map((col) => `${col.name} ${col.type} ${col.description}`).join(" ")}`.toLowerCase()
    const stemmedTableText = stemmer.tokenizeAndStem(tableText)
    return stemmedKeywords.some((keyword) => stemmedTableText.includes(keyword))
  })

  return NextResponse.json(matchingTables)
}

