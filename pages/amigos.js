import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileFriendsRelationsWraper } from '../src/components/ProfileFriendsRelations'


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



function FriendsBox(props) {
    return (
        <ProfileFriendsRelationsWraper >
            <h2 className="smallTitle">
                {props.title} ({props.items.length})
            </h2>
            <ul>
                {props.items.map((follower) => {
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
        </ProfileFriendsRelationsWraper >
    )
}


export default function Amigos(props) {
    const githubUser = props.githubUser;
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
            <div>
                <div className="profileRelationsArea" style={{ gridArea: 'profileFriendsArea' }}>
                    <FriendsBox items={followers} title="Amigos" />
                </div>
            </div>
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