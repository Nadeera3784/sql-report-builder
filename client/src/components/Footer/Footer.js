function Footer() {
    return (
        <footer className="flex flex-none items-center bg-white">
            <div className="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm max-w-10xl mx-auto px-4 lg:px-8 w-full">
            <div className="pt-4 pb-1 md:pb-4">
                <a href="https://www.google.com" target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:text-indigo-400">O2O Report</a> © 2021
            </div>
            <div className="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
                <span>Version 1.0</span>
            </div>
            </div>
        </footer>
    )
}

export default Footer;