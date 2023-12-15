import LandingVideo from "../../assets/video/landingVideo.mp4";

const LandingVideoBackground = () => {
    return (
        <div className="relative z-0 overflow-hidden">
            <video autoPlay loop muted className="object-cover">
                <source src={LandingVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default LandingVideoBackground;
