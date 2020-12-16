import xw from 'xwind';
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import LinkList from '../../components/linklist';
import BigTitle from '../../components/bigtitle';

const pages = [
  {link: '/workshops/functional_testing', intra: true, name: 'Functional Testing on Programs', description: 'Test your whole program and its functionnalities', icon: '🚧'},
]

const Workshops = () => (
  <Layout title='Workshops' showPage description='Little coding workshops'>
    <BigTitle height={40}>
      Workshops
    </BigTitle>
    <LinkList list={pages}/>
  </Layout>
);

export default Workshops;