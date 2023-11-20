import styles from './page.module.css'
import { ConnectMany } from '@/components/ConnectMany'



export default function Home() {
    return (
        <main className={styles.main}>
            <ConnectMany
                style={{
                    boxSizing : 'content-box',
                    minWidth: '20rem',
                }}
                connections={{
                    outputs : [
                        { id: 'l586xh0avs', name: 'Out 1'  },
                        { id: 'z85scjcrme', name: 'Out 2'  },
                        { id: 'e622edk1aq', name: 'Out 3'  },
                        { id: 'yutmi19hts', name: 'Out 4'  },
                    ],
                    inputs : [
                        { id: 'fnw0ahndzg', name: 'In 1'  },
                        { id: 'k45nlrbfu0', name: 'In 2'  },
                        { id: 'jzli19bw4s', name: 'In 3'  },
                        { id: 'eftzyn0k0o', name: 'In 4'  },
                        { id: 'x8y5yf37ev', name: 'In 5'  },
                    ],
                }}
            />
        </main>
    )
}
