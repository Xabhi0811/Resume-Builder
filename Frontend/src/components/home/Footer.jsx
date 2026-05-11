import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="mt-16 border-t border-white/70 bg-slate-950 px-6 py-16 text-sm text-slate-300 md:px-16 lg:px-24 xl:px-32">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-sm">
                       <img src='/logo.svg' alt='logo' className='h-11 w-auto brightness-0 invert' />
                       <p className="mt-4 text-slate-400 leading-7">A focused resume builder that helps users create, edit, and export polished resumes with confidence.</p>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-3">
                    <div>
                        <p className="font-semibold text-white">Product</p>
                        <ul className="mt-3 space-y-2 text-slate-400">
                            <li><a href="/" className="transition hover:text-white">Home</a></li>
                            <li><a href="/" className="transition hover:text-white">Support</a></li>
                            <li><a href="/" className="transition hover:text-white">Pricing</a></li>
                            <li><a href="/" className="transition hover:text-white">Affiliate</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Resources</p>
                        <ul className="mt-3 space-y-2 text-slate-400">
                            <li><a href="/" className="transition hover:text-white">Company</a></li>
                            <li><a href="/" className="transition hover:text-white">Blogs</a></li>
                            <li><a href="/" className="transition hover:text-white">Community</a></li>
                            <li><a href="/" className="transition hover:text-white">Careers <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">We’re hiring!</span></a></li>
                            <li><a href="/" className="transition hover:text-white">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Legal</p>
                        <ul className="mt-3 space-y-2 text-slate-400">
                            <li><a href="/" className="transition hover:text-white">Privacy</a></li>
                            <li><a href="/" className="transition hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-xl text-slate-400">Making every customer feel valued, no matter the size of your audience.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://my-protfolio-six-theta.vercel.app/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dribbble size-5 hover:text-green-500" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/abhishek-singh-chauhan-6a080627a/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-5 hover:text-green-500" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://x.com/chabhichauhan" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter size-5 hover:text-green-500" aria-hidden="true">
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                </path>
                            </svg>
                        </a>
                        <a href="https://github.com/Xabhi0811/Resume-Builder" target="_blank" rel="noreferrer" aria-label="GitHub repository">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="size-5 hover:text-green-500" aria-hidden="true">
                                <path d="M12 2a10 10 0 0 0-3.162 19.5c.5.09.682-.217.682-.483 0-.238-.009-.868-.014-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.53 2.341 1.088 2.91.832.09-.646.35-1.088.635-1.34-2.22-.253-4.555-1.11-4.555-4.945 0-1.091.39-1.984 1.03-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.56 9.56 0 0 1 12 6.84c.85.004 1.705.115 2.505.338 1.91-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.699 1.03 1.592 1.03 2.683 0 3.845-2.338 4.688-4.566 4.936.36.31.679.92.679 1.856 0 1.34-.012 2.421-.012 2.75 0 .268.18.578.688.48A10 10 0 0 0 12 2z" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-slate-500">© 2025 <a href="https://xabhi.duckdns.org/" className="text-white transition hover:text-emerald-300">Abhishek</a></p>
                </div>
            </footer>
         <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      
    </>
  )
}

export default Footer
