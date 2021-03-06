import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'


function ProfileSideBar(props) {
  const [dadosUsuario, setDadosUsuario] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/${props.githubUser}`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaConvertida) {
        setDadosUsuario(respostaConvertida);
      })
  }, [])
  return (
    <Box as="aside">
      <img src={dadosUsuario.avatar_url} style={{ borderRadius: '8px' }}></img>
      <hr />
      <p>
        <a className="boxLink" href={dadosUsuario.html_url}>
          {dadosUsuario.name}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const profile = [

    {
      title: "relacionamento",
      content: "casado"
    },
    {
      title: "idade",
      content: "33"
    },
    {
      title: "interesses",
      content: "web development, data science"
    },
    {
      title: "país",
      content: "brasil"
    },
    {
      title: "idiomas",
      content: "português (nativo), english"
    },
    {
      title: "profissão",
      content: "economista"
    },
    {
      title: "email",
      content: "regisncoelho@gmail.com"
    },
    {
      title: "github",
      content: "@regisncoelho"
    }]
  const githubUser = props.githubUser
  const [dadosUsuario, setDadosUsuario] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [depoimentos, setDepoimentos] = React.useState([]);
  const [following, setFollowing] = React.useState([])
  // const [usersfollowing, setUsersFollowing] = React.useState([])

  React.useEffect(function () {
    fetch(`https://api.github.com/users/${props.githubUser}/following`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaConvertida) {
        setFollowing(respostaConvertida);
      })

    fetch(`https://api.github.com/users/${props.githubUser}`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaConvertida) {
        setDadosUsuario(respostaConvertida);
      })

    //   following.map((itemAtual) => {
    //   fetch(`https://api.github.com/users/${itemAtual.name}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         'console.'log(data)
    //         setUsersFollowing(data)
    //         console.log(usersfollowing);
    //   })
    // })

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
          communityName
          createdAt
        }}`
      })
    })
      .then(response => response.json())
      .then(responseData => {
        const dataReceivedFromDato = responseData.data.allCommunities
        setComunidades(dataReceivedFromDato)
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
            allTestimonials {
              id
              name
              username
              message
              createdAt
          }}`
      })
    })
      .then(response => response.json())
      .then(responseData => {
        const dataReceivedFromDatoDepos = responseData.data.allTestimonials
        setDepoimentos(dataReceivedFromDatoDepos)
      })

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridAreas: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />

        </div>
        <div className="welcomeArea" style={{ gridAreas: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {dadosUsuario.name}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box style={{ paddingLeft: '0', paddingRight: '0' }}>
            <div>
              <div style={{ backgroundColor: '#DEEEFE', display: 'flex', position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '23%', paddingBottom: '5px', paddingTop: '5px', paddingRight: '5px', textAlign: 'right' }}>
                  <p style={{ color: '#2E7BB4' }} >
                    about me
                  </p>
                </div>
                <div style={{ color: '#333', width: '75%', paddingBottom: '5px', paddingTop: '5px', paddingRight: '15px', textAlign: 'justify' }}>
                  <p style={{textIndent: '1ch', lineHeight: '1.5', marginBottom: '0.5em'}}>
                    Sou economista por formação acadêmica e ambientalista por vocação. Atuo atualmente como servidor público estadual e após a última imersão_dev embarquei de volta no mundo da tecnologia, após entreter por anos a ideia de aprender a programar e, quem sabe, mudar de carreira.
                  </p>
                  <p style={{textIndent: '1ch', lineHeight: '1.5'}}>
                    Meu primeiro e último contato com esse mundo havia sido há 18 anos, quando fiz um curso de Webmaster Design. Foi uma grata surpresa descobrir que ainda me lembrava de muita coisa de HTML e um desafio estimulante voltar a pensar e ler de forma codificada
                  </p>
                </div>
              </div>
              {profile.map((linhaAtual) => {
                return (
                  <div className="profile" style={{ display: 'flex', position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '23%', paddingBottom: '5px', paddingTop: '5px', paddingRight: '5px', textAlign: 'right' }}>
                      <p style={{ color: '#2E7BB4' }} >
                        {linhaAtual.title}
                      </p>
                    </div>
                    <div style={{ width: '75%', paddingBottom: '5px', paddingTop: '5px', paddingRight: '5px', textAlign: 'justify' }}>
                      <p style={{ color: '#333' }} >
                        {linhaAtual.content}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Depoimentos ({depoimentos.length})
            </h2>
            {depoimentos.map((depoAtual) => {
              const created = new Date(`${depoAtual.createdAt}`)
              const dataCriadoEm = created.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              const horaCriadoEm = created.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })
              console.log(typeof (dataCriadoEm))
              return (
                <article className="" key={depoAtual.id} style={{ margin: '20px' }}>
                  <div className="testimonialBox" style={{ borderRadius: '10000px' }}>
                    <div style={{ display: 'flex', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', width: '20%' }}>
                        <img src={`http://github.com/${depoAtual.username}.png`} style={{ height: '90px', width: '90px', borderRadius: '100%' }} />
                      </div>
                      <div style={{ display: 'flex', width: '80%', flexDirection: 'column', alignItens: 'flex-start' }}>
                        <a href={`http://github.com/${depoAtual.username}`} key={depoAtual.id} target="_blank" style={{ color: '#333', textDecoration: 'none' }}>
                          <h4 style={{color: '#2E7BB4'}}>{depoAtual.name} ({depoAtual.username})</h4>
                        </a>
                        <p style={{ margin: '10px', paddingRight: '30px', textAlign: 'justify' }}>
                          {depoAtual.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p style={{ marginLeft: '60px' }}>
                    <small style={{color: '#555'}}>Postado em: {dataCriadoEm} - {horaCriadoEm}</small>
                  </p>
                </article>
              )
            })}
          </ProfileRelationsBoxWrapper>
          <Box>
            <h2 className="subTitle"> Deixe um depoimento </h2>
            <form name="testimonial" onSubmit={function handleCreate(e) {
              e.preventDefault();
              const dadosDoFormDepoimento = new FormData(e.target);
              const depoimento = {
                itemType: "977468",
                name: `${dadosUsuario.name}`,
                username: `${githubUser}`,
                message: dadosDoFormDepoimento.get('message'),
              }

              fetch('/api/mybff', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(depoimento),
              })
                .then(async (response) => {
                  const dados = await response.json();
                  const depoimento = dados.registroCriado;
                  const depoimentosAtualizados = [...depoimentos, depoimento];
                  setDepoimentos(depoimentosAtualizados)
                })
            }} autoComplete="off">
              <div>
                {/* <input
                  placeholder="Qual seu nome?"
                  name="username"
                  aria-label="Qual seu nome?"
                  type="text"
                /> */}
              </div>
              <div>
                <textarea
                  placeholder="Insira sua mensagem"
                  name="message"
                  aria-label="Insira sua mensagem"
                  style={{ resize: 'none' }}
                />
              </div>

              <button>
                Salvar
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
                      <span> {itemAtual.login} </span>
                    </a>
                  </li>
                )
              }
              )}
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
                    <a href={`/community?${itemAtual.id}`} key={itemAtual.id} target="_blank">
                      <img src={itemAtual.thumbUrl} />
                      <span> {itemAtual.communityName} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            <h2 className="subTitle"> Crie uma comunidade </h2>
            <form name="community" onSubmit={function handleCreateComunity(e) {
              e.preventDefault();
              const dadosDoFormComunidade = new FormData(e.target);
              const comunidade = {
                itemType: "976620",
                communityName: dadosDoFormComunidade.get('communityName'),
                thumbUrl: dadosDoFormComunidade.get('thumbUrl'),
              }

              fetch('/api/mybff', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }} autoComplete="off">
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="communityName"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="thumbUrl"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Salvar
              </button>

            </form>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
export async function getServerSideProps(context) {
  const cookie = nookies.get(context)
  const token = cookie.USER_TOKEN

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  // const githubUser = decoded?.githubUser;

  // console.log(githubUser)

  // if (!githubUser) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }
  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}