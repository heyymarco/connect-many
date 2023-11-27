'use client'

import { Cable } from '@/components/ConnectManyClient/Cable'
import styles from './page.module.css'
import { ConnectManyClient, Connection } from '@/components/ConnectManyClient'
import { Connector } from '@/components/ConnectManyClient/Connector'
import { useState } from 'react'
import { FrontalView, Header, Identifier, ActionButton } from '@/components/FrontalView'
import Image from 'next/image'



export default function DemoFrontalView() {
    const [cables1, setCables1] = useState<Connection[]>(() => [
        { sideA: 'inp-1', sideB: 'out-3' },
        { sideA: 'inp-4', sideB: 'out-1' },
    ]);
    const [cables2, setCables2] = useState<Connection[]>(() => [
        { sideA: 'inp-1', sideB: 'out-4' },
        { sideA: 'inp-3', sideB: 'out-2' },
    ]);
    const [cables3, setCables3] = useState<Connection[]>(() => [
        { sideA: 'inp-2', sideB: 'out-4' },
        { sideA: 'inp-6', sideB: 'out-2' },
    ]);
    const [cables4, setCables4] = useState<Connection[]>(() => [
        { sideA: 'inp-1', sideB: 'out-3' },
        { sideA: 'inp-5', sideB: 'out-4' },
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
                <ConnectManyClient
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
                    value={cables1}
                    onValueChange={setCables1}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectManyClient
                    // variants:
                    size='md' // sm|md|lg
                    theme='leaf'
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
                    value={cables2}
                    onValueChange={setCables2}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectManyClient
                    // variants:
                    size='md' // sm|md|lg
                    theme='mint'
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
                    value={cables3}
                    onValueChange={setCables3}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
                <ConnectManyClient
                    // variants:
                    size='md' // sm|md|lg
                    theme='purple'
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
                    value={cables4}
                    onValueChange={setCables4}
                    
                    
                    
                    // components:
                    defaultNodeComponent={<Connector theme='gold' />}
                    cableComponent={<Cable theme='cable' />}
                />
            </FrontalView>
        </main>
    )
}
