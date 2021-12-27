import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'
const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background: #b9a8ca;
  }
  #__next{
    display:flex;
    min-height:100vw;
    flex-direction:column;
  }
  img{
    max-width:100%;
    height:auto;
    display:block;
  }
  ${AlurakutStyles}
`
const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Alurakut - Larissa Santos</title>
          <link rel="shortcut icon" href="/logo-favicon.ico" />
          <meta charset="utf-8" />
          <meta http-equiv="content-language" content="pt-br" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="description" content="Atividade desenvolvida por Larissa Santos na Imersão React 3ª edição da Alura" />
          <meta name="author" content="Larissa Moro S. Santos" />
          <meta name="keywords" content="imersao, react, alura, curso, resultado" />
          <meta name="copyright" content="© 2022 Larissa Santos" />

          <meta property="og:title" content="Alurakut - Larissa Santos" />
          <meta property="og:description" content="Atividade desenvolvida por Larissa Santos na Imersão React 3ª edição da Alura" />
          <meta property="og:url" content="https://alurakut-larimoro.vercel.app/" />
          <meta property="og:image" content="/logo-favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
