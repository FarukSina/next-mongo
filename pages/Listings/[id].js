import Image from 'next/image'
import { connectToDatabase } from '../../util/mongodb'
import classes from '../../styles/Home.module.css'
export const Listings = ({ page }) => {
  return page ? (
    <div className={classes.grid}>
      <div>{page.name}</div>
      <Image
        src={page.images.picture_url}
        alt={page.summary}
        height="800"
        width="1000"
      />
    </div>
  ) : null
}

export async function getStaticPaths(ctx) {
  const { db } = await connectToDatabase()
  const data = await db
    .collection('listingsAndReviews')
    .find()
    .sort({ _id: 1 })
    .limit(40)
    .toArray()
  const paths = data.map((post) => ({
    params: { id: String(post._id) },
  }))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase()
  const page = await db
    .collection('listingsAndReviews')
    .findOne({ _id: params.id })
  return {
    props: { page: JSON.parse(JSON.stringify(page)) },
    revalidate: 30,
  }
}
export default Listings
