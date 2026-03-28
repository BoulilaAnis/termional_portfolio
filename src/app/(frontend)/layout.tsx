import './styles.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main>{children}</main>
        <Toaster/>
      </body>
    </html>
  )
}
