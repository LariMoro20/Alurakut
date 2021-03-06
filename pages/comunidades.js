import React from 'react'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileFriendsRelationsWraper } from '../src/components/ProfileFriendsRelations'
function FriendsBox(props) {
    return (
        <ProfileFriendsRelationsWraper >
            <h2 className="smallTitle">
                {props.title} ({props.items.length})
            </h2>
            <ul>
                {props.items.length ? props.items.map((follower) => {
                    return (
                        <li key={follower}>
                            <a href={`/users/${follower.id}`}>
                                <img src={`${follower.avatar_url}`} style={{ borderRadius: '8px' }} />
                                <span>{follower.login}</span>
                            </a>
                        </li>
                    )
                }):''}
            </ul>
        </ProfileFriendsRelationsWraper >
    )
}

export default function Comunidades(props) {
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

