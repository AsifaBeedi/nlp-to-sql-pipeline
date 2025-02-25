import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { query } = req.body
      const response = await axios.post("https://nlp-to-sql-pipeline.onrender.com", { query })
      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json({ error: "An error occurred while processing your request" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

