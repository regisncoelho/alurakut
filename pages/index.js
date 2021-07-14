// import styled from 'styled-components'
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
 
export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '0',
    title: 'Eu odeio segunda-feira',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = `regisncoelho`;
  const devsFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'Dadarkp3',
    'jeniblodev',
    'robertaarcoverde',
    ]
    
    
    // fetch ('https://api.github.com/users/regisncoelho/following')
    // .then(function(respostaDoServidor) {
    //   return respostaDoServidor.json()
    // })
    // .then(function(respostaConvertida){
    //   var following = respostaConvertida
    //   console.log(following[0].login)
    // })

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
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Devs que eu curto ({devsFavoritas.length})
          </h2>
          <ul>
          {devsFavoritas.map((itemAtual) =>{
            return (
            <li key={itemAtual}>
            <a href={`/users/${itemAtual}`} key={itemAtual}>
              <img src={`https://github.com/${itemAtual}.png`} />
              <span> {itemAtual} </span>
            </a>
            </li>
            )
          })
          }
        </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) =>{
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                    <img src={itemAtual.image} />
                    <span> {itemAtual.title} </span>
                  </a>
                </li>
               )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>

    </MainGrid>
  </>
  )
}
