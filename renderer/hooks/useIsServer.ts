import { useEffect, useState } from 'react'

export default function useIsServer(): boolean {
  const [isServer, setIsServer] = useState(true)

  useEffect(() => {
    setIsServer(false)
  }, [])

  return isServer
}
