'use client'

import { Cable } from '@/components/ConnectMany/Cable'
import styles from './page.module.css'
import { ConnectMany, Connection } from '@/components/ConnectMany'
import { Connector } from '@/components/ConnectMany/Connector'
import { Button, Group, Label, List, ListItem, Radio, SizeName, Range, Check } from '@reusable-ui/components'
import { useState } from 'react'
import { FrontalView, Header, Identifier, ActionButton } from '@/components/FrontalView'
import Image from 'next/image'



export default function DemoFrontalView() {
    const [cables, setCables] = useState<Connection[]>(() => [
        { sideA: 'inp-1', sideB: 'out-3' },
        { sideA: 'inp-4', sideB: 'out-1' },
    ]);
    
    
    
    return (
        <main className={styles.main}>
            <FrontalView theme='danger'
                header={
                    <Header
                        logo={<Image src='/spongebob.svg' alt='spongebob' width={40} height={40} style={{borderRadius: '10rem'}} />}
                        title='CAEN'
                        description='Four Fold Programmable Logic Unit'
                        serial='DT1081'
                    />
                }
                identifier={
                    <Identifier theme='dark'
                        title='N1081B'
                        pid='13158'
                        ip='192.168.50.246'
                        usb='172.16.51.102'
                    >
                        <ActionButton theme='altDark' onClick={undefined}>VIEW</ActionButton>
                        <ActionButton theme='altDark' onClick={undefined}>CONFIGURE</ActionButton>
                        <ActionButton theme='altDark' onClick={undefined}>SETTINGS</ActionButton>
                    </Identifier>
                }
            >
                <ConnectMany
                    // variants:
                    size='md' // sm|md|lg
                    theme='chocolate'
                    // mild={true}
                    
                    
                    
                    // behaviors:
                    gravityStrength={undefined}
                    
                    
                    
                    // configs:
                    connections={{
                        inputs : {
                            // label : <>Inputs</>,
                            nodes : [
                                { id: 'inp-1', label: '1' , limit: 1 },
                                { id: 'inp-2', label: '2' , limit: 3 },
                                { id: 'inp-3', label: '3' , limit: 1 },
                                { id: 'inp-4', label: '4' , limit: 1 },
                                { id: 'inp-5', label: '5' , limit: 1 },
                                { id: 'inp-6', label: '6' , limit: 1 },
                            ],
                            leds : {
                                placement: 'start',
                                items : [
                                    { label: 'NIM', active: true, theme: 'danger'  },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                        outputs : {
                            // label : <>Outputs</>,
                            nodes : [
                                { id: 'out-1', label: '1', limit: Infinity  },
                                { id: 'out-2', label: '2', limit: Infinity  },
                                { id: 'out-3', label: '3', limit: Infinity  },
                                { id: 'out-4', label: '4', limit: Infinity },
                            ],
                            leds : {
                                placement: 'end',
                                items : [
                                    { label: 'NIM', active: true, theme: 'warning' },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                    }}
                    
                    
                    
                    // values:
                    value={cables}
                    onValueChange={setCables}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectMany
                    // variants:
                    size='md' // sm|md|lg
                    theme='chocolate'
                    // mild={true}
                    
                    
                    
                    // behaviors:
                    gravityStrength={undefined}
                    
                    
                    
                    // configs:
                    connections={{
                        inputs : {
                            // label : <>Inputs</>,
                            nodes : [
                                { id: 'inp-1', label: '1' , limit: 1 },
                                { id: 'inp-2', label: '2' , limit: 3 },
                                { id: 'inp-3', label: '3' , limit: 1 },
                                { id: 'inp-4', label: '4' , limit: 1 },
                                { id: 'inp-5', label: '5' , limit: 1 },
                                { id: 'inp-6', label: '6' , limit: 1 },
                            ],
                            leds : {
                                placement: 'start',
                                items : [
                                    { label: 'NIM', active: true, theme: 'danger'  },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                        outputs : {
                            // label : <>Outputs</>,
                            nodes : [
                                { id: 'out-1', label: '1', limit: Infinity  },
                                { id: 'out-2', label: '2', limit: Infinity  },
                                { id: 'out-3', label: '3', limit: Infinity  },
                                { id: 'out-4', label: '4', limit: Infinity },
                            ],
                            leds : {
                                placement: 'end',
                                items : [
                                    { label: 'NIM', active: true, theme: 'warning' },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                    }}
                    
                    
                    
                    // values:
                    value={cables}
                    onValueChange={setCables}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectMany
                    // variants:
                    size='md' // sm|md|lg
                    theme='chocolate'
                    // mild={true}
                    
                    
                    
                    // behaviors:
                    gravityStrength={undefined}
                    
                    
                    
                    // configs:
                    connections={{
                        inputs : {
                            // label : <>Inputs</>,
                            nodes : [
                                { id: 'inp-1', label: '1' , limit: 1 },
                                { id: 'inp-2', label: '2' , limit: 3 },
                                { id: 'inp-3', label: '3' , limit: 1 },
                                { id: 'inp-4', label: '4' , limit: 1 },
                                { id: 'inp-5', label: '5' , limit: 1 },
                                { id: 'inp-6', label: '6' , limit: 1 },
                            ],
                            leds : {
                                placement: 'start',
                                items : [
                                    { label: 'NIM', active: true, theme: 'danger'  },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                        outputs : {
                            // label : <>Outputs</>,
                            nodes : [
                                { id: 'out-1', label: '1', limit: Infinity  },
                                { id: 'out-2', label: '2', limit: Infinity  },
                                { id: 'out-3', label: '3', limit: Infinity  },
                                { id: 'out-4', label: '4', limit: Infinity },
                            ],
                            leds : {
                                placement: 'end',
                                items : [
                                    { label: 'NIM', active: true, theme: 'warning' },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                    }}
                    
                    
                    
                    // values:
                    value={cables}
                    onValueChange={setCables}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectMany
                    // variants:
                    size='md' // sm|md|lg
                    theme='chocolate'
                    // mild={true}
                    
                    
                    
                    // behaviors:
                    gravityStrength={undefined}
                    
                    
                    
                    // configs:
                    connections={{
                        inputs : {
                            // label : <>Inputs</>,
                            nodes : [
                                { id: 'inp-1', label: '1' , limit: 1 },
                                { id: 'inp-2', label: '2' , limit: 3 },
                                { id: 'inp-3', label: '3' , limit: 1 },
                                { id: 'inp-4', label: '4' , limit: 1 },
                                { id: 'inp-5', label: '5' , limit: 1 },
                                { id: 'inp-6', label: '6' , limit: 1 },
                            ],
                            leds : {
                                placement: 'start',
                                items : [
                                    { label: 'NIM', active: true, theme: 'danger'  },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                        outputs : {
                            // label : <>Outputs</>,
                            nodes : [
                                { id: 'out-1', label: '1', limit: Infinity  },
                                { id: 'out-2', label: '2', limit: Infinity  },
                                { id: 'out-3', label: '3', limit: Infinity  },
                                { id: 'out-4', label: '4', limit: Infinity },
                            ],
                            leds : {
                                placement: 'end',
                                items : [
                                    { label: 'NIM', active: true, theme: 'warning' },
                                    { label: 'TTL', active: true, theme: 'success' },
                                ],
                            },
                        },
                    }}
                    
                    
                    
                    // values:
                    value={cables}
                    onValueChange={setCables}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
            </FrontalView>
        </main>
    )
}
