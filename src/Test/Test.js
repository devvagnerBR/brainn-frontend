import React from 'react'
import axios from 'axios'

const Test = () => {
    const [select, setSelect] = React.useState( '' ) // select && option
    const [jogo, setJogo] = React.useState( 'mega-sena' ) // texto H1 
    const [loteriaId, setLoteriaId] = React.useState( '' )
    const [loterias, setLoterias] = React.useState( { id: 0, nome: 'mega-sena' } )
    const [codigo, setCodigo] = React.useState( [2359] ) // codigo do sorteio
    const [att, setAtt] = React.useState( false )
    const [finalData, setFinalData] = React.useState( [] ) //dados do concurso
    const [numeros, setNumeros] = React.useState( ["31", "32", "39", "42", "43", "51"] )
    console.log( att );
    // ---------------------------------------------------------------------------------
    const handleClick = ( event ) => {
        setJogo( event.target.value )

        if ( event.target.value !== jogo ) {
            setAtt( !att )
        }


    }

    // 1 - retorna o nome do jogo e o valor do option do select
    React.useEffect( () => {
        const BASE_URL = 'https://brainn-api-loterias.herokuapp.com/api/v1/loterias'
        axios.get( BASE_URL )
            .then( ( res ) => { setSelect( res.data ) } )
            .catch( ( err ) => { console.log( err.message ) } )
        // retorna id: 1 nome: 'mega-sena // retorna todas as boxes
    }, [att] )


    // 2 -  ---------------------------------------------------------------------------------

    React.useEffect( () => {
        const BASE_URL2 = 'https://brainn-api-loterias.herokuapp.com/api/v1/loterias-concursos'
        axios.get( BASE_URL2 )
            .then( ( res ) => { setLoteriaId( res.data ) } )
            .catch( ( err ) => { console.log( err.message ) } )

        //  loteriaId: 1, concursoId: '5534' // retorna o id do concurso
    }, [] )

    // 3 - ---------------------------------------------------------------------------------

    React.useEffect( () => {
        const BASE_URL3 = `https://brainn-api-loterias.herokuapp.com/api/v1/concursos/${codigo}`
        axios.get( BASE_URL3 )
            .then( ( res ) => { setFinalData( res.data ) } )
            .catch( ( err ) => { console.log( err.message ) } )

        //retorna info dos sorteiso // precisa passar o id do sorteio recebido no SEGUNDO
    }, [att] )


    // ---------------------------------------------------------------------------------


    React.useEffect( () => {
        for ( let i = 0; i < select.length; i++ ) {
            if ( select[i].nome.includes( jogo ) ) {
                setLoterias( select[i] )
            }
        }

    }, [att] )

    // ---------------------------------------------------------------------------------

    React.useEffect( () => {
        for ( let i = 0; i < loteriaId.length; i++ ) {
            if ( loteriaId[i].loteriaId === loterias.id ) {
                setCodigo( loteriaId[i].concursoId );
            }
        }
    }, [att] )



    // ---------------------------------------------------------------------------------

    const opcoes = select && select.map( ( i ) => {
        return <option name={i.nome} value={i.nome} key={i.id}>{i.nome}</option>
    } )

    const valores = numeros && numeros.map( ( num ) => {
        return <p key={num}>{num}</p>
    } )

    // ---------------------------------------------------------------------------------
    React.useEffect( () => {
        let sortNumbers = finalData.numeros && finalData.numeros.map( ( numero ) => numero )
        setNumeros( sortNumbers );

    }, [att] )




    return (

        <div>
            <select onChange={handleClick}>
                {opcoes}
            </select>

            <h1>{jogo.toUpperCase()}</h1>

            <div>
                <h3>CONCURSO</h3>

                <h5>{finalData.id} - {finalData.data}</h5>

                {numeros && numeros.map( ( num ) => {
                    return <p key={num}>{num}</p>
                } )}
            </div>


        </div>
    )
}


export default Test