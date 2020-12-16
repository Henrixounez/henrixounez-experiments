import xw from 'xwind';
import { CodeParagraph, CodeWithComment, H2, H3, Paragraph, CenterHR } from "./shared";

const Bash = () => (
  <>
    <H2 id="bash">2. Introducing a simple automation (with bash)</H2>
    <br/>
    <Paragraph>
      <p css={xw`mb-2`}><b>"Hey, nice transition. What do we do now ?"</b></p>
      <p>
        Simple, my friend. We need to write a little bash/shell script to do the work for us.<br/>
        This time, you will have to break a sweat and do a little work for us.<br/>
        First, I want to test this simple C program:
      </p>
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`// test.c

#include <stdlib.h>
#include <stdio.h>

int main(int argc, char **argv) {
if (argc == 2) {
int value = atoi(argv[1]);
printf("%d\\n", value * 3);
return (0);
} else {
return (1);
}
}`}
            </>
          )}
        />
      </CodeParagraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>1. Simple Execution</H3>
      <Paragraph>
        <p>
          Okay, so first step now, is we want our little script to compile and launch this program with a static argument, lets say we give it <b>3</b>.<br/>
          I want it to tell me what command it does, then execute it, and show me these informations:<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>- Output (stdout)</b><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>- Expected output</b><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>- Exit status</b><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<b>- Expected Exit status</b><br/>
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh<br/>
                Testing with: "./a.out 3"<br/>
                Got output: "9" | Should be "9"<br/>
                Exit status: 0  | Should be 0
              </>
            )}
            text={(
              <i>Hint: Don't worry about the formatting</i>
            )}
          />
        </CodeParagraph>
      </Paragraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>2. Genericization (Complex word for a simple idea)</H3>
      <Paragraph>
        <p css={xw`mb-2`}><b>"Fine, I just made a script to launch my binary... Is that useful ?"</b></p>
        <p>
          Yeah, don't worry, it's just the start. You understand now how to execute and get useful informations about the execution process.<br/>
          Now, we will move on to execute lot of tests that way, but writing what you just did everytime is pretty time consumming.<br/>
          What we would want, is to call a function that will do what you did before. We give it the command, expected output and input and returns if thats correct:
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                // tester.sh<br/>
                <br/>
                ...<br/>
                your code<br/>
                ...<br/>
                <br/>
                test "./a.out 3" "9" "0"
              </>
            )}
            text={(<i>For simplicity, call your function "test"</i>)}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh<br/>
                Testing with: "./a.out 3"<br/>
                Got output: "9" | Should be "9"<br/>
                Exit status: 0  | Should be 0
              </>
            )}
            text={(<i>It should give you the same output</i>)}
          />
        </CodeParagraph>
      </Paragraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>3. Mass Execution</H3>
      <Paragraph>
        <p css={xw`mb-2`}><b>"Cool, I have a function to test, with your generici-thing"</b></p>
        <p>
          Yes, now it will be faster to do anything, just have to call your function <i>"test"</i>.<br/>
          Earlier, I was thinking of all the differents tests I could think of<br/>
          <i>There are few cases missing, if you want to add them, feel free to do so...</i><br/>
          Here, I give you the few tests that I had in my little text files :<br/>
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                // test1.txt<br/>
                ./a.out 1<br/>
                output: 3<br/>
                exit: 0<br/>
              </>
            )}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
                // test2.txt<br/>
                ./a.out 5<br/>
                output: 15<br/>
                exit: 0<br/>
              </>
            )}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
                // test3.txt<br/>
                ./a.out -2<br/>
                output: -6<br/>
                exit: 0<br/>
              </>
            )}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
                // test4.txt<br/>
                ./a.out<br/>
                output: nothing<br/>
                exit: 1 (error)<br/>
              </>
            )}
          />
        </CodeParagraph>
        <p>
          Your mission now is to find a way to add these values into your script and executes them all to get this output :<br/>
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh<br/>
                Testing with: "./a.out 3"<br/>
                Got output: "9"  | Should be "9"<br/>
                Exit status: 0   | Should be 0<br/>
                <br/>
                Testing with: "./a.out 5"<br/>
                Got output: "15" | Should be "15"<br/>
                Exit status: 0   | Should be 0<br/>
                <br/>
                Testing with: "./a.out -2"<br/>
                Got output: "-6" | Should be "-6"<br/>
                Exit status: 0   | Should be 0<br/>
                <br/>
                Testing with: "./a.out"<br/>
                Got output: ""   | Should be ""<br/>
                Exit status: 1   | Should be 1
              </>
            )}
            text={(
              <>
                <i>Hints: For now, you can put simply the values inside a array in your script and use length based loop</i>
              </>
            )}
          />
        </CodeParagraph>
      </Paragraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>4. Reporting your mistakes (We hope not !)</H3>
      <Paragraph>
        <p css={xw`mb-2`}><b>"Hmm.. okay fine but now I must check every line if the output is correct, no ?"</b></p>
        <p>
          Yes, you are spot on. Would be nice if someone would be able to make the function <i>"test"</i> tell if the result is correct or not.<br/>
          To test an incorrect one, we will add a test that doesn't work:
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                // test5.txt<br/>
                ./a.out a<br/>
                output: aaa<br/>
                exit: 0<br/>
              </>
            )}
            text={(
              <i>In C a*3 is not equal to "aaa", so this won't work</i>
            )}
          />
        </CodeParagraph>
        <p>
          Then when executing we would want to get this output :
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh<br/>
                Testing with: "./a.out 3"<br/>
                Got output: "9" | should be "9"<br/>
                Exit status: 0  | should be 0<br/>
                Working<br/>
                <br/>
                Testing with: "./a.out 5"<br/>
                Got output: "15" | should be "15"<br/>
                Exit status: 0  | should be 0<br/>
                Working<br/>
                <br/>
                Testing with: "./a.out -2"<br/>
                Got output: "-6" | should be "-6"<br/>
                Exit status: 0  | should be 0<br/>
                Working<br/>
                <br/>
                Testing with: "./a.out"<br/>
                Got output: "" | should be ""<br/>
                Exit status: 1  | should be 1<br/>
                Working<br/>
                <br/>
                Testing with: "./a.out a"<br/>
                Got output: "0" | should be "aaa"<br/>
                Exit status: 0  | should be 0<br/>
                Failing
              </>
            )}
            text={(
              <i>Hint: simple conditions should suffice for this one</i>
            )}
          />
        </CodeParagraph>
      </Paragraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>5. Error Report Compilation</H3>
      <Paragraph>
        <p css={xw`mb-3`}><b>"Okay, that's nice isn't it ? I'm quite proud of myself !"</b></p>
        <p>
          And you should be !<br/>
          We are nearly there on this bash testing course (Except for the bonuses)<br/><br/>
          But there is one thing here that quite bothers me. We still need to search where are the <i>"Failing"</i> ones among the <i>"Working"</i> ones.<br/>
          We should do something to not display the <i>"Working"</i> ones and report only for the <i>"Failing"</i> tests.<br/>
          We also want to know how many tests passed overall. Here is the output we want :
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
{`$ ./tester.sh 
[FAILED]: "./a.out a"
Expected:
  stdout: aaa
  exit status: 0
Got:
  stdout: 0
  exit status: 0

=====

PASSED : 4 / 5`}
              </>
            )}
            text={(
              <>
                <i>As always, formatting doesn't really matter as long as you get the good values</i><br/><br/>
                <i>Here, we have only 4 passing tests out of 5, and we display the informations we have on the failing test in order to repair them.</i>
              </>
            )}
          />
        </CodeParagraph>
        <p css={xw`mb-2`}><b>"Oh cool ! It tells me which test failed and is not spamming me with every test. It works pretty well"</b></p>
        <p>
          Yes, you have a working simple, <i>(yet effective)</i> little bash functional tester.<br/>
          There is still an other (<i>and last</i>) point as a little bonus if you are motivated enough, we will see one way to improve on what we did.
        </p>
      </Paragraph>
      <CenterHR/>
      <H3 css={xw`mb-2`}>6. (Bonus) Going further with files</H3>
      <Paragraph>
        <p css={xw`mb-2`}><b>"I'm brave enough to do the bonus, so what should we do ?"</b></p>
        <p>
          Oh nice, good to see that you want to see more of it !<br/>
          On this last bonus step, instead of writing all of our inputs/outputs inside our bash script file, we will write single files, read them with our script, and use them to execute and check the results.<br/>
          Here, I will show you <i>one way</i> to do it (It is a simple a naive approach, but easy to setup) :
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
{`$ tree
.
├── a.out
├── test.c
├── tester.sh
└── test_files
├── test1
│   ├── exit_status
│   ├── input
│   └── output
├── test2
│   ├── exit_status
│   ├── input
│   └── output
├── test3
│   ├── exit_status
│   ├── input
│   └── output
├── test4
│   ├── exit_status
│   ├── input
│   └── output
└── test5
    ├── exit_status
    ├── input
    └── output
`}
              </>
            )}
            text={(<i>Your folders should look like that. One file for each type of testing data.</i>)}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
{`$ cat test_files/test1/input 
./a.out 3

$ cat test_files/test1/output 
9

$ cat test_files/test1/exit_status 
0`}
              </>
            )}
            text={(<i>Here is example of our files for <b>test1</b>, fill them all with our earlier test values.</i>)}
          />
        </CodeParagraph>
        <p>
          With this new approach, we need to list our subfolders of <b>test_files</b>, and for each one of them get the values in <b>input</b>, <b>output</b> and <b>exit_status</b> files.<br/>
          Then you can put the values inside our earlier <b>"test"</b> function to get our results.<br/>
          Here are some intermediary outputs to help you out :
        </p>
        <CodeParagraph>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh<br/>
                test1<br/>
                test2<br/>
                test3<br/>
                test4<br/>
                test5
              </>
            )}
            text={(
              <i>
                Here, we display all of our folders inside <b>./test_files/</b><br/><br/>
                Hint: Don't use arrays like we did before, you have a very useful command to list files and folders in your terminal.
              </i>
            )}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
                $ ./tester.sh <br/>
                test_files/test1/input<br/>
                test_files/test1/output<br/>
                test_files/test1/exit_status<br/>
                <br/>
                test_files/test2/input<br/>
                test_files/test2/output<br/>
                test_files/test2/exit_status<br/>
                <br/>
                test_files/test3/input<br/>
                test_files/test3/output<br/>
                test_files/test3/exit_status<br/>
                <br/>
                test_files/test4/input<br/>
                test_files/test4/output<br/>
                test_files/test4/exit_status<br/>
                <br/>
                test_files/test5/input<br/>
                test_files/test5/output<br/>
                test_files/test5/exit_status
              </>
            )}
            text={(<i>Next up, we can display all the needed files to read.</i>)}
          />
          <br/>
          <CodeWithComment
            code={(
              <>
{`$ ./tester.sh 
[FAILED]: (test5) "./a.out a"
Expected:
  stdout: aaa
  exit status: 0
Got:
  stdout: 0
  exit status: 0

=====

PASSED : 4 / 5`}
              </>
            )}
            text={(<i>And here, we should have the same result as before, except, we added the name of the test (name of folder) to find out which one fails.</i>)}
          />
        </CodeParagraph>
        <p css={xw`mb-2`}><b>"Ok, thats cool but whats the point ?"</b></p>
        <p>
          Well, first of all, we don't rely on an array written inside the bash script file anymore. That means that it get less bloated and can easily be used in other projects for example.<br/>
          Secondly, here with this example we have a pretty simple input and output, but imagine that we need to give a lot of arguments as well as having a lot of input, it comes very handy to place the very large text inside their own files.
        </p>
      </Paragraph>
      <CenterHR/>
      <p css={xw`text-lg`}>
        Okay brave one, you are now an experienced Bash functionnal tester.<br/><br/>
        You can customize it as much as you want, let's say with <b>colors</b>, more <b>debugging features</b>, the ability to <b>check stderr</b> ?<br/>
        Shell scripts can be complex and are powerful, especially on little tasks like these, and you have the whole power of your terminal with lots of useful commands to use.<br/><br/>
        You have all the tools to test most of your programs, as well as the curiosity (I hope) to expand further and customize this little script we have made together.
      </p>
    </Paragraph>
  </>
);

export default Bash;