import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import xw from 'xwind';
import axios from 'axios';
import Layout from '../../components/layout';
import { useRouter } from 'next/router'
import mq from '../../components/breakpoints';

const sizes = {
  0:    xw`text-5xl  md:text-6xl font-black`,
  1:    xw`text-4xl  md:text-5xl font-extrabold`,
  2:    xw`text-3xl  md:text-4xl font-bold`,
  3:    xw`text-2xl  md:text-3xl font-semibold`,
  4:    xw`text-xl   md:text-2xl font-medium`,
  5:    xw`text-base md:text-xl  font-normal`,
  base: xw`text-base`,
};
const imgSizes = {
  0:    `3rem`,
  1:    `2.25rem`,
  2:    `1.875rem`,
  3:    `1.5rem`,
  4:    `1.25rem`,
  5:    `1.125rem`,
  base: `0.875rem`,
};

const Spotify = () => {
  const [token, setToken] = useState(null);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  const getCities = async (token) => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API + '/spotify/cities?token=' + token);
      setCities(res.data);
    } catch (e) {
      console.error(e);
      sessionStorage.removeItem('spotify-token');
      setToken(null);
    }
  }

  useEffect(() => {
    const code = router.query['code'];
    if (code) {
      setToken(code);
      router.replace('/spotify', undefined, {shallow: true});
      getCities(code);
      sessionStorage.setItem('spotify-token', code);
    }
  }, [router]);

  useEffect(() => {
    const stored_token = sessionStorage.getItem('spotify-token') || null;
    if (stored_token) {
      setToken(stored_token);
      getCities(stored_token);
    }
  }, []);

  return (
    <Layout title='Spotify' showPage description='Find out which city are you on Spotify'>
      { token === null ? (
        <a
          css={[xw`p-4 rounded-md flex flex-row items-center gap-2 text-white font-bold`, css`background-color: #1DB954;`]}
          href={
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
            '&scope=' + encodeURIComponent('user-top-read') +
            '&redirect_uri=' + encodeURIComponent(process.env.NEXT_PUBLIC_API + '/spotify/callback') +
            '&state=' + (process.env.NODE_ENV === "development" ? "http://localhost:3000/spotify" : "https://henrixounez.com/spotify")
          }
        >
          Connect with
          <img src='/Spotify_Logo_RGB_White.png' css={css`max-height: 2rem;`}/>
        </a>
      ) : (
        <div css={[xw`flex flex-col relative px-4 mb-40`, css`top: 15vh;`]}>
          {cities.length === 0 ? (
            <div css={[xw`flex flex-row items-center justify-center`]}>
              <div css={[
                xw`animate-bounce rounded-full`,
                css`
                  width: 4rem;
                  height: 4rem;
                  background-color: #1DB954;
                `]}/>
            </div>
          ) : (
            <div css={xw`mb-32`}>
              <h1 css={xw`text-4xl font-black`}>
                Your Spotify musical taste matches you with these cities :
              </h1>
              <p css={xw`text-sm font-thin`}>
                (Scores are based on the ranking of number of listeners by city for each of your preferred artists)
              </p>
            </div>
          )}
          {cities.map((city, i) => (
            <div key={i} css={[xw`flex flex-row items-center`, css`margin-bottom: ${i < 6 ? `${((6 - i) * 1.2)}rem` : '0.5rem'}`]}>
              <p
                css={[
                  sizes[i] || sizes.base,
                  css`
                    ${i === 0 && 'color: #1DB954;'}
                    width: 90px;
                    min-width: 90px;
                    ${mq[1]} {
                      width: 150px;
                    }
                  `
                ]}
              >
                #{i + 1}
              </p>
              <div
                css={[
                  xw`flex flex-row justify-start mr-8`,
                  css`
                    width: 60px;
                    min-width: 60px;
                    ${mq[1]} {
                      width: 80px;
                    }
                  `
                ]}
              >
                <img
                  src={`https://cdn.staticaly.com/gh/hampusborgos/country-flags/master/svg/${city.country.toLowerCase()}.svg`}
                  css={[
                    css`max-height: ${imgSizes[i] || imgSizes.base}`,
                  ]}
                />
              </div>
              <p
                css={[
                  sizes[i] || sizes.base,
                  css`
                    ${i === 0 && 'color: #1DB954;'}
                  `
                ]}
              >
                {city.name} ({city.country})
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Spotify;