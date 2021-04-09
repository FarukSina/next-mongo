import '../styles/globals.css'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div>
      {router.asPath === '/' ? (
        <h1 style={{ textAlign: 'center', alignItems: 'center' }}>Home Page</h1>
      ) : (
        <h1 style={{ textAlign: 'center', alignItems: 'center' }}>Listings</h1>
      )}

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
