import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { ProfileFriendsRelationsWraper } from '../src/components/ProfileFriendsRelations'




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
export default function Home(props) {
    const githubUser = props.githubUser;
    const [followers, setFollowers] = React.useState([])
    React.useEffect(() => {
        fetch(`https://api.github.com/users/${githubUser}/followers`)
            .then((res) => {
                return res.json()
            }).then((respComplete) => {
                setFollowers(respComplete)
            })
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
