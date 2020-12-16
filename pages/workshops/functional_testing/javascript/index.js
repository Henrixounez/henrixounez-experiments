import { BlogLayout, H3 } from "../../../../components/BlogShared";

const Javascript = () => (
  <BlogLayout
    layoutTitle={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Functional Testing',
        link: '/workshops/functional_testing'
      }, {
        name: 'Javascript',
      }
    ]}
    layoutDescription='Try your program functionnalities easily'
    title="4. Asynchronous computation for testing (Javascript)"
    nextChapter={{link: "/workshops/functional_testing", title: "Index", leading: "Back to "}}
  >
    <H3>Incoming</H3>
  </BlogLayout>
);

export default Javascript;