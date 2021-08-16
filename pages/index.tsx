import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import ClientOnly from "components/client-only"
import Title from "@/components/title/"
import { useQuery, gql } from "@apollo/client";

/**
 * Home Page
 * @returns rendered home pages
 */
const Home = () => {

  const QUERY = gql`
    query {
        launchesPast {
        mission_name
        }
	}
`
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  const lastLaunch = data.launchesPast[0].mission_name
  return (
    <div>
      <ClientOnly>
        <Title title={lastLaunch} />
      </ClientOnly>
    </div>
  )
}

export default Home