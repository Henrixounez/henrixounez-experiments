import { useState, useEffect } from 'react'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Router, { useRouter } from "next/router"

import Layout from '../../components/layout'
import Date from '../../components/date'
import { useSWRInfinite } from 'swr'

const PAGE_SIZE = 10;

const fetcher = url => fetch(url).then(r => r.json())

const SpaceList = () => {
  const { data, error, size, setSize } = useSWRInfinite((index, previousData) => {
    if (!!previousData && index * 10 > previousData.count)
      return null;
    return `https://ll.thespacedevs.com/2.0.0/launch/upcoming/?limit=${PAGE_SIZE}&offset=${index * 10}`;
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

  const launchData = !data ? [] : data.reduce((acc, e) => {acc.push(...e.results); return acc}, [])
  return (
    <div className={css(tw`py-10 lg:py-20`)}>
      <div className={"launch-list " + css(tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl`)}>
        {launchData.flat().map((launch, i) => (
          <div key={i} className={"launch " + css(tw`rounded-lg overflow-hidden`, `min-height: 50vh; max-height: 50vh; box-shadow: 0 30px 60px rgba(0,0,0,0.12);`)}>
            <div className={css(tw`m-5`, 'min-height: 10vh')}>
              <h1 className={css(tw`font-bold`)}>
                {launch.name}
              </h1>
              <h2>
                <Date dateString={launch.window_start || launch.window_end || launch.net} day precise/><br/>
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
  <Layout title='Space Tracker' currentPage='Space Tracker' description='Space events calendar'>
    <SpaceList data={data}/>
  </Layout>
);

export default SpaceTracker;