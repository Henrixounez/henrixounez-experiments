import { BlogLayout, H3 } from "../shared";

const Python = () => (
  <BlogLayout
    layoutTitle={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Functional Testing',
        link: '/workshops/functional_testing'
      }, {
        name: 'Python',
      }
    ]}
    layoutDescription='Try your program functionnalities easily'
    title="3. Snakes are pretty good for testing too (Python)"
    nextChapter={{link: "/workshops/functional_testing/javascript", title: "4. Asynchronous computation for testing (Javascript)"}}
  >
    <H3>Incoming</H3>
  </BlogLayout>
);

export default Python;