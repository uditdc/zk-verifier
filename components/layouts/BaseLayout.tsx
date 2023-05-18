import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import Header from '../common/Header'

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <BaseLayoutWrap>
            <Head>
                <title>ZKWasm Verifier</title>
                <meta name="description" content="ZKWasm Verifier by Blockless" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
                <Header/>
                <BaseLayoutContent>
                    {children}
                </BaseLayoutContent>
            </main>
        </BaseLayoutWrap>
    )
}

const BaseLayoutWrap = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    > main {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* grid-template-columns: 1fr; */

        /* @media screen and (max-width: 767px) {
            grid-template-rows: 60px 1fr;
        }

        @media screen and (min-width: 768px) {
            grid-template-columns: 80px 1fr;
        } */
    }
`

const BaseLayoutBg = styled.div`
    display: none;

    background-image: url(/images/bg.jpg);
    background-size: cover;
    background-position: center;

    @media screen and (min-width: 768px) {
        display: block;
    }
`

const BaseLayoutContent = styled.div`
    flex: 1;
    background-color: #EDEEF0;
    
    @media screen and (min-width: 768px) {
        min-width: 720px;
    }
`