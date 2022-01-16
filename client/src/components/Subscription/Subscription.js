import { Helmet } from "react-helmet";

function Subscription(props) {
    return (
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Helmet>
                <title>Subscription | Subscription Management</title>
            </Helmet>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
                <h2 className="text-2xl font-bold py-3">
                Subscription
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Manage Subscription</span>
                </h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
                    <button onClick={() => props.history.goBack()} className="inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                        <svg className="hi-solid hi-arrow-narrow-left inline-block w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
            </div>


            <div className="flex flex-col bg-white border-gray-200 -mx-4 sm:mx-0 sm:rounded border-t border-b sm:border overflow-hidden">
                <div className="px-4 lg:pl-6 lg:pr-4 flex items-center justify-between border-b border-gray-200">
                    <div className="flex-grow py-4">
                    Subscription
                    </div>
                </div>

                <div className="px-4 m-8">

                    <div className="text-center">
                        <div className="text-sm uppercase font-bold tracking-wider mb-1 text-indigo-700">
                            Affordable plans
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Get the best value
                        </h2>
                        <h3 className="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
                        Discharge best employed your phase each the of shine. Be met even reason consider logbook redesigns.
                                                </h3>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex space-x-2 items-center">
                            <button type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-gray-600 hover:text-gray-400 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:text-gray-600">
                                Monthly
                            </button>
                            <span className="inline-block w-16 h-10 bg-gray-100 border-2 border-white rounded-full relative"><span className="w-5 bg-indigo-500 absolute top-0 bottom-0 m-2 rounded-full right-0"></span></span>
                            <button type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-indigo-600 hover:text-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:text-indigo-600">
                                Yearly
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mt-5">

                        <div className="rounded-lg shadow-sm bg-gray-100 flex flex-col border-2 border-gray-200 hover:border-gray-300">
                            <div className="p-5 lg:p-6 text-center bg-white rounded-t-lg">
                                <span className="inline-block text-sm uppercase tracking-wider font-semibold px-3 py-1 bg-indigo-200 bg-opacity-50 text-indigo-600 rounded-full mb-4">
                                PROFESSIONAL
                                </span>
                                <div className="mb-1">
                                    <span className="text-3xl lg:text-4xl font-extrabold">$49</span> <span className="text-gray-700 font-semibold">/year</span>
                                </div>
                                <p className="text-gray-600 text-sm font-medium">
                                    For solo developers
                                </p>
                            </div>
                            <div className="p-5 lg:p-6 space-y-5 lg:space-y-6 text-gray-700 flex-grow">
                                <ul className="space-y-4 text-sm lg:text-base">
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>100</strong> Custom Projects</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>50</strong> Paying Clients</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>10GB</strong> SSD Storage</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>1TB</strong> Bandwidth</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>24/7</strong> Email Support</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                                <a href="www.localhost.com" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-gray-700 bg-gray-700 text-white hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-gray-700 active:border-gray-700">
                                    Get Started
                                </a>
                            </div>
                        </div>

                        <div className="rounded-lg shadow-sm bg-indigo-50 flex flex-col border-2 border-indigo-300 hover:border-indigo-400 relative">
                            <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-orange-400">
                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="hi-solid hi-bookmark inline-block w-6 h-6"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                            </div>
                            <div className="p-5 lg:p-6 text-center bg-white rounded-t-lg">
                                <span className="inline-flex space-x-1 items-center text-sm uppercase tracking-wider font-semibold px-3 py-1 bg-indigo-200 bg-opacity-50 text-indigo-600 rounded-full mb-4"><span>PREMIUM</span></span>
                                <div className="mb-1">
                                    <span className="text-3xl lg:text-4xl font-extrabold">$299</span> <span className="text-gray-700 font-semibold">/year</span>
                                </div>
                                <p className="text-gray-600 text-sm font-medium">
                                    For large teams
                                </p>
                            </div>
                            <div className="p-5 lg:p-6 space-y-5 lg:space-y-6 text-indigo-900 flex-grow">
                                <ul className="space-y-4 text-sm lg:text-base">
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>1000</strong> Custom Projects</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>200</strong> Paying Clients</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>100GB</strong> SSD Storage</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>10TB</strong> Bandwidth</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>24/7</strong> Email Support</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                                <a href="www.localhost.com" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                    Get Started
                                </a>
                            </div>
                        </div>

                        <div className="rounded-lg shadow-sm bg-gray-100 flex flex-col border-2 border-gray-200 hover:border-gray-300">
                            <div className="p-5 lg:p-6 text-center bg-white rounded-t-lg">
                                <span className="inline-block text-sm uppercase tracking-wider font-semibold px-3 py-1 bg-indigo-200 bg-opacity-50 text-indigo-600 rounded-full mb-4">
                                    Enterprise
                                </span>
                                <div className="mb-1">
                                    <span className="text-3xl lg:text-4xl font-extrabold">$499</span> <span className="text-gray-700 font-semibold">/year</span>
                                </div>
                                <p className="text-gray-600 text-sm font-medium">
                                    Custom solutions
                                </p>
                            </div>
                            <div className="p-5 lg:p-6 space-y-5 lg:space-y-6 text-gray-700 flex-grow">
                                <ul className="space-y-4 text-sm lg:text-base">
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>Unlimited</strong> Custom Projects</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>Unlimited</strong> Paying Clients</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>Unlimited</strong> SSD Storage</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>Unlimited</strong> Bandwidth</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-green-500 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><strong>24/7</strong> Priority Email Support</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                                <a href="www.localhost.com" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-gray-700 bg-gray-700 text-white hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-gray-700 active:border-gray-700">
                                    Get Started
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </main>
    );
}

export default Subscription;