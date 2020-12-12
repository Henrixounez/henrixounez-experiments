import { css, keyframes } from '@emotion/react';
import Image from 'next/image';
import xw from 'xwind';
import Layout from '../../components/layout';
import LinkList from '../../components/linklist';

const texts = [
  [{name: 'Front-end', weight: 600}, {name: 'Full-Stack', weight: 800}, {name: 'Back-end', weight: 300}, {name: 'Student', weight: 100}],
  [{name: '21 years old', weight: 100}, {name: 'Developper', weight: 900}, {name: 'Javascript', weight: 200}, {name: 'React', weight: 700}],
  [{name: 'Typescript', weight: 400}, {name: 'Space-Fan', weight: 100},  {name: 'Next.js', weight: 500}, {name: 'Node.js', weight: 700}]
];
const credits = [
  {link: 'https://thespacedevs.com/', name: 'The Space Devs', description: 'Data for Space Tracker', icon: '🚀'}
]

const animationSpeeds = [
  20,
  30,
  15
]

const textAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;


const About = () => {
  return (
    <Layout title='About'>
      <div css={[xw`flex flex-col items-center max-w-full`, css`width: 1280px`]}>
        <div css={[xw`rounded-full overflow-hidden`, css`height: 300px`]}>
          <Image height='300' width='300' src='/profile.jpg' alt='profile-pic'/>
        </div>
        <div css={xw`flex flex-row justify-center items-center pt-5`}>
          <h1 css={xw`text-3xl md:text-5xl font-black`}>
            Henrixounez
          </h1>
          <a href='https://www.github.com/henrixounez' css={xw`relative w-10 hover:w-11 h-10 hover:h-11 duration-200 ml-5 rounded-full`}>
            <div css={[xw`absolute bg-white rounded-full`, css`top: 3%; left: 3%; width: 94%; height: 94%;`]}/>
            <Image layout='fill' src='/github-icon.svg' alt='github-icon'/>
          </a>
        </div>
        <div css={xw`overflow-hidden pt-5 max-w-full`}>
          { texts.map((chunk, i) => (
            <div key={i} css={xw`flex flex-row`}>
              <div css={[xw`flex flex-row`, css`animation: ${textAnimation} ${animationSpeeds[i]}s linear infinite`]}>
                {chunk.map((e, i2) => (
                  <h2 key={i2} css={[xw`text-5xl md:text-5rem px-5 md:px-20 whitespace-nowrap`, css`font-weight: ${e.weight}`]}>
                    {e.name}
                  </h2>
                ))}
              </div>
              <div css={[xw`flex flex-row`, css`animation: ${textAnimation} ${animationSpeeds[i]}s linear infinite;transition-delay: ${animationSpeeds[i] / 2}s`]}>
                {chunk.map((e, i2) => (
                  <h2 key={i2} css={[xw`text-5xl md:text-5rem px-5 md:px-20 whitespace-nowrap`, css`font-weight: ${e.weight}`]}>
                    {e.name}
                  </h2>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div css={xw`flex flex-col items-center pt-16 max-w-full`}>
          <h1 css={xw`text-3xl md:text-5xl font-black`}>
            Credits
          </h1>
          <LinkList list={credits}/>
        </div>
      </div>
    </Layout>
  )
}

export default About;