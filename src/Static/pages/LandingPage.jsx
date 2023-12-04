import {LandingNavBar, LandingVideo} from "../../components/";
import '../Static.css';

export default function LandingPage() {
    return (
        <>
            <div className="gradient-background">
                <LandingVideo/>
                <LandingNavBar/>
                <main>
                    <section>
                    </section>
                </main>
            </div>
        </>
    );
}
