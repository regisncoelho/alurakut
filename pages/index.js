import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'


function ProfileSideBar(propriedades) {
  const githubUser = `regisncoelho`;
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}></img>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          Régis Coelho
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const githubUser = `regisncoelho`;
  const [comunidades, setComunidades] = React.useState([]);
  const [following, setFollowing] = React.useState([])
  const [usersfollowing, setUsersFollowing] = React.useState([])

  React.useEffect(function () {
    fetch('https://api.github.com/users/regisncoelho/following')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaConvertida) {
        setFollowing(respostaConvertida);
      })

      following.map((itemAtual) => {
        fetch(`https://api.github.com/users/${itemAtual.login}`)
          .then(response => response.json())
          .then(data => setUsersFollowing(data));
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5df29b55cdb9a24bd01c337df33496',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id
          thumbUrl
          communityUrl
          communityName
          createdAt
        }}`
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        const dataReceivedFromDato = responseData.data.allCommunities
        setComunidades(dataReceivedFromDato)
      })
  }, [])
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridAreas: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />

        </div>
        <div className="welcomeArea" style={{ gridAreas: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que deseja fazer? </h2>
            <form onSubmit={function handleCreateComunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)

            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridAreas: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Devs que eu curto ({following.length})
            </h2>
            <ul>
              {following.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.html_url} key={itemAtual.id} target="_blank">
                      <img src={itemAtual.avatar_url} />
                      <span> {usersfollowing.name} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.communityUrl} key={itemAtual.id} target="_blank">
                      <img src={itemAtual.thumbUrl} />
                      <span> {itemAtual.communityName} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
