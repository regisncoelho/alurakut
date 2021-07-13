// import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'


function ProfileSideBar(propriedades) {
  const githubUser = `regisncoelho`;
  return (
    <Box>
    <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
  </Box>
  )
}
 
export default function Home() {
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
          <h2 className="smallTitle">
          O que deseja fazer?
          </h2>
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
            <li>
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
        <Box>
          <h2 className="smallTitle">
          Comunidades
          </h2>
        </Box>
      </div>

    </MainGrid>
  </>
  )
}
