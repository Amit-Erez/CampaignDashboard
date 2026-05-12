import logo from "../assets/logo4.svg";
import mylogo from "../assets/AE-LOGO.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#E3FAFF] p-8">
      <div className="absolute flex flex-col items-center justify-center h-screen top-0 left-0 w-full bg-blue z-1000">
        <button
          type="button"
          aria-label="Enter dashboard"
          onClick={() => navigate("/home")}
        >
          <img
            src={logo}
            alt="Pulse Analytics logo"
            className="w-200 inline-block mb-6 animate-pulse cursor-pointer"
          />
        </button>
        <br />
        <div className="flex items-center animate-pulse">
          <img src={mylogo} alt="" aria-hidden="true" className="w-6" />
          <p className="pl-2 text-[16px] text-[#02252b] font-semibold">
            © Amit Erez 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
