export interface SchemaColumn {
  name: string
  type: string
  description: string
}

export interface SchemaTable {
  name: string
  columns: SchemaColumn[]
}

