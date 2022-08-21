import { ReactComponent as NotFound } from "../../assets/not-found.svg";
import Footer from "../../components/Footer";
const NoMatch = () => {
  return (
    <>
      <div className="container flex flex-col items-center justify-center min-h-[90%]">
        <NotFound className="h-72 max-h-full max-w-full" />
      </div>
      <Footer />
    </>
  );
};

export default NoMatch;
