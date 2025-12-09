import { Link } from '@tanstack/react-router'
import type { FC } from 'react'

const Brand: FC = () => (
  <Link to="/">
    <span className="text-red-800">Plugin</span>ify
  </Link>
)

export default Brand
