import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'LariMoro20';
  const [comunidades, setComunidades] = React.useState([{
    id: 0,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);
  const pessoasFav = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'felipefialho', githubUser];
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosform = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString,
                title: dadosform.get('title'),
                image: dadosform.get('image'),
              }
              const newcomunidades = [...comunidades, comunidade]
              setComunidades(newcomunidades)


            }}>
              <div>
                <input
                  placeholder="Qual o nome da comunidade?"
                  name="title"
                  aria-label="Qual o nome da comunidade?"
                  type='text' />
              </div>
              <div>
                <input
                  placeholder="Cole uma url de imagem para capa"
                  name="image"
                  aria-label="Cole uma url de imagem para capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>

            </form>

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map((com) => {
                return (
                  <li key={com.id}>
                    <a href={`/users/${com.title}`}>
                      <img src={`${com.image}`} style={{ borderRadius: '8px' }} />
                      <span>{com.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper >
          <ProfileRelationsBoxWrapper >

            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFav.length})</h2>
            <ul>
              {pessoasFav.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box style={{ gridArea: 'profileRelationsArea' }}>
            comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
