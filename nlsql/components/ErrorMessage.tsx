interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
      <p>{message}</p>
    </div>
  )
}

