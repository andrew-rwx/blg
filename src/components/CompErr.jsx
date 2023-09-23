function CompErr(){
    return(
        <div className='error-component'>
            <img src={`Error500.jpg`} alt='Ooops,qualcosa non ha funzionato'/>
            <Link to='/'>Torna alla Homepage</Link>
        </div>
    )
}
export default CompErr;