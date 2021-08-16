import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import ClientOnly from "components/client-only"
import Title from "components/title/"
import { useQuery, gql } from "@apollo/client";
import { PostList } from 'ra/templates/posts';
import buildGraphQLProvider from 'ra-data-graphql';
import { useState, useEffect } from 'react'
import { Admin, Resource } from 'react-admin';
import dataProvider from 'provider.js'
/**
 * Home Page
 * @returns rendered home pages
 */
const Home = () => {

  return (
    <div>
      <ClientOnly>
        <Admin dataProvider={dataProvider as any}>
          <Resource name="graphql" list={PostList} />
        </Admin>
      </ClientOnly>
    </div>
  )
}

export default Home