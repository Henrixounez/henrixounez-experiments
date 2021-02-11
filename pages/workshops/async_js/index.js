import xw from 'xwind';
import { css } from '@emotion/react';
import { BlogLayout, CodeParagraph, CodeWithComment, H2, Paragraph, CenterHR, H3, InlineCode, OutsideLink } from "../../../components/BlogShared";

const Intro = () => (
  <BlogLayout
    layoutTitle={[
      {
        name: 'Workshops',
        link: '/workshops'
      }, {
        name: 'Asynchronous Javascript',
      }
    ]}
    layoutDescription='Optimize your data computation and handling with asynchrounous Javascript'
    title="Asynchronous Javascript"
    nextChapter={{link: "/workshops/", title: "Index", leading: "Back to "}}
  >
    <p>
      If you have already done some Javascript and done some data fetching or computing, you know that it can be a pain to work with big load of data or to use ressources that you need to fetch from somewhere else.<br/>
      Thankfully, Javascript is equipped for that and offer a great deal of tools that will help you handle easily data fetching as well as distributing the task in semi-parallel fashion.<br/>
      If you master them enough, they can be very useful to be able to get data from multiple sources and optimize the time of execution.
    </p>
    <CenterHR/>
    <H2 css={xw`mb-2`}>1. Different kinds of execution</H2>
    <Paragraph>
      <p>
        First, you need to understand how programs works usually and two other way to deal with time during your program:
      </p>
      <br/>
      <H3 css={xw`mb-2`}>Synchrounous Execution</H3>
      <Paragraph>
        The first, easiest and most common one is the synchonous execution of your program.<br/>
        It just means that your program will just follow the execution of your code from one part to the other one in a linear fashion.
      </Paragraph>
      <br/>
      <H3 css={xw`mb-2`}>Asynchronous Execution (Or Concurrent)</H3>
      <Paragraph>
        This one is a bit more tricky. It will execute some tasks "at the same time". Meaning that the thread will switch between different tasks to execute each seemingly together.<br/>
        The advantage of this type of execution compared to the synchronous one is that you can do things while an other one is executing "in the background", and that it is relatively easy to use (depending on the language).<br/>
        The problem is that because it only work in a single thread of processor, it is still limited to the executing of this one and will not be able to expand a lot, especially for computation.<br/>
        But overall, its uses are more common than the third execution type.
      </Paragraph>
      <br/>
      <H3 css={xw`mb-2`}>Parallel Execution (Or Multi-threading)</H3>
      <Paragraph>
        On this one, the leash are removed, meaning that you can use the power of multiple processor threads to execute your program.<br/>
        You are then not limited to only one and can expand a lot your computation needs, especially for data analysis.<br/>
        Its uses are less common, and limited to specific tasks.<br/>
        One major difficulty of this kind of execution is that all your threads (called children) have to talk to each other through different kinds of means (usually sockets) or to report back to a parent thread (through a socket too).<br/>
        It can also be hard to balance the load of execution of each children, but the overall speed is greater than a single thread.
      </Paragraph>
    </Paragraph>
    <div css={xw`my-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
      <div css={xw`flex flex-col items-center`}>
        <img className='dark-aware-img' css={[xw`mx-auto my-5 rounded-md object-cover p-2 duration-500`, css`max-height: 300px;`]} src='/workshops/async_js/synchronous.png' alt='synchrounous execution'/>
        <H3>Synchronous Flow</H3>
      </div>
      <div css={xw`flex flex-col items-center`}>
        <img className='dark-aware-img' css={[xw`mx-auto my-5 rounded-md object-cover p-2 duration-500`, css`max-height: 300px;`]} src='/workshops/async_js/asynchronous.png' alt='synchrounous execution'/>
        <H3>Asynchronous Flow</H3>
      </div>
      <div css={xw`flex flex-col items-center md:col-span-2 lg:col-span-1`}>
        <img className='dark-aware-img' css={[xw`mx-auto my-5 rounded-md object-cover p-2 duration-500`, css`max-height: 300px;`]} src='/workshops/async_js/parallel.png' alt='synchrounous execution'/>
        <H3>Parallel Flow</H3>
      </div>
    </div>
    <CenterHR/>
    <H2 css={xw`mb-2`}>2. Simple Asynchrocity</H2>
    <Paragraph>
      <p css={xw`mb-2`}>
        Okay, so now that we have seen how different kinds of execution works, we can start doing some asynchronicity in Javascript.<br/>
        It will be a Node.js Workshop, but what you learn here can also be used for Front-based JS.<br/>
        We are going to start with learning how async functions works, how to use the await keywork as well as a simple Promise.<br/>
        <br/>
        Here are the main things you need to know:
        <ul css={xw`list-disc ml-5`}>
          <li><b>async: </b>
            A keyword you can place on your function to make it asynchronous, all Javascript functions are synchronous by default.<br/>
            When an asynchronous function is called, it will be executed alongside the main execution process, and will disappear when it is finished.<br/>
            <CodeParagraph>
              <CodeWithComment
                code={(
                  <>
{`async function i_am_async() {
  ... doing things ...
  console.log('Finished i_am_async');
}

function main() {
  i_am_async();
  ... doing things ...
  console.log('Finished main');
}
`}
                  </>
                )}
                text={(
                  <i>
                    Here, the <b>i_am_async</b> function will be executed alongside the <b>main</b> function.<br/><br/>
                    If we suppose the things the i_am_async function is doing takes a longer time than the things in main, we will see the "Finished main" before the "Finished i_am_async", because the main will not wait for the async function to do its things.
                  </i>
                )}
              />
            </CodeParagraph>
          </li>
          <li><b>await: </b>
            A keyword you can place when calling async functions, because your async functions are executed next to your main process, you may want to wait for them to finish, or to be able to get their return values.<br/>
            This keyword will permit that by waiting for the function and resolve the Promise (meaning that it will extract the value that was inside the Promise).
            <CodeParagraph>
              <CodeWithComment
                code={(
                  <>
{`async function i_am_async() {
  ... doing things ...
  console.log('Finished i_am_async');
  return "Async Return";
}

function main() {
  const result = await i_am_async();
  console.log("Async result: ", result);
  ... doing things ...
  console.log('Finished main');
}
`}
                  </>
                )}
                text={(
                  <i>
                    In this example, the <b>main</b> will not execute its things before the <b>i_am_async</b> function is finished.<br/><br/>
                    It is also useful to be able to get the return value of the function (because otherwise, the main function will be far into its execution and might not care about the return value anymore).<br/><br/>
                    Here, we will see "Finished i_am_async", then "Async result: Async Return", and finally "Finished main".
                  </i>
                )}
              />
            </CodeParagraph>
          </li>
          <li><b>Promise: </b>
            A class that encapsulate everything asynchrounous in Javascript, you won't have to use it that much, but it is useful to know how they work.<br/>
            It can be instantiated as a class, and can be waited. However, they won't go pass the wait until their resolve function is called.<br/>
            Promise is actually implicitely used each time you create a async function. When you instanciate the function, it create a Promise, and the return value is actually calling the resolve.<br/>
            It is not widely useful to use Promise, as just marking a function as async is generally enough, but it some specific cases it might be the only way to do something.
            <CodeParagraph>
              <CodeWithComment
                code={(
                  <>
{`function i_am_async() {
  return new Promise(
    (resolve) => {
      ... doing things ...
      console.log('Finished i_am_async');
      resolve("Async Return");
    } 
  )
}

function main() {
  const result = await i_am_async();
  console.log("Async result: ", result);
  ... doing things ...
  console.log('Finished main');
}
`}
                  </>
                )}
                text={(
                  <i>
                    Here, this example works exactly as the last one. You can see that the <b>i_am_async</b> function is not marked as <b>async</b>, but works the same.<br/><br/>
                    This function returns an instance of a Promise, and to make that Promise finish (and finish the await in the main), it calls the <b>resolve</b> function.<br/><br/>
                    The argument in the resolve function is the return value of the Promise (here, can be interpreted as the return value of the function). You can also call resolve without any arguments, and can be interpreted as a void function.
                  </i>
                )}
              />
            </CodeParagraph>
          </li>
        </ul> 
      </p>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>3. Waiting for something</H2>
    <Paragraph>
      <p css={xw`mb-2`}>
        Okay, now that you have the concepts, we can go into trying to practice them.<br/>
        I want to have a function called <b>wait</b> that takes as argument a number of seconds you want to wait. When you will call this function and await it, you should be waiting this amount of time.<br/>
        You will need the three principles we saw earlier for this exercise.
      </p>
      <CodeParagraph>
        <CodeWithComment
          code={(
            <>
{`// index.js

... wait(seconds) {
  ...
}

function main() {
  const start = new Date();
  console.log('Start');

  wait(5);

  const end = new Date();
  const time = (end.getTime() - start.getTime()) / 1000;
  console.log('Waited', time, 's');
  process.exit(0);
}

main();
`}
            </>
          )}
          text={(
            <i>
              Complete the wait function to make it wait the 5 seconds.<br/><br/>
              Be careful, there are missing things on the main function, you have to change it to make it work!
            </i>
          )}
        />
        <br/>
        <CodeWithComment
          code={(
            <>
{`$ node index.js
Start waiting
Waited 5.009 s
`}
            </>
          )}
          text={(
            <i>
              You can see here that we have correctly waited 5 seconds.<br/>
              (A little margin of error is to be expected, every process is not instantaneous)
            </i>
          )}
        />
      </CodeParagraph>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>4. Multiple execution</H2>
    <Paragraph>
      <p css={xw`mb-10`}>
        Now that you have your <b>wait</b> function all done and working well, we can see how multiple functions can happen at the same time.<br/>
        First, code a function called <b>printThings</b> that takes as an argument a number <b>n</b>, and will print an index incrementing with a delay of 1 second between each print.<br/>
        It should also have a return value which is the number given as argument.
        <CodeParagraph>
          <CodeWithComment
            code={
`function main() {
  const result = printThings(5);
  console.log('Result is', result);
  process.exit(0);
}`}
            text={(
              <i>
                Here, the printThings should print 5 times and last approximately 5 seconds
              </i>
            )}
          />
          <br/>
          <CodeWithComment
            code={
`$ node index.js
[LOG] Starting printing
0
[LOG] Started 1.005 seconds ago
1
[LOG] Started 2.006 seconds ago
2
[LOG] Started 3.006 seconds ago
3
[LOG] Started 4.008 seconds ago
4
[LOG] Started 5.009 seconds ago
[LOG] Finished
Result is 5
`
            }
            text={(
              <i>
                You don't have to do the lines starting with <b>[LOG]</b>.<br/><br/>
                They are here just to help you understand how the function should work.
              </i>
            )}
          />
        </CodeParagraph>
      </p>
      <p css={xw`mb-2`}>
        Now that you have done the <b>printThings</b> function, you can try to have multiple ones at the same time!
        <CodeParagraph>
          <CodeWithComment
            code={
`function main() {
  printThings(4);
  printThings(5);
  printThings(6);
  printThings(7);
}`
            }
            text={
              <i>(You can comment out what you did to get the return value)</i>
            }
          />
          <br/>
          <CodeWithComment
            code={
`$ node index.js
0
0
0
0
1
1
1
1
2
2
2
2
3
3
3
3
4
4
4
5
5
6`
            }
            text={
              <i>
                Here, you can see the magic happen, as they are all executing at the same time.<br/>
              </i>
            }
          />
        </CodeParagraph>
        <br/>
        As you can see, the multiple functions work at the same time and will print their values.<br/>
        Now we would want to be able to get all the return values of these functions and print them (It will be 4, 5, 6 and 7).<br/>
        Be careful! I don't want them to execute one at a time, they should all be executed at the same time!
        <CodeParagraph>
          <CodeWithComment
            code={
`$ node index.js
0
0
0
0
1
1
1
1
2
2
2
2
3
3
3
3
4
4
4
5
5
6
Results: 4 5 6 7
`
            }
            text={
              <i>
                There is a simple function that exist on the Promise class that helps you with that. No need to get too complicated on this one!
              </i>
            }
          />
        </CodeParagraph>
      </p>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>5. Asynchronous cats</H2>
    <Paragraph>
      <p css={xw`mb-2`}>
        Okay, so we'll get into more fun, cuteness and furry cats now. We'll fetch some data from an API called <OutsideLink href="https://cataas.com">cataas</OutsideLink> (Cat As A Service), which is an API where you can fetch cat pictures.<br/>
        We'll use this to demonstrate the asynchronicity of data fetching from an API (And maybe also have some fun looking at those cats).<br/><br/>
        First, I want you to install <b>axios</b>, a Promise based client made for fetching / sending data. (Here we will only fetch) widely used in Javascript.<br/>
        You can installing it by doing <InlineCode>npm install axios</InlineCode> in your folder (I recommend having a clean folder with only your index.js in it. npm install will create a node_modules folder where you are with all dependencies inside).<br/><br/>
        You can read about axios and see few example of usage here: <OutsideLink href="https://github.com/axios/axios">Axios</OutsideLink><br/><br/>
        Okay, so our first thing will be to fetch a list of cats listed as cute from the cataas API.<br/>
        You will do a <InlineCode>axios.get</InlineCode> on this url: <OutsideLink href="https://cataas.com/api/cats?tags=cute">cataas.com/api/cats?tags=cute</OutsideLink> and you will get the result inside a variable.
        <CodeParagraph>
          <CodeWithComment
            code={
`const axios = require('axios');

...

function main() {
  const cuteCats = getCuteCats();
  console.log(cuteCats);
  process.exit(0);
}`
            }
            text={
              <i>
                As always, this main will not work straightaway, you have few changes to make on it!
              </i>
            }
          />
          <br/>
          <CodeWithComment
            code={
`$ node index.js
[
  {
    id: '595f280c557291a9750ebf80',
    created_at: '2015-11-06T18:36:37.342Z',
    tags: [ 'cute', 'eyes' ]
  },
  {
    id: '595f280e557291a9750ebf9f',
    created_at: '2016-10-09T12:51:24.421Z',
    tags: [ 'cute', 'sleeping' ]
  },
...
...
  {
    id: '595f2809557291a9750ebf31',
    created_at: '2016-04-13T14:20:46.638Z',
    tags: [ 'cute', 'orange' ]
  },
  {
    id: '595f2809557291a9750ebf35',
    created_at: '2015-11-06T18:36:17.589Z',
    tags: [ 'cute' ]
  }
]
`
            }
            text={
              <i>
                You should get this large array of objects with ids and other informations<br/><br/>
                It is okay if you don't have exactly the same values.
              </i>
            }
          />
        </CodeParagraph>
        <br/><br/>
        Now we will download all those cats. You won't have to find how to do that, here i'll give you a magic function that when you give it an id, it will download it and place it in your folder:
        <CodeParagraph>
          <CodeWithComment
            code={
`const axios = require('axios');
const fs = require('fs');

...

async function downloadCat(id) {
  const url = 'https://cataas.com/cat?id=' + id;
  const response = await axios({url, responseType: 'stream'});
  const stream = fs.createWriteStream(id + '.jpg');
  response.data.pipe(stream);
  await new Promise(resolve => stream.on('finish', resolve));
}`
            }
            text={
              <i>
                This function will do a request for the image, and pipe it to a file using a writeStream.<br/><br/>
                You don't have to understand everything it does, just that it will download a file from the cataas API.
              </i>
            }
          />
          <br/>
          <CodeWithComment
            code={
`function main() {
  const cuteCats = getCuteCats();
  downloadCat(cuteCats[0].id);
  process.exit(0);
}`
            }
            text={
              <i>
                You should now be able to download a cat, here you will download the first one.<br/><br/>
                Make sure that it correctly downloaded, and you can now look at your first cat picture!
              </i>
            }
          />
        </CodeParagraph>
      </p>
    </Paragraph>
    <CenterHR/>
    <H2 css={xw`mb-2`}>6. I want all the cats!</H2>
    <Paragraph>
      <p css={xw`mb-2`}>
        Okay, now that we are able to download one cat, it is time to download all of the cute ones.<br/><br/>
        You can start by doing a simple for loop through all the cute cats. Wait for it to be finished and then go to the next one:
        <CodeParagraph>
          <CodeWithComment
            code={
  `$ node index.js
  Done 1 out of 70
  Done 2 out of 70
  Done 3 out of 70
  ...
  ...
  Done 68 out of 70
  Done 69 out of 70
  Done 70 out of 70`
            }
            text={
              <i>
                You should have all your cat pictures that should download one by one.<br/><br/>
                Here, I just added a print in my loop to know where I am with my download and to make it obvious for you how it is supposed to works.
              </i>
            }
          />
        </CodeParagraph>
        <br/>
        Okay, now you have all the cats, but you might have had to wait a while. If you are running a time on your command, you might see that it takes a long time to download these 70 cats:
        <CodeParagraph>
          <CodeWithComment
            code={
`$ time node index.js
Done 1 out of 70
Done 2 out of 70
Done 3 out of 70
...
...
Done 68 out of 70
Done 69 out of 70
Done 70 out of 70

________________________________________________________
Executed in   35.50 secs   fish           external 
   usr time  920.75 millis  474.00 micros  920.27 millis 
   sys time  250.29 millis   96.00 micros  250.19 millis 
`
            }
            text={
              <i>
                You can see here that my execution time is of 35.5 seconds.
              </i>
            }
          />
        </CodeParagraph>
        <br/>
        It is not very efficient, and we want to be able to download them as fast as possible, in an asynchronous fashion. Much like how your <b>printThings</b> functions earlier.<br/>
        Find a way to download all those cats as fast as you can, "at the same time".
        <CodeParagraph>
          <CodeWithComment
            code={
`$ time node index.js
Done cat n°11
Done cat n°8
Done cat n°3
Done cat n°2
Done cat n°6
Done cat n°7
...
...
Done cat n°50
Done cat n°27
Done cat n°40
Done cat n°21
Done cat n°60

________________________________________________________
Executed in   10.05 secs   fish           external 
   usr time  825.26 millis  248.00 micros  825.01 millis 
   sys time  187.18 millis   51.00 micros  187.13 millis 
`
            }
            text={
              <i>
                Now our execution time is only of 10 seconds, which is a 3x improvement over the last one!<br/><br/>
                Like last time, you are not expected to write the logs, it is there to make you understand that they are done in an asynchronous fashion.
              </i>
            }
          />
        </CodeParagraph>
        Nice, now we have every cute cats, and they have been fetched quickly!
      </p>
    </Paragraph>
    <CenterHR/>
    <H2>7. Wrapping things up</H2>
    <p>
      Thats all for this workshop in asynchronous Javascript, you have seen the main ways of doing asynchronicity and can use it everywhere in your Javascript now, either to make fetching or faster data computing.<br/>
      <br/>
      On the last exercise, our execution time has been greatly reduced with asynchronicity compared to a step by step method. However, we are limited to the amount of work a single thread of CPU can do.<br/>
      We won't see it here, but to make it even faster, you could go into the realm of the Parallel Execution, by making a parent process delegate the task of downloading to multiple children, one on each CPU thread.<br/>
      For example, if you CPU have 8 thread, you could potentially speed up things 7 or 8 times (If you are not bottlenecked by your network or HDD/SSD writing speeds).<br/>
      <br/>
      Anyway, I hope you liked it. Asynchrocity can be used in a lot of use cases, especially in web development where you have to communicate with your API, and wait for their response or an API talking to an other API or if you have big (but not too big) computation needs that can be in parallel like our cat fetching.
    </p>
  </BlogLayout>
);

export default Intro;