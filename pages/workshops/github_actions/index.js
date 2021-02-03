import xw from 'xwind';
import { css } from '@emotion/react';
import { BlogLayout, CodeParagraph, CodeWithComment, H2, Paragraph, CenterHR } from "../../../components/BlogShared";

const Intro = () => (
  <BlogLayout
    layoutTitle={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Github Actions',
      }
    ]}
    layoutDescription='Speed up your workflow with automations'
    title="GitHub Actions"
    nextChapter={{link: "/workshops/", title: "Index", leading: "Back to "}}
  >
    <p>
      Today, we are going to see how to set up simple GitHub Actions, a feature available on GitHub that will help you speed up your workflow and make sure that your projects are ready for production at all times.<br/>
      It can do build, test and deployment of your code directly from your GitHub repository and can help you do code review by detecting faulty merges, and target where the introduced problems are.<br/>
      <br/>
      But first, we need to understand what is :
    </p>
    <CenterHR/>
    <H2 css={xw`mb-2`}>1. CI/CD</H2>
    <Paragraph>
      <p css={xw`mb-2`}>
      Have you heard of <b>CI/CD</b> ? It is a list of simple principles that are meant to help your development and workflow to have constantly working and deliverable project. Here are the details :<br/>
      </p>
      <br/>
      <p css={xw`mb-2`}>
        <b>Continuous Integration (CI)</b>: It is a practice used in software development to check that any new features added to a program don't add bugs to already existing features. 
        There are few way to do that, automatic or manual pre-commit checks, post-commit checks or activated in cloud before merging.<br/>
        <br/>
        <Paragraph>
          =&gt; GitHub Actions can help you by checking that your project still build and that there is no regressions on your unit/functional tests.
        </Paragraph>
      </p>
      <br/>
      <p css={xw`mb-2`}>
        <b>Continuous Delivery (CD)</b>: Means that for each new feature added to your project, you are able to deploy it in development / production environment with direct delivery to end-users.
        It means that at all time, your project is supposed to be built and available to be deployed. By working with Continuous Deployment in mind means that you are going to roll-out features in short development cycles.<br/>
        <br/>
        <Paragraph>
          =&gt; GitHub Actions can help you by building your project and deploy it. For example, for mobile application your can make it deploy on the stores (AppStore / GooglePlay), for website to deploy on your servers, etc...
        </Paragraph>
      </p>
      <br/>
      <p>
        GitHub Actions are composed of "<b>Workflows</b>" that are launched with configurable GitHub <b>events</b>, that could be actions you are doing on your repository like pushing new commits, created a branch, creating a Pull Request or just being launched every day at midnight with a cron for example.<br/>
        Then for these "Workflows" you will set up with configuration files (like a Makefile but with a different syntax) to specify rules and commands, as well as an environment (like specific platforms) and it will execute them when activated.<br/>
        These "Workflows" can be very complex and check for lots of things, and can be used extensively in big projects to manage lots of things and automate the processes.
      </p>
      <br/>
      <p>
        In this Workshop we will only discover how to set up a simple CI on a C Project, but it should be enough for you to know how to set up GitHub Actions on other languages and for other uses.
      </p>
      <br/>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>2. Setting up the Project</H2>
    <Paragraph>
      <p>
        As the name suggest "GitHub Actions" needs you to use GitHub... You can create yourself a new repository on GitHub <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" css={xw`underline text-blue-500`}>here</a>.<br/>
        Name it something like "github-actions-workshop", the name doesn't really matters.
        <br/>
        <br/>
        Then you can <b>clone</b> your repository on your computer.<br/>
        Inside it, you can then create a <b>main.c</b> file:
      </p>
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`// main.c

int main(int argc, char **argv) {
  if (argc != 3) {
    printf("Wrong arguments");
  } else {
    printf("%s %s", argv[1], argv[2]);
  }
}`}
            </>
          )}
          text={(
            <i>
              Just a simple C file that tries to print the two arguments we give it.<br/>
              <br/>
              (Don't worry about the few errors that might on compilation, we will need them later in this workshop).
            </i>
          )}
        />
      </CodeParagraph>
      <p>
        And a <b>Makefile</b> that will compile this file on rule "<b>all</b>" and produce an output binary called "<b>gh_actions</b>" :
      </p>
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`// Makefile
all:  //Compile your program
`}
            </>
          )}
          text={(
            <i>I&apos;ll let you fill that Makefile.</i>
          )}
        />
        <br/>
        <CodeWithComment
          code={(
            <>
{`$ make
/*
* Compilation lines
*/

$ ./gh_actions
Wrong arguments

$ ./gh_actions "Hello" "World"
Hello World
`}
            </>
          )}
          text={(
            <i>You should then be able to compile with make and test your program this way</i>
          )}
        />
      </CodeParagraph>
      <p>
        Okay, now that we have our base for the compilation we can now start working on GitHub Actions.<br/><br/>
      </p>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>3. Simple CI Workflow</H2>
    <Paragraph>
      Like said earlier, Workflows on GitHub Actions are set up with configuration files.<br/>
      They are located in the <b>.github/workflows</b> folder. You shouldn't have it by default, so create this folder.<br/>
      Then you can create your first Workflow file, it is written in YAML, and name it <b>builder.yml</b>
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`$ tree . .github/
.
├── gh_actions
├── main.c
└── Makefile
.github/
└── workflows
    └── builder.yml
`}
            </>
          )}
          text={(
            <i>Your repository should look like that</i>
          )}
        />
      </CodeParagraph>
      <p>
        Workflow files have a lot of different options, but we will only see a few of them. Here are the few things I want your "builder" Workflow to do:<br/>
        <br/>
        <ul css={xw`list-disc ml-5`}>
          <li>Be named "<b>builder</b>"</li> 
          <li>Run on an <b>ubuntu</b> environment</li> 
          <li>Be activated when you <b>push</b> and when you create a <b>pull request</b></li>
          <li>Get your repository on the last commit of your branch</li>
          <li>Runs the "<b>make</b>" command to build your program</li>
        </ul>
        <br/>
        Make sure to name each <b>job</b> and <b>tasks</b> in your workflow with appropriate names like "Build the Project", "Checkout code", "Run Makefile to build", etc..
        <br/><br/>
        <i>Here are some links that could help you set up your workflow:
          <ul css={xw`list-disc ml-5`}>
            <li>
              <a target="_blank" rel="noopener noreferrer" css={xw`underline text-blue-500`} href="https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions">
                Workflow Syntax
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" css={xw`underline text-blue-500`} href="https://docs.github.com/en/actions/reference/events-that-trigger-workflows">
                Workflow Event triggers
              </a>
            </li>
          </ul>
        </i>
        <br/>
        When you think you are done with your Workflow configuration file, you can then <b>push everything</b> you have on your repository (Except the binary if you have compiled it).<br/><br/>
        You can check your launched Actions in the "Actions" tab of your repository : <i>https://github.com/<b>YOUR_NAME</b>/github-actions-workshop/actions</i><br/><br/>
        <img css={[xw`mx-auto my-5 rounded-md shadow-md object-cover`, css`max-height: 300px;`]} src='/workshops/gh_actions/gh_actions1.png' alt='actions list'/>
        If it doesn't appear, you probably have not correctly set up the events for which the Workflow will be launched<br/>
        If it shows you that the Workflow failed, click on it and look at the logs and try to solve the problems.<br/><br/>
        If you have set up correctly your Workflow file, it should appear on this page GitHub Actions should have launched it and it will run. You can click on it and look at the details and it should tell you that its status is "Success"<br/>
        <img css={[xw`mx-auto my-5 rounded-md shadow-md object-cover`, css`max-height: 300px;`]} src='/workshops/gh_actions/gh_actions2.png' alt='succeeding workflow'/>
      </p>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>4. Failing CI</H2>
    <Paragraph>
      If you arrived here, your Workflow should run and succeed on pushes.<br/>
      But currently it is kind of lax, we don't want for example to have any warnings when compiling. You should remember that there are some warnings with our current main.c file, it has an <b>implicit declaration on printf</b>.
      Change your makefile and add flags <b>-Wall -Wextra -Werror</b> to your compilation, to see every warnings and consider them as errors.
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`$ make
/*
* Compilation lines
*/
main.c: In function ‘main’:
main.c:3:5: error: implicit declaration of function ‘printf’ [-Werror=implicit-function-declaration]
    3 |     printf("Wrong arguments");
      |     ^~~~~~
main.c:3:5: error: incompatible implicit declaration of built-in function ‘printf’ [-Werror]
main.c:1:1: note: include ‘<stdio.h>’ or provide a declaration of ‘printf’
  +++ |+#include <stdio.h>
    1 | int main(int argc, char **argv) {
main.c:5:5: error: incompatible implicit declaration of built-in function ‘printf’ [-Werror]
    5 |     printf("%s %s", argv[1], argv[2]);
      |     ^~~~~~
main.c:5:5: note: include ‘<stdio.h>’ or provide a declaration of ‘printf’
cc1: all warnings being treated as errors
make: *** [Makefile:6: "gh_actions"] Error 1
`}
            </>
          )}
          text={(
            <i>You should have these errors when trying to compile your program now</i>
          )}
        />
      </CodeParagraph>
      Now, try to push that, if everything was already correctly set up on the last Workflow file, it should consider that as an error, and the Workflow will fail:
      <img css={[xw`mx-auto my-5 rounded-md shadow-md object-cover`, css`max-height: 300px;`]} src='/workshops/gh_actions/gh_actions3.png' alt='failing workflow'/>
      If you don't have a failing Workflow, check again your workflow to make it fail when the Makefile fails.
      <br/>
      Your CI here fails because of a warning considered as an error, but would be the same if your program didn't compile for any other reasons.<br/>
      You can see why it can be useful, as you don't want to push an unnoticed program that fails to build, or accepting a Pull Request from someone else that doesn't compile !<br/>
      Some of you can see this as useless on our simple example, but on bigger projects with lots of different use cases, imagine if you had to compile everything by hand everytime before pushing..
      <br></br>
      Now you can fix our little in the <b>main.c</b> for the Workflow to work again.
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`// main.c
#include <stdio.h> // <= Here

int main(int argc, char **argv) {
  ...
`}
            </>
          )}
          text={(
            <i>Add the include for the printf to be declared non-implicitely</i>
          )}
        />
      </CodeParagraph>
      You can then push your fixed program, and wait for the Workflow to succeed again.
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>5. Automatic Testing</H2>
    <Paragraph>
      Now we want to test if our program correctly works as intended :
      <ul css={xw`list-disc ml-5`}>
        <li>When there are <b>2 arguments</b> <i>(not counting the argv[0])</i>, it prints us back the two arguments</li>
        <li>When there are <b>not 2 arguments</b> <i>(not counting the argv[0])</i>, it prints us "Wrong arguments"</li>
      </ul>
      Create a <b>very simple</b> functional testing script in "<b>test.sh</b>" to try these two cases.
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`$ ./test.sh 
Trying: ./gh_actions
Got: Wrong arguments
Expected: Wrong arguments

Trying: ./gh_actions Hello World
Got: Hello World
Expected: Hello World

$ echo $?
0
`}
            </>
          )}
          text={(
            <i>
              If it works correctly and the values are correct, it <b>returns 0</b> (Success)<br/><br/>
              <b>You don't have to print the values, it is just to show you what it does !</b>
            </i>
          )}
        />
        <br/>
        <CodeWithComment
          code={(
            <>
{`$ ./test.sh 
Trying: ./gh_actions
Got: Correct arguments ! // <= Here
Expected: Wrong arguments

Trying: ./gh_actions Hello World
Got: Hello World
Expected: Hello World

$ echo $?
1
`}
            </>
          )}
          text={(
            <i>You can try to modify you <b>main.c</b> to print wrong texts, your test should <b>return 1</b> (Failure)</i>
          )}
        />
      </CodeParagraph>
      <i>Here are some links that could help with creating this script:
        <ul css={xw`list-disc ml-5`}>
          <li>
            <a target="_blank" rel="noopener noreferrer" css={xw`underline text-blue-500`} href="https://linuxhint.com/bash_command_output_variable/">
              Executing command and store the result
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" css={xw`underline text-blue-500`} href="https://linuxize.com/post/how-to-compare-strings-in-bash/">
              Compare strings
            </a>
          </li>
        </ul>
      </i>
      <br/><br/>
      Now, change your <b>.github/workflows/builder.yml</b> file to execute the script and test if it works. Your new step on your job should be done after the compilation of your program, in order for it to test it.<br/><br/>
      When you are finished, you can push with a correct main to see if it compiles and test correctly your program:
      <img css={[xw`mx-auto my-5 rounded-md shadow-md object-cover`, css`max-height: 500px;`]} src='/workshops/gh_actions/gh_actions4.png' alt='failing workflow'/>
      You can also try with an incorrect main to see if it correctly fails:
      <img css={[xw`mx-auto my-5 rounded-md shadow-md object-cover`, css`max-height: 500px;`]} src='/workshops/gh_actions/gh_actions5.png' alt='failing workflow'/>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>6. Summing things up</H2>
    <Paragraph>
      <p>
        Well done, now we have a working CI that tries to build our program and launch a test script.<br/><br/>
        It is a very rudimentary Workflow for a very rudimentary program, but the possibilities for GitHub Actions are near infinite : <b>Building, Testing, Deploying and so much more</b> !<br/><br/>
        Know that there are a lot of bare Workflows that are already done for you for a lot of most used languages and frameworks: Javascript, C++, Rust, React, Python, ... just to name a few.<br/><br/>
        You can find them all <a css={xw`underline text-blue-500`} href="https://github.com/actions/starter-workflows/tree/master/ci">in this list</a>, or by clicking on "New Workflow" in the "Actions" tab of your repository.
      </p>
    </Paragraph>
  </BlogLayout>
);

export default Intro;