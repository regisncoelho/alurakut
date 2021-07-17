import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'


function ProfileSideBar(propriedades) {
  const githubUser = `regisncoelho`;
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
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

function ProfileRelationsBox (propriedades){
  return (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
    {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
      {propriedades.items.map((itemAtual) =>{
        const [usersfollowing, setUsersFollowing] = React.useState([])
        React.useEffect(function (){
          propriedades.items.map (() => {
            fetch(`https://api.github.com/users/${
              itemAtual.login}`)
            .then(response => response.json())
            .then(data => setUsersFollowing(data));
          })

        }, [])
        return (
          <li key={itemAtual.id}>
            <a href={itemAtual.html_url} key={itemAtual.id} target="_blank">
              <img src={itemAtual.avatar_url} />
            <span> {itemAtual.name} </span>
            <span> {usersfollowing.name} </span>
            </a>
          </li>
        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '0',
    name: 'Eu odeio segunda-feira',
    avatar_url: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    html_url: './community.html'
  }]);
  const githubUser = `regisncoelho`;
    
    
const [following, setFollowing] = React.useState([])    
React.useEffect(function () {
    fetch ('https://api.github.com/users/regisncoelho/following')
    .then(function(respostaDoServidor) {
        return respostaDoServidor.json()
      })
    .then(function(respostaConvertida){
        setFollowing(respostaConvertida);
      })
}, [])

  return (
  <>
    <AlurakutMenu />  
    <MainGrid>
      <div className= "profileArea" style={{gridAreas: 'profileArea'}}>
      <ProfileSideBar githubUser={githubUser}/>

      </div>
      <div className= "welcomeArea" style={{gridAreas: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />

        </Box>
        <Box>
          <h2 className="subTitle">O que deseja fazer? </h2>
          <form onSubmit={function handleCreateComunity(e){
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
              type = "text"
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
      <div className= "profileRelationsArea"  style={{gridAreas: 'profileRelationsArea'}}>
        <ProfileRelationsBox title="Devs que eu curto" items={following} 
        // variable={userfollowing} 
        />
        <ProfileRelationsBox title="Comunidades" items={comunidades}/>
      </div>

    </MainGrid>
  </>
  )
}
