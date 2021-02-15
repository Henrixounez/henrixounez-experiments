import Layout from '../components/layout';
import BigTitle from '../components/bigtitle';
import LinkList from '../components/linklist';

const pages = [
  {link: '/spacetracker', intra: true, name: 'Space Tracker', description: 'Space events calendar', icon: '🚀'},
  {link: '/coding', intra: true, name: 'Collaborative Coding', description: 'Online coding experience', icon: '🧑‍💻'},
  {link: '/spotify', intra: true, name: 'Spotify Cities', description: 'Find out where your music is most listened from', icon: '🎶'},
  {link: '/geometry', intra: true, name: 'Geometry', description: 'Geometry visualisations', icon: '📐'},
  {link: '/workshops', intra: true, name: 'Workshops', description: 'Little coding workshops', icon: '💻'},
  // {link: '/avorion_goods', intra: true, name: 'Avorion Goods', description: 'Find and Evaluate trade goods in Avorion', icon: '📈'},
]

const Index = () => (
  <Layout title='Home'>
    <BigTitle height={30}>
      Henrixounez
    </BigTitle>
    <LinkList list={pages}/>
  </Layout>
)

export default Index
