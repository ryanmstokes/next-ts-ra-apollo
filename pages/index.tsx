import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import ClientOnly from "components/client-only"
import Missions from 'components/missions/';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'provider'
/**
 * Home Page
 * @returns rendered React-Admin Dashboard
 */
const Home = () => {

  return (
    <div>
      <ClientOnly>
        <Admin dataProvider={dataProvider as any}>
          <Resource name="graphql" list={Missions} />
        </Admin>
      </ClientOnly>
    </div>
  )
}

export default Home