import { css, keyframes } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
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
      <div className={css(tw`flex flex-col items-center max-w-full`, `width: 1280px`)}>
        <img src='/profile.jpg' alt='profile-pic' className={css(tw`h-32 md:h-64`)}/>
        <div className={css(tw`flex flex-row justify-center items-center pt-5`)}>
          <h1 className={css(tw`text-3xl md:text-5xl font-black`)}>
            Henrixounez
          </h1>
          <a href='https://www.github.com/henrixounez'>
            <img className={css(tw`h-10 pl-5 hover:h-11 duration-200`)} src='/github-icon.svg' alt='github-icon'/>
          </a>
        </div>
        <div className={css(tw`overflow-hidden pt-5`, `width: 99vw; max-width: 1920px;`)}>
          { texts.map((chunk, i) => (
            <div key={i} className={css(tw`flex flex-row`)}>
              <div className={css(tw`flex flex-row`, `animation: ${textAnimation} ${animationSpeeds[i]}s linear infinite`)}>
                {chunk.map((e, i2) => (
                  <h2 key={i2} className={css(tw`text-5xl md:text-5rem px-5 md:px-20 whitespace-no-wrap`, `font-weight: ${e.weight}`)}>
                    {e.name}
                  </h2>
                ))}
              </div>
              <div className={css(tw`flex flex-row`, `animation: ${textAnimation} ${animationSpeeds[i]}s linear infinite;transition-delay: ${animationSpeeds[i] / 2}s`)}>
                {chunk.map((e, i2) => (
                  <h2 key={i2} className={css(tw`text-5xl md:text-5rem px-5 md:px-20 whitespace-no-wrap`, `font-weight: ${e.weight}`)}>
                    {e.name}
                  </h2>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={css(tw`flex flex-col items-center pt-16`)}>
          <h1 className={css(tw`text-3xl md:text-5xl font-black`)}>
            Credits
          </h1>
          <LinkList list={credits}/>
        </div>
      </div>
    </Layout>
  )
}

export default About;