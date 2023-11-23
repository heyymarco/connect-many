'use client'

import styles from './page.module.css'
import { ConnectMany, Connection } from '@/components/ConnectMany'
import { CircleConnection } from '@/components/ConnectMany/CircleConnection'
import { Button, List, ListItem } from '@reusable-ui/components'
import { useState } from 'react'



export default function Home() {
    const [cables, setCables] = useState<Connection[]>(() => [
        { sideA: 'inp-1', sideB: 'out-3' },
        { sideA: 'inp-4', sideB: 'out-1' },
    ]);
    
    
    
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
                value={cables}
                onValueChange={setCables}
                
                
                
                // components:
                defaultNodeComponent={<CircleConnection theme='warning' />}
            />
            <List theme='primary'>
                <ListItem mild={false}>Connections:</ListItem>
                {cables.map((cable, index) =>
                    <ListItem key={index}>
                        {cable.sideA} &lt;==&gt; {cable.sideB}&nbsp; &nbsp;<Button theme='danger' size='sm' onClick={() => {
                            const newCable = cables.slice(0); // copy
                            newCable.splice(index, 1) // remove by index
                            setCables(newCable);
                        }}>Delete</Button>
                    </ListItem>
                )}
            </List>
        </main>
    )
}
