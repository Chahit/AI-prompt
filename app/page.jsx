import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className= "w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover and Share
                <br className="max-md:hidden" /> 
                <span className="orange_gradient text-center">AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern 
                world to discover,create and share creative prompts
            </p>
            
            <Feed/>
        </section>
    )
}
/* for all the _ that are coming remember that it is coming from 
our own tailwind css file 

what does max md hidden means it means that in the large devices
this data will not be shown 
*/
export default Home 