import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import { gql } from "@apollo/client"
import client from "../apollo-client"
import ClientOnly from "components/client-only"
import Launch from "components/launch"

const Home = () => {
  return (
    <div>
      <ClientOnly>
        <Launch />
      </ClientOnly>
    </div>
  )
}
export default Home