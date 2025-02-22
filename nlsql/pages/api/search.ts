import type { NextApiRequest, NextApiResponse } from "next"
import natural from "natural"

const tokenizer = new natural.WordTokenizer()
const stemmer = natural.PorterStemmer

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { schema, prompt } = req.body

    if (!schema || !prompt) {
      return res.status(400).json({ error: "Missing schema or prompt" })
    }

    const keywords = tokenizer.tokenize(prompt.toLowerCase())
    const stemmedKeywords = keywords.map((word) => stemmer.stem(word))

    const matchingTables = schema.filter((table) => {
      const tableText =
        `${table.name} ${table.columns.map((col) => `${col.name} ${col.type} ${col.description}`).join(" ")}`.toLowerCase()
      const stemmedTableText = stemmer.tokenizeAndStem(tableText)
      return stemmedKeywords.some((keyword) => stemmedTableText.includes(keyword))
    })

    res.status(200).json(matchingTables)
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

