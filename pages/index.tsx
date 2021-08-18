import ClientOnly from "components/client-only/"
import Missions from 'components/missions/';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'react-admin/provider'

/**
 * Home Page
 * @returns rendered React-Admin Dashboard
 */
const Home = () => {

  const missions = {
    title: "Launches",
    query: 'launchesPast',
    props: [
      { name: 'id', type: 'ID' },
      { name: 'mission_name', type: 'String' },
      { name: 'launch_year', type: 'String' }
    ]
  }

  return (
    <div>
      <div>Admin/Missions</div>
      <ClientOnly>
        <Admin dataProvider={dataProvider as any}>
          <Resource
            name="graphql"
            list={Missions}
            options={{ query: missions.query, props: missions.props }}
          />
        </Admin>
      </ClientOnly>
    </div>
  )
}

export default Home