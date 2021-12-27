import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.slice(0, 6).map((follower) => {
          return (
            <li key={follower}>
              <a href={`/users/${follower.id}`}>
                <img src={`${follower.avatar_url}`} style={{ borderRadius: '8px' }} />
                <span>{follower.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper >
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);

  const recados = Math.random(100);
  const fotos = Math.random(1000);
  const videos = Math.random(1000);
  const fas = Math.random(3500);
  const mensagens = Math.random(300);

  const confiavel = Math.random(3);
  const legal = Math.random(3);
  const sexy = Math.random(3);
  const pessoasFav = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'felipefialho',
    githubUser
  ];
  const [followers, setFollowers] = React.useState([])
  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => {
        return res.json()
      }).then((respComplete) => {
        setFollowers(respComplete)
      })
    //API GraphQL
    const token = '9f6c6a5831a84feb205c2da20bbd1b'
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: '{ allCommunities { id title _status creatorSlug imageUrl tagUrl } }'
      }),
    })
      .then(res => res.json())
      .then((res) => {
        setComunidades(res.data.allCommunities)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

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
            <OrkutNostalgicIconSet recados={recados}
              fotos={fotos}
              videos={videos}
              fas={fas}
              mensagens={mensagens}
              confiavel={confiavel}
              legal={legal}
              sexy={sexy} />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosform = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString,
                title: dadosform.get('title'),
                imageUrl: dadosform.get('imageUrl'),
                creatorSlug: dadosform.get('creatorSlug'),
                tagUrl: dadosform.get('title').replace(' ', '_')
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
                  name="imageUrl"
                  aria-label="Cole uma url de imagem para capa"
                />
                <input
                  placeholder="Qual seu user?"
                  name="creatorSlug"
                  aria-label="Coloque aqui seu user do github"
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
                    <a href={`/comunidades/${com.tagUrl}`}>
                      <img src={`${com.imageUrl}`} style={{ borderRadius: '8px' }} />
                      <span>{com.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper >
          <ProfileRelationsBox items={followers} title="Seguidores" />

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
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    },
  }).then((res) => res.json())
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  } else {
    const { githubUser } = jwt.decode(token)
    return {
      props: { githubUser }
    }
  }


}