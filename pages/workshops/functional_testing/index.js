import xw from 'xwind';
import { css } from '@emotion/react';
import Layout from '../../../components/layout';
import { H1, HR, Summary } from './shared';

const _summaryLinks = [
  {
    title: "1. Code review disaster",
    link: "/workshops/functional_testing/intro"
  },
  {
    title: "2. Introducing a simple automation (Bash)",
    link: "/workshops/functional_testing/bash"
  },
  {
    title: "3. Snakes are pretty good for testing too (Python)",
    link: "/workshops/functional_testing/python"
  },
  {
    title: "4. Asynchronous computation for testing (Javascript)",
    link: "/workshops/functional_testing/javascript"
  }
];

const Workshops = () => (
  <Layout
    title={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Functional Testing',
      }
    ]}
    showPage
    description='Try your program functionnalities easily'
  >
    <div css={[xw``, css`width: 80rem; max-width: 90vw;`]}>
      <H1>Programs Functional Testing 🚧</H1>
      <Summary summaryLinks={_summaryLinks}/>
    </div>
  </Layout>
);

export default Workshops;