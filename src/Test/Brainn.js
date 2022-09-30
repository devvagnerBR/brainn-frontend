import React from 'react'
import axios from 'axios'
import styles from '../styles/Brain.module.css'
import logo from '../assets/logo.svg'

const Brainn = () => {
    const [jogos, setJogos] = React.useState( '' )  // jogos
    const [jogo, setJogo] = React.useState( 'mega-sena' )  // nome do jogo atual
    const [infosJogoAtual, setInfosJogoAtual] = React.useState( { id: 0, nome: 'mega-sena' } )
    const [concursoId, setConcursoId] = React.useState( 2359 )
    const [concursoData, setConcursoData] = React.useState( '' )
    const BASE_URL = 'https://brainn-api-loterias.herokuapp.com/api/v1'
    let atualClass = jogo.replace( / /g, '_' )

    switch ( jogo ) {
        case 'mega-sena':
            atualClass = jogo
            break;
        case 'quina':
            atualClass = jogo
            break;
        case 'lotofácil':
            atualClass = jogo
            break;
        case 'lotomania':
            atualClass = jogo
            break;
        case 'timemania':
            atualClass = jogo
            break;
        case 'dia_de_sorte':
            atualClass = jogo
            break;
        default:
            break;
    }


    React.useEffect( () => {
        axios.get( `${BASE_URL}/loterias` )
            .then( ( res ) => {
                setJogos( res.data );
            } ).catch( ( err ) => {
                console.log( err.res );
            } )
    }, [] )
    const jogosMap = jogos && jogos.map( ( i, index ) => {
        return <option value={i.nome} key={index}>{i.nome}</option>
    } )
    const handleClick = ( event ) => {
        setJogo( event.target.value );
    }
    // ---------------------------------------------------------------------------------------------------
    React.useEffect( () => {

        setTimeout( () => {

            for ( let i = 0; i < jogos.length; i++ ) {
                if ( jogos[i].nome.includes( jogo ) ) {
                    setInfosJogoAtual( jogos[i] );

                }
            }
        }, 50 )
    }, [handleClick] )
    React.useEffect( () => {
        setTimeout( () => {
            axios.get( `${BASE_URL}/loterias-concursos` )
                .then( ( res ) => {
                    for ( let i = 0; i < res.data.length; i++ ) {
                        if ( res.data[i].loteriaId === infosJogoAtual.id ) {
                            setConcursoId( () => res.data[i].concursoId );
                        }
                    }
                } ).catch( ( err ) => {
                    console.log( err.response )
                } )
        }, 50 )
    }, [infosJogoAtual] )
    // ---------------------------------------------------------------------------------------------------
    React.useEffect( () => {
        setTimeout( () => {
            axios.get( `${BASE_URL}/concursos/${concursoId}` )
                .then( ( res ) => setConcursoData( res.data ) )
                .catch( ( err ) => console.log( err.res ) )
        }, 0 )
    }, [concursoId] )
    // ---------------------------------------------------------------------------------------------------
    const day = new Date( concursoData.data ).getDate()
    const month = new Date( concursoData.data ).getMonth()
    const year = new Date( concursoData.data ).getFullYear()
    const dias = `${day}/${month}/${year}`

    return (


        <div className={styles.brainn_container}>



            <section className={`${styles[atualClass]} ${styles.all}`}>
                <div className={styles.part1}>
                    <select onChange={handleClick}>

                        {jogosMap}
                    </select>
                </div>


                <div className={styles.part2}>
                    <img src={logo} />
                    <h2 className={styles.animeLeft}>{jogo.toUpperCase()}</h2>
                </div>

                <div className={styles.part3}>
                    <p>CONCURSO</p>
                    <h3>{concursoData.id} - {dias}</h3>
                </div>

            </section>

            <div className={`${styles.numeros} ${styles.animeLeft}`}>
                <div className={styles.container_bolas}>
                    <section className={`${styles.bolas} ${styles.animeLeft}`}>

                        {concursoData.numeros && concursoData.numeros.map( ( n, index ) => {
                            return <h3 key={index} >{n}</h3>
                        } )}

                    </section>
                </div>

                <p>Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA</p>
            </div>

        </div>
    )
}
export default Brainn