import xw from 'xwind';
import { BlogLayout, CodeParagraph, CodeWithComment } from "../../../../components/BlogShared";

const Intro = () => (
  <BlogLayout
    layoutTitle={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Functional Testing',
        link: '/workshops/functional_testing'
      }, {
        name: 'Intro',
      }
    ]}
    layoutDescription='Try your program functionnalities easily'
    title="1. Code review disaster"
    nextChapter={{link: "/workshops/functional_testing/bash", title: "2. Introducing a simple automation (Bash)"}}
  >
    <p>
      Okay, so a program is a pretty complicated thing, lots of inputs and lots of outputs, I think we can agree on that,<br/>
      So, at some point you <i>might</i> want to see if what you spend 3 hours coding works as expected.<br/>
      Your first experience with testing your program might look something like that:
    </p>
    <CodeParagraph>
      <CodeWithComment
        code={(
          <>
            $ ./my_program 1<br/>
            10
          </>
        )}
        text={(<i>Yep, I wanted it to be 10. Thats nice.</i>)}
      />
      <br/>
      <CodeWithComment
        code={(
          <>
            $ ./my_program 20<br/>
            12
          </>
        )}
        text={(<i>Okay nice, this program seems to work.</i>)}
      />
      <br/>
      <CodeWithComment
        code={(
          <>
            $ ./my_program 123<br/>
            72
          </>
        )}
        text={(<i>Well I don't remember any other test cases, we will say that it works for now.</i>)}
      />
    </CodeParagraph>
    <p>And then suddenly, the next time you will present what you did during a code review:</p>
    <CodeParagraph>
      <CodeWithComment
        code={(
          <>
            $ ./my_program -1<br/>
            SEGFAULT
          </>
        )}
        text={(<i>Hmm...</i>)}
      />
    </CodeParagraph>
    <p>Yes, I agree, this example is very simple, but that's the theory of how you just missed a test case because you tried to remember <b>EVERY</b> test cases.</p>
    <br/>
    <p css={xw`mb-2`}><b>"Well yes I can remember all by heart! Who are you to say that my memory is bad?"</b></p>
    <p>
      Well, I am not judging your incredible memory my friend, but at some point you <i>might</i> need to write every test cases down.<br/><br/>
      What we can do is pretty simple, we can write a big list of tests once, with all the use cases that we can think of, with the inputs and the outputs.<br/>
      Okay, lets do that then
    </p>
    <CodeParagraph>
      <CodeWithComment
        code={(
          <>
            $ ls tests/<br/>
            test1.txt   test2.txt   test3.txt   test4.txt   test5.txt   test6.txt<br/>
            <br/>
            $ cat tests/test1.txt<br/>
            input: 1<br/>
            output: 10<br/>
            <br/>
            $ cat tests/test4.txt<br/>
            input: -1<br/>
            output: Wrong argument
          </>
        )}
        text={(
          <i>
            Should do for now.. We have the inputs and outputs<br/><br/>
            This kind of tests where you test the whole program with its inputs and outputs are called "Functional Tests", opposed to "Unit Tests" which will test only part of a program (Usually a specific feature / function).
          </i>
        )}
      />
    </CodeParagraph>
    <p>With that we can just look at our list and do the test by hand and check the output to see if it is correct.</p>
    <br/>
    <p css={xw`mb-2`}><b>"Hmmm... seems to be a lot of work"</b></p>
    <p>Yup that's why we will now be... </p>
  </BlogLayout>
);

export default Intro;