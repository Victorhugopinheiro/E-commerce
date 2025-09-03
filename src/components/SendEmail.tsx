



function SendEmail() {
    return (
        <div className='flex flex-col my-20 items-center justify-center p-6'>

            <h2 className='text-2xl font-bold mb-4'>Inscreva-se e ganhe 20% OFF</h2>
            <p className='text-gray-600 mb-6'>Inscreva-se na nossa newsletter para receber ofertas exclusivas e novidades.</p>


            <form className='flex flex-col items-center w-5/5 lg:flex-row gap-4'>
                <input
                    type='email'
                    placeholder='Digite seu e-mail'
                    className='flex-1 w-8/12 px-2 py-2 border text-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                    type='submit'
                    className='px-6 py-2 w-fit bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300'
                >
                    Inscrever-se
                </button>

            </form>
        </div>
    )
}

export default SendEmail