import { connectToDatabase } from '../util/mongodb'
import classes from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
export const Listing = ({ properties }) => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {properties.map((data) => {
          return (
            <div className={classes.card}>
              <h3>{data.name}</h3>
              <Image
                src={data.image}
                width="550"
                height="500"
                alt={data.summary}
              />
              <p>${data.price}</p>
              <Link href="/Listings/[id]" as={`/Listings/${data.id}`}>
                <a>Details</a>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { db } = await connectToDatabase()
  const data = await db
    .collection('listingsAndReviews')
    .find()
    .sort({ _id: 1 })
    .limit(40)
    .toArray()
  const properties = data.map((property) => {
    const price = JSON.parse(JSON.stringify(property.price))
    let cleaningFee = 0
    if (property.cleaning_fee !== undefined) {
      cleaningFee = JSON.parse(JSON.stringify(property.cleaning_fee))
      cleaningFee = cleaningFee.$numberDecimal
    }
    return {
      id: property._id,
      name: property.name,
      image: property.images.picture_url,
      address: property.address,
      summary: property.summary,
      guests: property.accommodates,
      price: price.$numberDecimal,
      cleaning_fee: cleaningFee,
    }
  })
  return {
    props: { properties },
  }
}
export default Listing
