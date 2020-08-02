import Layout from '../components/layout'
import BigTitle from '../components/bigtitle'
import LinkList from '../components/linklist'

const pages = [
  {link: '/spacetracker', intra: true, name: 'Space Tracker', description: 'Space events calendar', icon: '🚀'}
]

const Index = () => (
  <Layout title='Home'>
    <BigTitle height='70'>
      Welcome to<br/>
      Henrixounez&apos;s<br/>
      Website
    </BigTitle>
    <LinkList list={pages}/>
  </Layout>
)

export default Index
