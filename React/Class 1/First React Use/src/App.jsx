
import { TwitterFollowCard } from './TwitterFollowCard';

function App() {

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Ángel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Juan H. ',
            isFollowing: false
        },
        {
            userName: 'PacoHdezs',
            name: 'Paco Hdez',
            isFollowing: true
        },
        {
            userName: 'TMChein',
            name: 'Tomas',
            isFollowing: false
        }
    ]

    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => 
                    <TwitterFollowCard
                        key={userName}
                        name={name}
                        initialIsFollowing={isFollowing}
                    >
                        {userName}
                    </TwitterFollowCard>
                )
            }
        </section>
    )
}

export default App;