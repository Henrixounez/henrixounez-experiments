import xw from 'xwind';
import styled from "@emotion/styled";
import { css } from '@emotion/react';
import Link from "next/link";
import Layout from "./layout";

export const Code = styled.pre(xw`
  bg-gray-800
  text-white
  p-5
  mr-2
  rounded-md
  shadow-md
  overflow-hidden
  text-sm
  whitespace-pre-wrap
`);

export const H1 = styled.h1(xw`text-5xl`);
export const H2 = styled.h2(xw`text-3xl`);
export const H3 = styled.h2(xw`text-xl`);
export const HR = styled.hr(xw`my-14`);
export const CenterHR = styled.hr([xw`my-8 ml-auto mr-auto`, css`width: 70%;`]);
export const Paragraph = styled.div(xw`ml-5`);
export const CodeParagraph = styled.div(xw`ml-5 my-6`);

export const CodeWithComment = ({code, text}) => (
  <div css={xw`flex flex-row items-center`}>
    <Code css={[css`flex: 1;`]}>
      {code}
    </Code>
    <div css={[xw`ml-2`, css`flex: 1;`]}>
      <p>
        {text}
      </p>
    </div>
  </div>
);

export const Summary = ({summaryLinks}) => (
  <ul css={[xw`flex flex-col justify-center`, css`min-height: 70vh;`]}>
    {summaryLinks.map((link, i) => (
      <li css={css`list-style: inside;`} key={i}>
        <Link href={link.link}>
          <a label={link.id} css={xw`hover:underline text-3xl cursor-pointer`}>
            {link.title}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

export const BlogLayout = ({layoutTitle, layoutDescription, title, children, nextChapter}) => (
  <Layout title={layoutTitle} showPage description={layoutDescription}>
    <div css={[css`height: 80vh; width: 80rem; max-width: 90vw;`]}>
      <H1>{title}</H1>
      <br/>
      <br/>
      <Paragraph>
        {children}
      </Paragraph>
      {nextChapter && (
        <H2 css={xw`mt-16 pb-16 underline`}>
          {nextChapter.leading ? nextChapter.leading : "Next up: "}<Link href={nextChapter.link}>{nextChapter.title}</Link>
        </H2>
      )}
    </div>
  </Layout>
);