import { useEffect, useState } from 'react'
import { css, keyframes } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'

import Layout from '../../components/layout'
import DatePrinter from '../../components/date'
import { useSWRInfinite } from 'swr'

const PAGE_SIZE = 12;

const fetcher = url => fetch(url).then(r => r.json())

const Countdown = ({timeString}) => {
  const [duration, setDuration] = useState(new Date(timeString) - new Date());

  useEffect(() => {
    setDuration(new Date(timeString) - new Date());
  }, [timeString]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(duration => duration < 1000 ? 0 : duration - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const padNumber = (number) => (number < 10 && '0') + number;

  const getDurationString = (durationNb) => {
    const days = Math.floor(durationNb / (1000 * 60 * 60 * 24));
    const hours = Math.floor((durationNb % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    const minutes = Math.floor((durationNb % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationNb % (1000 * 60)) / 1000);

    return `${padNumber(days)}:${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  } 

  return getDurationString(duration);
}

const rotateIn = keyframes`
  from: { rotate3d(0, 1, 0, 0deg); }
  to: { rotate3d(0, 1, 0, 180deg); }
`
const rotateOut = keyframes`
  from: { rotate3d(0, 1, 0, 180deg); }
  to: { rotate3d(0, 1, 0, 0deg); }
`

const HeaderLaunch = ({launch}) => {
  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <div className={css(tw`cursor-pointer mb-8 flex flex-row rounded-lg overflow-hidden max-w-7xl`, `min-height: 80vh; box-shadow: 0 30px 60px rgba(0,0,0,0.12);`)}>
      <img className={css(tw`absolute object-cover w-full max-w-7xl rounded-lg`, 'height: 80vh; filter: brightness(70%)')} src={launch.image || '/empty-img.jpg'} alt='launch-image'/>
      <div className={css(tw`w-full flex flex-col`, 'z-index: 1')}>
        <div className={css(tw`flex flex-col justify-between p-5 pb-0 w-full max-w-7xl flex flex-col items-center text-white duration-1000`, `height: ${moreInfo ? '70%' : '100%'}; min-height: max-content`)}>
          <h1 className={css(tw`font-bold text-2xl md:text-5xl text-center`)}>
            {launch.name}
          </h1>
          <div className={css(tw`flex flex-col items-center`)}>
            <h1 className={css(tw`font-bold text-xl md:text-4xl`)}>
              <Countdown timeString={launch.window_start || launch.window_end || launch.net}/><br/>
            </h1>
            <h2 className={css(tw`font-medium text-xl md:text-3xl`)}>
              <DatePrinter dateString={launch.window_start || launch.window_end || launch.net} precise/>
            </h2>
            <img className={css(`margin-top: 10px; height: 30px; width: 30px; transition: 1000ms; transform: rotateX(${moreInfo ? '180' : '0'}deg); `)} onClick={() => setMoreInfo(!moreInfo)} src={'/chevron.svg'} alt='more-infos'/>
          </div>
        </div>
        <div className={css(tw`bg-white duration-1000 overflow-hidden`, `height: ${moreInfo ? '100%' : '0vh'};`)}>
          <div className={css(tw`flex flex-col`, `padding: 0.5rem;`)}>
            <h2 className={css(tw`text-xl md:text-2xl my-2`)}>
              🛰️ <h2 className={css(tw`font-bold inline`)}>{launch?.['mission']?.name}</h2> : {launch?.['mission']?.description}
            </h2>
            <h2 className={css(tw`text-xl md:text-2xl my-2`)}>
              🚀 <h2 className={css(tw`font-bold inline`)}>{launch?.rocket?.configuration?.name}</h2> | {launch?.['launch_service_provider']?.name}
            </h2>
            <h2 className={css(tw`text-xl md:text-2xl my-2`)}>
              🌎 <h2 className={css(tw`font-bold inline`)}>{launch?.pad?.name}</h2> | {launch?.pad?.location?.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpaceList = () => {
  const { data, error, size, setSize } = useSWRInfinite((index, previousData) => {
    if (!!previousData && index * PAGE_SIZE > previousData.count)
      return null;
    return `https://ll${process.env.NODE_ENV === 'development' ? 'dev' : ''}.thespacedevs.com/2.0.0/launch/upcoming/?limit=${PAGE_SIZE}&offset=${index * PAGE_SIZE}`;
  }, fetcher)
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results.length < PAGE_SIZE);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  const handleScroll = () => {
    if (isLoadingMore || isReachingEnd)
      return;
    const lastLoaded = document.querySelector('.launch-list > .launch:last-child')
    if (lastLoaded) {
      const lastLoadedOffset = lastLoaded.offsetTop + lastLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset >= lastLoadedOffset)
        setSize(size + 1)
    }
  }

  const launchData = !data ? [] : data.reduce((acc, e) => {acc.push(...e.results); return acc}, []).flat().filter((e) => ![3, 4, 7].includes(e.status.id));
  return (
    <div>
      {launchData[0] && (
        <HeaderLaunch launch={launchData[0]}/>
      )}
      <div className={"launch-list " + css(tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl`)}>
        {launchData.splice(1).map((launch, i) => (
          <div key={i} className={"launch " + css(tw`rounded-lg overflow-hidden`, `min-height: 50vh; max-height: 50vh; box-shadow: 0 30px 60px rgba(0,0,0,0.12);`)}>
            <div className={css(tw`m-5`, 'min-height: 10vh')}>
              <h1 className={css(tw`font-bold`)}>
                {launch.name}
              </h1>
              <h2>
                <DatePrinter dateString={launch.window_start || launch.window_end || launch.net} day precise/><br/>
              </h2>
              <h3 className={css(tw`font-thin`)}>
                {launch.location}
              </h3>
            </div>
            <img className={css(tw`object-cover`, `height: 40vh; width: 100%`)} src={launch.image || '/empty-img.jpg'} alt="launch-image"/>
          </div>
        ))}
      </div>
      {isLoadingMore && (
        <h1 className={css(tw`text-center pt-10 font-thin text-2xl`)}>
          Loading...
        </h1>
      )}
    </div>
  );
};

const SpaceTracker = ({data}) => (
  <Layout title='Space Tracker' showPage description='Space events calendar'>
    <SpaceList data={data}/>
  </Layout>
);

export default SpaceTracker;