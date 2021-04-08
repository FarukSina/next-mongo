import { connectToDatabase } from '../../util/mongodb'

export const Listing = ({ properties }) => {
  return <pre>{JSON.stringify(properties, null, 4)}</pre>
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
