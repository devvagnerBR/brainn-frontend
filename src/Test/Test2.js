import React from 'react'
import axios from 'axios'

const Test2 = () => {
    const [select, setSelect] = React.useState( '' ) // select && option
    const [loteriaId, setLoteriaId] = React.useState( '' )
    const [jogo, setJogo] = React.useState( 'mega-sena' ) // texto H1 

    const [loterias, setLoterias] = React.useState( { id: 1, nome: 'mega-sena' } )
    const [codigo, setCodigo] = React.useState( 2359 ) // codigo do sorteio
    const [finalData, setFinalData] = React.useState( [] ) //dados do concurso
    const [numeros, setNumeros] = React.useState( [] )

    console.log(finalData);

    // ---------------------------------------------------------------------------------
    const handleClick = ( event ) => {
        setJogo( event.target.value )

    }

    // 1 - retorna o nome do jogo e o valor do option do select
    React.useEffect( () => {
        const BASE_URL = 'https://brainn-api-loterias.herokuapp.com/api/v1/loterias'
        axios.get( BASE_URL )
            .then( ( res ) => { setSelect( res.data ) } )
            .catch( ( err ) => { console.log( err.message ) } )
        // retorna id: 1 nome: 'mega-sena // retorna todas as boxes
    }, [jogo] )


    // 2 -  ---------------------------------------------------------------------------------

    React.useEffect( () => {
        const BASE_URL2 = 'https://brainn-api-loterias.herokuapp.com/api/v1/loterias-concursos'
        axios.get( BASE_URL2 )
            .then( ( res ) => { setLoteriaId( res.data ) } )
            .catch( ( err ) => { console.log( err.message ) } )

        //  loteriaId: 1, concursoId: '5534' // retorna o id do concurso
    }, [] )

    // 3 - ---------------------------------------------------------------------------------

    const one = () => {
        const BASE_URL3 = `https://brainn-api-loterias.herokuapp.com/api/v1/concursos/${codigo}`
        axios.get( BASE_URL3 )
            .then( ( res ) => {
                setFinalData( res.data )
                setNumeros( res.data.numeros );
            } )
            .catch( ( err ) => { console.log( err.message ) } )
    }

    // ---------------------------------------------------------------------------------
    const two = () => {
        for ( let i = 0; i < select.length; i++ ) {
            if ( select[i].nome.includes( jogo ) ) {
                setLoterias( select[i] )
            }
        }

    }

    // ---------------------------------------------------------------------------------
    const three = () => {
        for ( let i = 0; i < loteriaId.length; i++ ) {
            if ( loteriaId[i].loteriaId === loterias.id ) {
                setCodigo( loteriaId[i].concursoId );
            }
        }
    }

    const all_num = () => {
        numeros && numeros.map( ( num ) => {
            return <p key={num}>{num}</p>

        } )
    }

    const four = () => {
        const sortNumbers = finalData.numeros && finalData.numeros.map( ( numero ) => numero )
        setNumeros( sortNumbers );
    }

    const opcoes = select && select.map( ( i ) => {
        return <option name={i.nome} value={i.nome} key={i.id}>{i.nome}</option>
    } )


    React.useEffect( () => {

        const todos_os_dados = () => {
            one()
            two()
            three()
            four()
            all_num()
        }

        todos_os_dados()
    }, [jogo] )





    // ---------------------------------------------------------------------------------




    // ---------------------------------------------------------------------------------





    return (

        <div>
            <select onChange={handleClick}>
                {select && opcoes}
            </select>

            <h1>{jogo.toUpperCase()}</h1>

            <div>
                <h3>CONCURSO</h3>

                <h5>{finalData.id} - {finalData.data}</h5>

                <p>{numeros && numeros.map( ( i ) => i )}</p>


            </div>


        </div>
    )
}


export default Test2