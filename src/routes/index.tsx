import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/pages/home.page'
// import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: HomePage,
})
