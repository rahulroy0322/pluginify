import { type FC, useEffect } from 'react'

const BASE_URL = window.location as unknown as string

const MDD: FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('/main.json', BASE_URL)

      const res = await (await fetch(url)).json()

      console.log({
        res,
      })
    }

    fetchData()

    return () => {}
  })

  return <div>hello world!</div>
}

export default MDD
