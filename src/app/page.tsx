import styles from './page.module.css'
import { ConnectMany } from '@/components/ConnectMany'
import { CircleConnection } from '@/components/ConnectMany/CircleConnection'



export default function Home() {
    return (
        <main className={styles.main}>
            <ConnectMany
                // variants:
                theme='primary'
                mild={true}
                
                
                
                // configs:
                connections={{
                    inputs : {
                        label : <>Inputs</>,
                        nodes : [
                            { id: 'inp-1', label: '1' , limit: 1         },
                            { id: 'inp-2', label: '2' , limit: 1, nodeComponent: <CircleConnection theme='danger' /> },
                            { id: 'inp-3', label: '3' , limit: 1         },
                            { id: 'inp-4', label: '4' , limit: 1         },
                            { id: 'inp-5', label: '5' , limit: 1         },
                        ],
                    },
                    outputs : {
                        label : <>Outputs</>,
                        nodes : [
                            { id: 'out-1', label: '1', limit: Infinity  },
                            { id: 'out-2', label: '2', limit: Infinity  },
                            { id: 'out-3', label: '3', limit: Infinity  },
                            { id: 'out-4', label: '4', limit: Infinity  },
                        ],
                    },
                    // mixed : {
                    //     label : <>Mixed</>,
                    //     nodes : [
                    //         { id: 'mix-1', label: '1', limit: Infinity  },
                    //         { id: 'mix-2', label: '2', limit: Infinity  },
                    //         { id: 'mix-3', label: '3', limit: Infinity  },
                    //         { id: 'mix-4', label: '4', limit: Infinity  },
                    //     ],
                    // },
                }}
                
                
                
                // values:
                value={[
                    { sideA: 'inp-1', sideB: 'out-3' },
                    { sideA: 'inp-4', sideB: 'out-1' },
                ]}
                
                
                // components:
                defaultNodeComponent={<CircleConnection theme='warning' />}
            />
        </main>
    )
}
