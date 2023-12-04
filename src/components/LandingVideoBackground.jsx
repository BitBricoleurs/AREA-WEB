import LandingVideo from "../assets/landingVideo.mp4";

const LandingNavBar = () => {
    return (
        <div className="relative min-h-screen">
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={LandingVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default LandingNavBar;
